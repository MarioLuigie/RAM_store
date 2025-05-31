// /app/api/uploadthing/delete/route.ts

import { UTApi } from 'uploadthing/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const utapi = new UTApi();
		const { key } = await req.json(); // returned array of keys or key

		console.log("KEY ARRAY FROM POST API ROUTE", key)

		if (!key) {
			return NextResponse.json(
				{ error: 'Missing file key' },
				{ status: 400 }
			);
		}

		await utapi.deleteFiles(key);

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Error deleting file:', error);
		return NextResponse.json(
			{ error: 'Something went wrong' },
			{ status: 500 }
		);
	}
}
