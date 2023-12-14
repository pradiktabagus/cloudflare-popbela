import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Web, WebProps } from "./web";
import { StringParameter } from "aws-cdk-lib/aws-ssm";

export interface WebStackProps extends StackProps, WebProps {}

export class WebStack extends Stack {
  constructor(scope: Construct, id: string, props: WebStackProps) {
    super(scope, id, props);
    const webConstruct = new Web(this, 'Www', props);
    _add(webConstruct, "distributionId", webConstruct.distribution.distributionId);
  }
}

function _addCfnExport(scope: Construct, exportName: string, value: string) {
  new CfnOutput(scope, exportName, { exportName, value });
}

function _addParamsStore(scope: Construct, name: string, value: string) {
  new StringParameter(scope, name, { parameterName: name, stringValue: value });
}

function _add(scope: Construct, exportName: string, value: string) {
  _addCfnExport(scope, exportName, value);
  _addParamsStore(scope, `/idn/popbela/www/${exportName}`, value);
}