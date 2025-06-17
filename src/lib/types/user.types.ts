import { z } from 'zod'
import { SignInFormSchema, UpdateProfileSchema, UserSchema } from '@/lib/utils/validators'

// TYPE FOR SIGNINFORM DATAS IN APP
export type SignInForm = z.infer<typeof SignInFormSchema> 

export type UpdateProfile = z.infer<typeof UpdateProfileSchema>

export type User = z.infer<typeof UserSchema>