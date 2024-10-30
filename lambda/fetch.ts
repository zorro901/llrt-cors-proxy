import type { APIGatewayProxyResult, Context, Handler } from 'aws-lambda'
import type { APIGatewayProxyEventV2WithRequestContext } from 'aws-lambda/trigger/api-gateway-proxy'
import * as v from 'valibot'

export const handler: Handler<
	APIGatewayProxyEventV2WithRequestContext<Context>,
	APIGatewayProxyResult
> = async (event) => {
	try {
		const response = await fetch(
			v.parse(
				v.pipe(v.string(), v.url()),
				`${event.rawPath.replace('/', '')}?${event.rawQueryString}`,
			),
		)
		const json = await response.json()

		return {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(json),
		}
	} catch (e) {
		console.error(e)
		return {
			statusCode: 500,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				message: 'failed',
			}),
		}
	}
}
