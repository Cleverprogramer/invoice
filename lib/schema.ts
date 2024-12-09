import { z } from "zod";

export const onBoardingSchema = z.object({
  firstname: z.string().min(3, { message: "firstname is required" }),
  lastname: z.string().min(3, { message: "lastname is required" }),
  address: z.string().min(5, { message: "address is required" }),
});

export type onBoarding = z.infer<typeof onBoardingSchema>;

export const InvoiceSchema = z.object({
  invoiceName: z.string().min(1, "Invoice name is required"),

  invoiceNumber: z.string().min(1, "Invoice number is required"),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Date must be a valid date",
  }),
  dueDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Due date must be a valid date",
  }),

  client: z.object({
    name: z.string().min(1, "Client name is required"),
    email: z.string().email("Invalid email format"),
    address: z.string().min(1, "Client address is required"),
  }),

  from: z.object({
    name: z.string().min(1, "Sender name is required"),
    email: z.string().email("Invalid sender email format"),
    address: z.string().min(1, "Sender address is required"),
  }),

  rate: z.number().min(0, "Rate must be a positive number"),
  amount: z.number().min(0, "Amount must be a positive number"),
  description: z.string().min(1, "Description is required"),
  note: z.string().min(10, "Note must be at least 10 characters").optional(),

  subtotal: z.number().min(0, "Subtotal must be at least 0"),
  totalAmount: z.number().min(0, "Total amount must be at least 0"),

  currency: z.enum(["USD", "EUR"], {
    errorMap: () => ({
      message: "Currency must be one of 'USD', 'EUR'",
    }),
  }),

  status: z.enum(["PENDING", "PAID"], {
    errorMap: () => ({
      message: "Status must be one of 'PENDING', 'PAID'",
    }),
  }),
});

export type Invoice = z.infer<typeof InvoiceSchema>;
