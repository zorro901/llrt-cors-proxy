import type {
	APIGatewayEventRequestContextV2,
	APIGatewayProxyResult,
	Handler,
} from 'aws-lambda'
import type { APIGatewayProxyEventV2WithRequestContext } from 'aws-lambda/trigger/api-gateway-proxy'
import * as v from 'valibot'

export const handler: Handler<
	APIGatewayProxyEventV2WithRequestContext<APIGatewayEventRequestContextV2>,
	APIGatewayProxyResult
> = async (event) => {
	try {
		// プリフライトリクエストの場合
		if (event.requestContext.http.method === 'OPTIONS') {
			return {
				statusCode: 200,
				headers: responseHeaders,
				body: '',
			}
		}
		const customHeaders: HeadersInit = {
			'Content-Type': 'application/json',
		}

		// `x-frontend-id` が存在する場合のみ追加
		if (event.headers?.['x-frontend-id']) {
			customHeaders['x-frontend-id'] = event.headers['x-frontend-id']
		}
		const response = await fetch(
			v.parse(
				v.pipe(v.string(), v.url()),
				`${event.rawPath.replace('/', '')}?${event.rawQueryString}`,
			),
			{ headers: customHeaders },
		)
		const json = await response.json()

		return {
			statusCode: 200,
			headers: responseHeaders,
			body: JSON.stringify(json),
		}
	} catch (e) {
		console.error(e)
		return {
			statusCode: 500,
			headers: responseHeaders,
			body: JSON.stringify({
				message: `failed: ${e}`,
			}),
		}
	}
}

const responseHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': '*',
	'Access-Control-Allow-Headers': '*',
	'Content-Type': 'application/json',
}
