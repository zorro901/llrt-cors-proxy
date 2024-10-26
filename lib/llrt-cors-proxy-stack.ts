import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Architecture, FunctionUrlAuthType } from 'aws-cdk-lib/aws-lambda';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { LlrtFunction } from './llrt-function';
import { CfnOutput } from 'aws-cdk-lib';

export class LlrtCorsProxyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new RestApi(this, 'Api')

    {
      const handler = new LlrtFunction(this, 'Llrt', {
        entry: './lambda/fetch.ts',
        architecture: Architecture.ARM_64,
      })
      const functionUrl = handler.addFunctionUrl({authType: FunctionUrlAuthType.NONE})
      const resource = api.root.addResource('llrt')
      resource.addMethod('GET', new LambdaIntegration(handler))

      // Function URLをデプロイ結果に出力
      new CfnOutput(this, 'FunctionUrlOutput', {
        value: functionUrl.url,
        description: 'The URL of the Lambda Function',
      });
    }
  }
}
