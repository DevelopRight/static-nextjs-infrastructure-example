# Static NextJs Infrastructure Example

This repository demonstrates how easy it is to generate your Infrastructure as Code as a part of your applications code. In this repository you will see that there is a CDK folder that contains the infrastructure to deploy this NextJs application to AWS using the Cloud Development Kit (CDK). 

## What does the CDK create?
Specifically the cdk/stack.ts creates an S3, Cloudfront Distribution, ACM Certificate, and Route53 record to allow your static NextJs application to be served within AWS.  