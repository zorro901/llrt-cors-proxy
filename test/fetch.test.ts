import { APIGatewayEvent, Context, APIGatewayProxyResult } from 'aws-lambda';
import { handler } from '../lambda/fetch';

describe('Lambda Handler Tests', () => {
  it('should return a 200 status code with a message', async () => {
    const event: APIGatewayEvent = {
      body: JSON.stringify({ url: 'https://jsonplaceholder.typicode.com/todos/1',method:'GET' }),  // bodyにurlを追加
      httpMethod: 'POST',
      isBase64Encoded: false,
      path: '',
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      pathParameters: null,
      stageVariables: null,
      headers: {},
      multiValueHeaders: {},
      requestContext: {} as any,
      resource: '',
    };
    const context: Context = {} as any;        // 必要に応じてコンテキストのモックデータを追加

    // @ts-ignore - TS2554を抑制
    const response = (await handler(event, context)) as APIGatewayProxyResult;  // callbackを省略

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(
      JSON.stringify({"userId":1,"id":1,"title":"delectus aut autem","completed":false})
    );
  });
  it("handles successful API calls", async () => {
    // Setup mock response
    const mockData = { success: true, data: "test" };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData)
    });

    // Make API call
    const response = await fetch('/api/data');
    const data = await response.json();

    // Verify results
    expect(data).toEqual(mockData);
  });
});