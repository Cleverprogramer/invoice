import React from "react";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import InvoicesTable from "../_components/InvoicesTable";

const InvoicesPage = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="">
            <CardTitle className="text-2xl">Invoices</CardTitle>
            <CardDescription>Manage your invoices right here</CardDescription>
          </div>
          <Link
            href="/dashboard/invoices/create"
            className={buttonVariants({ variant: "default" })}
          >
            <Plus /> Create Invoice
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <InvoicesTable />
      </CardContent>
    </Card>
  );
};

export default InvoicesPage;
