import * as cdk from 'aws-cdk-lib'
import { CfnOutput } from 'aws-cdk-lib'
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway'
import { Architecture, FunctionUrlAuthType } from 'aws-cdk-lib/aws-lambda'
import type { Construct } from 'constructs'
import { LlrtFunction } from './llrt-function'

export class LlrtCorsProxyStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props)

		const api = new RestApi(this, 'Api')

		{
			const handler = new LlrtFunction(this, 'Llrt', {
				entry: './lambda/fetch.ts',
				architecture: Architecture.ARM_64,
			})
			const functionUrl = handler.addFunctionUrl({
				authType: FunctionUrlAuthType.NONE,
			})
			const resource = api.root.addResource('llrt')
			resource.addMethod('GET', new LambdaIntegration(handler))

			// Function URLをデプロイ結果に出力
			new CfnOutput(this, 'FunctionUrlOutput', {
				value: functionUrl.url,
				description: 'The URL of the Lambda Function',
			})
		}
	}
}
