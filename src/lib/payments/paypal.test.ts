import { generateAccessToken } from './paypal';

// TEST TO GENERATE ACCESS TOKEN FROM PAYPAL
test('generate token from paypal', async () => {
	const tokenRes = await generateAccessToken();
	console.log(tokenRes);
	expect(typeof tokenRes).toBe('string');
	expect(tokenRes.length).toBeGreaterThan(0);
});
