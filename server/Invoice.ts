"use server";

import { useAuth as UseAuth } from "@/hooks/useAuth";

import { redirect } from "next/navigation";

import { parseWithZod } from "@conform-to/zod";
import { InvoiceSchema } from "@/lib/schema";

import { db } from "@/db/db";
import { Invoices } from "@/db/schema/invoice";

import { emailClient } from "@/utils/mailtrap";

import { formatPrice } from "@/utils/formatPrice";
import { formatDate } from "@/utils/formatDate";

export const Invoice = async (prevState: unknown, formData: FormData) => {
  const session = await UseAuth();

  if (!session.user) {
    return redirect("/auth/login");
  }

  const submission = parseWithZod(formData, {
    schema: InvoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const createdInvoice = await db
    .insert(Invoices)
    .values({
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      clientName: submission.value.clientName,
      description: submission.value.description,
      dueDate: submission.value.dueDate as any,
      fromAddress: submission.value.fromAddress,
      date: submission.value.date as any,
      fromEmail: submission.value.fromEmail,
      fromName: submission.value.fromName,
      invoiceName: submission.value.invoiceName,
      invoiceNumber: submission.value.invoiceNumber,
      note: submission.value.note,
      rate: submission.value.rate,
      status: submission.value.status,
      totalAmount: submission.value.totalAmount,
      userId: session.user?.id as string,
      currency: submission.value.currency,
      quantity: submission.value.quantity,
    })
    .returning();

  const sender = {
    email: "hello@demomailtrap.com",
    name: "Clever programmer",
  };

  emailClient.send({
    from: sender,
    to: [{ email: createdInvoice[0].clientEmail }],
    template_uuid: "79e6e5f9-967a-4452-986c-e9bb2caff3d9",
    template_variables: {
      ClientName: createdInvoice[0].clientName,
      invoiceNumber: createdInvoice[0].invoiceNumber,
      invoiceDueDate: formatDate(new Date(createdInvoice[0].date)),
      invoiceTotalAmount: formatPrice({
        amount: createdInvoice[0].totalAmount,
        currency: createdInvoice[0].currency as "USD" | "EUR",
      }),
      invoiceLink: `${process.env.NODE_ENV === "development" ? `http://localhost:3000/api/invoice/${createdInvoice[0].id}` : `${process.env.NEXT_PULIC_URL}/api/invoice/${createdInvoice[0].id}`}`,
    },
  });

  return redirect("/dashboard/invoices");
};
