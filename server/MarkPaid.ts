"use server";

import { useAuth as UseAuth } from "@/hooks/useAuth";

import { redirect } from "next/navigation";

import { db } from "@/db/db";
import { Invoices } from "@/db/schema/invoice";
import { and, eq } from "drizzle-orm";

export const MarkPaidInvoice = async (invoiceId: string) => {
  const session = await UseAuth();

  const data = await db
    .update(Invoices)
    .set({
      status: "PAID",
    })
    .where(
      and(
        eq(Invoices.id, invoiceId),
        eq(Invoices.userId, session.user?.id as string),
      ),
    );

  return redirect("/dashboard/invoices");
};
