import React from "react";

import { useAuth as UseAuth } from "@/hooks/useAuth";

import DashboardBlocks from "./_components/DashboardBlocks";
import InvoiceGraph from "./_components/InvoiceGraph";
import { RecentInvoices } from "./_components/RecentInvoices";
import { EmptyInvoice } from "./_components/EmptyInvoice";

import { db } from "@/db/db";

const getInvoices = async (userId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const data = await db.query.Invoices.findMany({
    where(fields, operators) {
      return operators.and(operators.eq(fields.userId, userId));
    },
    columns: {
      id: true,
    },
  });

  return data;
};

const DashboardPage = async () => {
  const session = await UseAuth();
  const data = await getInvoices(session.user?.id as string);

  return (
    <>
      <DashboardBlocks />

      {data.length > 0 ? (
        <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
          <InvoiceGraph />
          <RecentInvoices />
        </div>
      ) : (
        <EmptyInvoice
          title="No invoices found"
          description="Create an invoice to see it right here"
          buttontext="Create Invoice"
          href="/dashboard/invoices/create"
        />
      )}
    </>
  );
};

export default DashboardPage;
