import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { HttpRedirect, HttpRedirectProps } from "./http-redirect";

export interface HttpRedirectStackProps extends StackProps, HttpRedirectProps {}

export class HttpRedirectStack extends Stack {
  constructor(scope: Construct, id: string, props: HttpRedirectStackProps) {
    super(scope, id, props);
    new HttpRedirect(this, 'HttpRedirect', props);
  }
}
