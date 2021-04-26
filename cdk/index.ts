#!/usr/bin/ev node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CoreStack } from './core-stack';
import { CICDStack } from './ci-cd-stack';

const app = new cdk.App();
const coreStack = new CoreStack(app, 'StaticNextJsStack');
const cicdStack = new CICDStack(app, 'ExampleCICDStack', coreStack.s3BucketArn);
// Dependency on CoreStack
cicdStack.addDependency(coreStack);