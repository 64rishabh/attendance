import * as z from "zod"; 
 
export const SignupUserSchema = z.object({ 
  name: z.string(),
  email: z.email(),
  password : z.string().min(6),
  role : z.enum(["teacher","student"])
});

export const LoginUserSchema = z.object({
  email : z.email(),
  password : z.string()
})

export const meUserSchema = z.object({
  _id : z.string(),
  name : z.string(),
  email : z.email(),
  role : z.enum(["teacher","student"])
});