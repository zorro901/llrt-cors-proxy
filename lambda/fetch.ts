import type {
  APIGatewayEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda'

export const handler: Handler<APIGatewayEvent, APIGatewayProxyResult> = async (
  event,
  context,
) => {
  try {
    const { url, method } = JSON.parse(event.body || '{}')
    const json = await fetch(url, { method: method ?? 'GET' })
      .then(response => response.json())
    return {
      statusCode: 200,
      body: JSON.stringify(json),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: 'failed',
    }
  }
}