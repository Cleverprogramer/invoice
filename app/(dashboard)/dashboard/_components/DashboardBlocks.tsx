import React from "react";

import { useAuth } from "@/hooks/useAuth";

import { db } from "@/db/db";

import { formatPrice } from "@/utils/formatPrice";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

async function getAnalytics(userId: string) {
  const [data, openInvoices, paidinvoices] = await Promise.all([
    db.query.Invoices.findMany({
      where: (feilds, operators) => {
        return operators.and(operators.eq(feilds.userId, userId));
      },
      columns: { totalAmount: true },
    }),

    db.query.Invoices.findMany({
      where: (feilds, operators) => {
        return operators.and(
          operators.eq(feilds.userId, userId),
          operators.eq(feilds.status, "PENDING"),
        );
      },
      columns: { id: true },
    }),

    db.query.Invoices.findMany({
      where: (feilds, operators) => {
        return operators.and(
          operators.eq(feilds.userId, userId),
          operators.eq(feilds.status, "PAID"),
        );
      },
      columns: { id: true },
    }),
  ]);

  return {
    data,
    openInvoices,
    paidinvoices,
  };
}

const DashboardBlocks = async () => {
  const session = await useAuth();
  const { data, openInvoices, paidinvoices } = await getAnalytics(
    session.user?.id as string,
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">
            {formatPrice({
              amount: data.reduce(
                (acc, invoice) => acc + invoice.totalAmount,
                0,
              ),
              currency: "USD",
            })}
          </h2>
          <p className="text-xs text-muted-foreground">Based on total volume</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Invoices Issued
          </CardTitle>
          <Users className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+{data.length}</h2>
          <p className="text-xs text-muted-foreground">Total Invoices Isued!</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
          <CreditCard className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+{paidinvoices.length}</h2>
          <p className="text-xs text-muted-foreground">
            Total Invoices which have been paid!
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Pending Invoices
          </CardTitle>
          <Activity className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+{openInvoices.length}</h2>
          <p className="text-xs text-muted-foreground">
            Invoices which are currently pending!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardBlocks;
