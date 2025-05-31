// /app/api/uploadthing/delete/route.ts

import { UTApi } from 'uploadthing/server';
import { NextResponse } from 'next/server';
import { checkIsAdmin } from '@/lib/utils/auth-guard';

export async function POST(req: Request) {
	try {
		const { isAdmin } = await checkIsAdmin();

		if (!isAdmin) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
		}

		const utapi = new UTApi();
		const { key } = await req.json();

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
