import { CURRENCY_CODES } from '@/lib/constants';

const base = process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com';

export const paypal = {
	createOrder: async (price: number) => {
		const accessToken = await generateAccessToken();
		const url = `${base}/v2/checkout/orders`;

		const res = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				intent: 'CAPTURE',
				purchase_units: [
					{
						amount: {
							currency_code: CURRENCY_CODES.main,
							value: price,
						},
					},
				],
			}),
		});

		if (res.ok) {
			return await res.json();
		} else {
			const errorMessage = await res.text();
			throw new Error(errorMessage);
		}
	},
	capturePayment: async (paypalOrderId: string) => {
		const accessToken = await generateAccessToken();
		const url = `${base}/v2/checkout/orders/${paypalOrderId}/capture`;

		const res = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		});

		if (res.ok) {
			return await res.json();
		} else {
			const errorMessage = await res.text();
			throw new Error(errorMessage);
		}
	},
};

// GENERATE PAYPAL ACCESS TOKEN
async function generateAccessToken() {
	const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET } = process.env;

	const auth = Buffer.from(
		`${PAYPAL_CLIENT_ID}:${PAYPAL_APP_SECRET}`
	).toString('base64');

	const res = await fetch(`${base}/v1/oauth2/token`, {
		method: 'POST',
		body: 'grant_type=client_credentials',
		headers: {
			Authorization: `Basic ${auth}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	});

	if (res.ok) {
		const data = await res.json();
		return data.access_token;
	} else {
		const errorMessage = await res.text();
		throw new Error(errorMessage);
	}
}

// async function handleResponse(res: Response) {
// 	if (res.ok) {
// 		return res.json();
// 	} else {
// 		const errorMessage = await res.text();
// 		throw new Error(errorMessage);
// 	}
// }

export { generateAccessToken };
