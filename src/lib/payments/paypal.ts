const base = process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com';

export const paypal = {};

// GENERATE PAYPAL ACCESS TOKEN
export async function generateAccessToken() {
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
    throw new Error(errorMessage)
  }
}
