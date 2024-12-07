import { z } from "zod";

export const onBoardingSchema = z.object({
  firstname: z.string().min(3, { message: "firstname is required" }),
  lastname: z.string().min(3, { message: "lastname is required" }),
  address: z.string().min(5, { message: "address is required" }),
});
