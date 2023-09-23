import { z } from 'zod'

export const authSchema = z.object({
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string(),
  password: z.string().min(8),
  phone_number: z.string().max(18),
  user_id: z.string().uuid()
}).required({
  email: true,
  password: true
})
