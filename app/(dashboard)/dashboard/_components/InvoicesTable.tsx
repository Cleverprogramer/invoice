import React from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  CircleCheckBig,
  CloudDownload,
  Ellipsis,
  Pencil,
  Trash,
} from "lucide-react";

import { db } from "@/db/db";
import { Invoices } from "@/db/schema/invoice";
import { eq } from "drizzle-orm";

import { useAuth } from "@/hooks/useAuth";

import { formatPrice } from "@/utils/formatPrice";
import { formatDate } from "@/utils/formatDate";

async function getInvoices(userId: string) {
  const data = await db
    .select()
    .from(Invoices)
    .where(eq(Invoices.userId, userId));
  return data;
}

const InvoicesTable = async () => {
  const session = await useAuth();
  const invoices = await getInvoices(session.user?.id as string);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden md:block">Invoice Id</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="hidden md:block">Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="hidden md:block">
              #{invoice.invoiceNumber}
            </TableCell>
            <TableCell>{invoice.clientName}</TableCell>
            <TableCell>
              {formatPrice({
                amount: invoice.totalAmount,
                currency: (invoice.currency as "USD") || "EUR",
              })}
            </TableCell>
            <TableCell>
              <Badge>{invoice.status}</Badge>
            </TableCell>
            <TableCell className="hidden md:block">
              {formatDate(invoice.createdAt as Date)}
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size={"icon"} variant={"secondary"}>
                    <Ellipsis className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end">
                  <DropdownMenuItem asChild>
                    <Link href="">
                      <Pencil className="mr-2 size-4" /> Edit Invoice
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="">
                      <CloudDownload className="mr-2 size-4" /> Download Invoice
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="">
                      <CloudDownload className="mr-2 size-4" /> Reminder Email
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="">
                      <Trash className="mr-2 size-4" /> Delete Invoice
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="">
                      <CircleCheckBig className="mr-2 size-4" /> Mark as Paid
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default InvoicesTable;
