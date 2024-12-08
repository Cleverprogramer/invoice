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
import {
  CircleCheckBig,
  CloudDownload,
  Ellipsis,
  Pencil,
  Trash,
} from "lucide-react";

const InvoicesTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice Id</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>#1</TableCell>
          <TableCell>Clever qazi</TableCell>
          <TableCell>$55.00</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>08/12/2024</TableCell>
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
      </TableBody>
    </Table>
  );
};

export default InvoicesTable;
