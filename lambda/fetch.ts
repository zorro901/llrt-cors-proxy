import type {
	APIGatewayEvent,
	APIGatewayProxyResult,
	Handler,
} from 'aws-lambda'

export const handler: Handler<APIGatewayEvent, APIGatewayProxyResult> = async (
	event,
	context,
) => {
	return {
		statusCode: 200,
		body: JSON.stringify({
			message: 'hello fetch in llrt',
			event,
			context,
		}),
	}
}
