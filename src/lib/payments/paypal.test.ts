import { CURRENCY_CODES } from '../constants/index';
import { generateAccessToken, paypal } from './paypal';

// TEST TO GENERATE ACCESS TOKEN FROM PAYPAL - E2E TEST
test('generates token from paypal', async () => {
	const tokenRes = await generateAccessToken();
	console.log(tokenRes);
	console.log(CURRENCY_CODES.main);
	expect(typeof tokenRes).toBe('string');
	expect(tokenRes.length).toBeGreaterThan(0);
	expect(typeof CURRENCY_CODES.main).toBe('string');
});

// TEST TO CREATE A PAYPAL ORDER - E2E TEST
test('creates a paypal order', async () => {
	const price = 10.0;

	const orderRes = await paypal.createOrder(price);
	console.log(orderRes);

	expect(orderRes).toHaveProperty('id');
	expect(orderRes).toHaveProperty('status');
	expect(orderRes.status).toBe('CREATED');
});

// TEST TO CAPTURE PAYMENT WITH MOCK ORDER - UNIT TEST
test('simulate capturing a payment from an order', async () => {
	const orderId = '100';

	const mockCapturePayment = jest
		.spyOn(paypal, 'capturePayment')
		.mockResolvedValue({
			status: 'COMPLETED',
		});

	const captureRes = await paypal.capturePayment(orderId);
	console.log(captureRes);

	expect(captureRes).toHaveProperty('status', 'COMPLETED');

	mockCapturePayment.mockRestore();
});
