import { z } from "zod";
import { PaymentMethodSchema } from "@/lib/utils/validators";

export type PaymentMethod = z.infer<typeof PaymentMethodSchema>