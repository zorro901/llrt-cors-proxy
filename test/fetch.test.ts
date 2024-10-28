import type { APIGatewayProxyResult } from 'aws-lambda'
import { handler } from '../lambda/fetch'

describe('Lambda Handler Tests', () => {
	it('mocked fetch', async () => {
		global.fetch = jest.fn().mockResolvedValue({
			json: (): object =>
				Promise.resolve({
					data: [
						{
							contentId: 'sm44158937',
							title: 'ハチ MV 「ドーナツホール 2024」',
						},
						{
							contentId: 'sm22138447',
							title: 'GUMI MV「ドーナツホール」',
						},
						{
							contentId: 'sm35030158',
							title: 'ドーナツホール☆',
						},
					],
					meta: {
						status: 200,
						totalCount: 6428,
					},
				}),
		})
		const response = (await handler(
			{
				headers: {},
				isBase64Encoded: false,
				requestContext: {
					callbackWaitsForEmptyEventLoop: false,
					functionName: '',
					functionVersion: '',
					invokedFunctionArn: '',
					memoryLimitInMB: '',
					awsRequestId: '',
					logGroupName: '',
					logStreamName: '',
					getRemainingTimeInMillis: (): number => 0,
					done: (): void => {},
					fail: (): void => {},
					succeed: (): void => {},
				},
				routeKey: '',
				version: '',
				rawPath:
					'/https://snapshot.search.nicovideo.jp/api/v2/snapshot/video/contents/search',
				rawQueryString:
					'q=%E3%83%89%E3%83%BC%E3%83%8A%E3%83%84%E3%83%9B%E3%83%BC%E3%83%AB&targets=title&fields=contentId,title&_limit=3&_context=apiguide&_sort=-likeCounter',
			},
			{
				awsRequestId: '',
				callbackWaitsForEmptyEventLoop: false,
				functionName: '',
				functionVersion: '',
				invokedFunctionArn: '',
				logGroupName: '',
				logStreamName: '',
				memoryLimitInMB: '',
				getRemainingTimeInMillis: (): number => 0,
				done: (): void => {},
				fail: (): void => {},
				succeed: (): void => {},
			},
			() => ({}),
		)) as APIGatewayProxyResult

		expect(response.statusCode).toBe(200)
		expect(response.body).toBe(
			JSON.stringify({
				data: [
					{
						contentId: 'sm44158937',
						title: 'ハチ MV 「ドーナツホール 2024」',
					},
					{
						contentId: 'sm22138447',
						title: 'GUMI MV「ドーナツホール」',
					},
					{
						contentId: 'sm35030158',
						title: 'ドーナツホール☆',
					},
				],
				meta: {
					status: 200,
					totalCount: 6428,
				},
			}),
		)
	})
	it('unmock fetch api', async () => {
		const event = {
			rawPath:
				'/https://snapshot.search.nicovideo.jp/api/v2/snapshot/video/contents/search',
			rawQueryString:
				'q=%E3%83%89%E3%83%BC%E3%83%8A%E3%83%84%E3%83%9B%E3%83%BC%E3%83%AB&targets=title&fields=contentId,title&_limit=3&_context=apiguide&_sort=-likeCounter',
		}
		const response = await fetch(
			`${event.rawPath.replace('/', '')}?${event.rawQueryString}`,
		)
		const data = await response.json()

		// Verify results
		expect(data).toMatchObject({
			data: [
				{
					contentId: 'sm44158937',
					title: 'ハチ MV 「ドーナツホール 2024」',
				},
				{
					contentId: 'sm22138447',
					title: 'GUMI MV「ドーナツホール」',
				},
				{
					contentId: 'sm35030158',
					title: 'ドーナツホール☆',
				},
			],
			meta: {
				status: 200,
				totalCount: 6428,
			},
		})
	})
})
