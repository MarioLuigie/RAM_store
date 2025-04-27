// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT as DefaultJWT } from 'next-auth/jwt'


declare module 'next-auth' {
	interface Session {
		user: {
			id: string
			role: string
			name?: string | null
			email?: string | null
		} & DefaultSession['user']
	}

	interface User extends DefaultUser {
		id: string
		role: string
	}
}

declare module 'next-auth/jwt' {
	interface JWT extends DefaultJWT {
		id: string
		role: string
		name?: string | null
		email?: string | null
	}
}
//DEFAULT SESSION FROM NEXT AUTH - SIMPLY DEFINITION
// interface DefaultSession {
//   user?: {
//     name?: string | null;
//     email?: string | null;
//     image?: string | null;
//   };
//   expires: string;
// }

