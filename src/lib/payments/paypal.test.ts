import { CURRENCY_CODES } from '../constants/index';
import { generateAccessToken } from './paypal';

// TEST TO GENERATE ACCESS TOKEN FROM PAYPAL
test('generate token from paypal', async () => {
	const tokenRes = await generateAccessToken();
	console.log(tokenRes);
	console.log(CURRENCY_CODES.main);
	expect(typeof tokenRes).toBe('string');
	expect(tokenRes.length).toBeGreaterThan(0);
	expect(typeof CURRENCY_CODES.main).toBe('string');
});
