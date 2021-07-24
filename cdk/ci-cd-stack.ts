import * as cdk from '@aws-cdk/core';
import * as codebuild from '@aws-cdk/aws-codebuild';
import { PolicyStatement } from '@aws-cdk/aws-iam';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';

export class CICDStack extends cdk.Stack {

    constructor(scope: cdk.Construct, id: string, s3OutputName: string, s3OutputArn: string) {
        super(scope, id);

        // Retrieve Github OAuth Token
        const oauthToken = cdk.SecretValue.secretsManager('/staticnextjs/github/token');
        const slackApiHook = cdk.SecretValue.secretsManager('/staticnextjs/slack/api-hook');

        // Create CodeBuild for CodePipeline
        const sourceOutput = new codepipeline.Artifact();

        const codeBuild = new codebuild.PipelineProject(this, 'DRCodeBuild', {
            checkSecretsInPlainTextEnvVariables: false,
            buildSpec: codebuild.BuildSpec.fromSourceFilename('buildspec.yml'),
            environment: {
                buildImage: codebuild.LinuxBuildImage.STANDARD_2_0
            },
            environmentVariables: {
                S3_BUCKET_NAME: {
                    value: s3OutputName
                },
                SLACK_API_HOOK: {
                    value: slackApiHook
                }
            }
        });

        // Permit CodeBuild to make use of S3 Bucket in Core Stack
        codeBuild.addToRolePolicy(new PolicyStatement({
            resources: [
                s3OutputArn,
                `${s3OutputArn}/*`
            ],
            actions: [
                's3:ListBucket',
                's3:GetObject',
                's3:PutObject',
                's3:CopyObject'
            ]
        }))

        // Create CodePipeline referencing Github Repository
        new codepipeline.Pipeline(this, 'DRPipeline', {
            stages: [
                {
                    stageName: 'Source',
                    actions: [
                        new codepipeline_actions.GitHubSourceAction({
                            actionName: 'Github',
                            output: sourceOutput,
                            oauthToken,
                            trigger: codepipeline_actions.GitHubTrigger.POLL,
                            owner: 'DevelopRight',
                            repo: 'static-nextjs-infrastructure-example',
                            branch: 'main'
                        })
                    ]
                },
                {
                    stageName: 'Build',
                    actions: [
                        new codepipeline_actions.CodeBuildAction({
                            actionName: 'Build-And-Deploy',
                            project: codeBuild,
                            input: sourceOutput,
                            outputs: []
                        })
                    ]
                }
            ]
        })
    };
};