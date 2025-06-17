import { z } from 'zod';
import {
	SignInFormSchema,
	UpdateProfileSchema,
	UserSchema,
	UpdateUserSchema,
} from '@/lib/utils/validators';

// TYPE FOR SIGNINFORM DATAS IN APP
export type SignInForm = z.infer<typeof SignInFormSchema>;

export type UpdateProfile = z.infer<typeof UpdateProfileSchema>;

export type UpdateUser = z.infer<typeof UpdateUserSchema>;

export type User = z.infer<typeof UserSchema>;
