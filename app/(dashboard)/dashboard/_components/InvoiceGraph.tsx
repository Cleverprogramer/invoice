import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Graph } from "./Graph";

import { db } from "@/db/db";

import { useAuth } from "@/hooks/useAuth";

const getInvoice = async (userId: string) => {
  const data = await db.query.Invoices.findMany({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, userId),
        operators.eq(fields.status, "PAID"),
        operators.lte(fields.createdAt, new Date(Date.now())),
      );
    },
    columns: {
      totalAmount: true,
      createdAt: true,
    },
    orderBy(fields, operators) {
      return operators.asc(fields.createdAt);
    },
  });

  const aggregatedData = data.reduce((acc: { [key: string]: number }, curr) => {
    const date = new Date(curr.createdAt as Date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    acc[date] = (acc[date] || 0) + curr.totalAmount;

    return acc;
  }, {});

  //Convert to array and from the object
  const transformedData = Object.entries(aggregatedData)
    .map(([date, amount]) => ({
      date,
      amount,
      originalDate: new Date(date + ", " + new Date().getFullYear()),
    }))
    .sort((a, b) => a.originalDate.getTime() - b.originalDate.getTime())
    .map(({ date, amount }) => ({
      date,
      amount,
    }));

  return transformedData;
};

const InvoiceGraph = async () => {
  const session = await useAuth();
  const data = await getInvoice(session.user?.id as string);
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Paid Invoices</CardTitle>
        <CardDescription>
          Invoices which have been paid in the last 30 days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Graph data={data} />
      </CardContent>
    </Card>
  );
};

export default InvoiceGraph;
