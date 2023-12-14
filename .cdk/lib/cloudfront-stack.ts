import { StackProps, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CloudfrontRedirection, CloudfrontRedirectionProps } from './cloudfront-redirection';

export interface CloudfrontStackProps extends StackProps, CloudfrontRedirectionProps {}

export class CloudfrontStack extends Stack {
  constructor(scope: Construct, id: string, props: CloudfrontStackProps){
    super(scope, id, props)
    new CloudfrontRedirection(this, 'CloudfrontRedirection', props)
  }
}