import React from "react";

import { notFound } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

import { db } from "@/db/db";

import { EditInvoiceForm } from "../../_components/EditInvoiceForm";

async function getData(invoiceId: string, userId: string) {
  const data = await db.query.Invoices.findFirst({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, userId),
        operators.eq(fields.id, invoiceId),
      );
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

type EditInvoiceType = {
  params: Promise<{ invoiceId: string }>;
};

const EditInvoicePage = async ({ params }: EditInvoiceType) => {
  const { invoiceId } = await params;
  const session = await useAuth();
  const data = await getData(invoiceId, session.user?.id as string);

  return <EditInvoiceForm data={data} />;
};

export default EditInvoicePage;
