"use server";

import { useAuth as UseAuth } from "@/hooks/useAuth";

import { redirect } from "next/navigation";

import { parseWithZod } from "@conform-to/zod";
import { InvoiceSchema } from "@/lib/schema";

import { db } from "@/db/db";
import { Invoices } from "@/db/schema/invoice";
import { and, eq } from "drizzle-orm";

import { emailClient } from "@/utils/mailtrap";

import { formatPrice } from "@/utils/formatPrice";
import { formatDate } from "@/utils/formatDate";

export const EditInvoice = async (prevState: unknown, formData: FormData) => {
  const session = await UseAuth();

  const submission = parseWithZod(formData, {
    schema: InvoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await db
    .update(Invoices)
    .set({
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      clientName: submission.value.clientName,
      currency: submission.value.currency,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      fromAddress: submission.value.fromAddress,
      fromEmail: submission.value.fromEmail,
      fromName: submission.value.fromName,
      description: submission.value.description,
      quantity: submission.value.quantity,
      rate: submission.value.rate,
      invoiceName: submission.value.invoiceName,
      invoiceNumber: submission.value.invoiceNumber,
      status: submission.value.status,
      totalAmount: submission.value.totalAmount,
      note: submission.value.note,
    })
    .where(
      and(
        eq(Invoices.id, formData.get("id") as string),
        eq(Invoices.userId, session.user?.id as string),
      ),
    )
    .returning();

  const sender = {
    email: "hello@demomailtrap.com",
    name: "Clever programmer",
  };

  emailClient.send({
    from: sender,
    to: [{ email: data[0].clientEmail }],
    template_uuid: "7e138aed-5071-4a7e-a07c-3227236fac68",
    template_variables: {
      ClientName: data[0].clientName,
      invoiceNumber: data[0].invoiceNumber,
      invoiceDueDate: formatDate(new Date(data[0].date)),
      invoiceTotalAmount: formatPrice({
        amount: data[0].totalAmount,
        currency: data[0].currency as "USD" | "EUR",
      }),
      invoiceLink: `${process.env.NODE_ENV === "development" ? `http://localhost:3000/api/invoice/${data[0].id}` : `${process.env.NEXT_PULIC_URL}/api/invoice/${data[0].id}`}`,
    },
  });

  return redirect("/dashboard/invoices");
};
