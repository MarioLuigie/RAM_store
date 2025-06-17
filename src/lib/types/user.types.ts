import { z } from 'zod'
import { SignInFormSchema, UpdateProfileSchema, UserFromDbSchema } from '@/lib/utils/validators'

// TYPE FOR SIGNINFORM DATAS IN APP
export type SignInForm = z.infer<typeof SignInFormSchema> 

export type UpdateProfile = z.infer<typeof UpdateProfileSchema>

export type UserFromDb = z.infer<typeof UserFromDbSchema>