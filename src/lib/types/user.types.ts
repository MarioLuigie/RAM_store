import { z } from 'zod'
import { SignInFormSchema } from '@/lib/utils/validators'

// TYPE FOR SIGNINFORM DATAS IN APP
export type SignInForm = z.infer<typeof SignInFormSchema> 