import React from "react";

import { useAuth as UseAuth } from "@/hooks/useAuth";

import DashboardBlocks from "./_components/DashboardBlocks";
import InvoiceGraph from "./_components/InvoiceGraph";
import { RecentInvoices } from "./_components/RecentInvoices";

const DashboardPage = async () => {
  const session = await UseAuth();
  return (
    <>
      <DashboardBlocks />
      <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
        <InvoiceGraph />
        <RecentInvoices />
      </div>
    </>
  );
};

export default DashboardPage;
