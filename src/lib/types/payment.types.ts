import { z } from "zod";
import { PaymentMethodSchema, PaymentResultSchema } from "@/lib/utils/validators";

export type PaymentMethod = z.infer<typeof PaymentMethodSchema>
export type PaymentResult = z.infer<typeof PaymentResultSchema>