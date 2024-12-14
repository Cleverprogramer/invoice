"use server";

import { db } from "@/db/db";
import { Invoices } from "@/db/schema/invoice";
import { and, eq } from "drizzle-orm";

import { useAuth as UseAuth } from "@/hooks/useAuth";

import { redirect } from "next/navigation";

export async function DeleteInvoice(invoiceId: string) {
  const session = await UseAuth();

  const data = await db
    .delete(Invoices)
    .where(
      and(
        eq(Invoices.id, invoiceId),
        eq(Invoices.userId, session.user?.id as string),
      ),
    );

  return redirect("/dashboard/invoices");
}
