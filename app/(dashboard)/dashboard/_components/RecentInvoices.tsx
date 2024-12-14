import { db } from "@/db/db";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useAuth } from "@/hooks/useAuth";

import { formatPrice } from "@/utils/formatPrice";

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
      id: true,
      clientName: true,
      clientEmail: true,
      totalAmount: true,
      currency: true,
    },
    orderBy(fields, operators) {
      return operators.asc(fields.createdAt);
    },
    limit: 7,
  });
  return data;
};

export async function RecentInvoices() {
  const session = await useAuth();
  const data = await getInvoice(session.user?.id as string);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        {data.map((item) => (
          <div className="flex items-center gap-4" key={item.id}>
            <Avatar className="hidden size-9 sm:flex">
              <AvatarFallback>{item.clientEmail.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <p className="leadin-none text-sm font-medium">
                {item.clientName}
              </p>
              <p className="text-sm text-muted-foreground">
                {item.clientEmail.slice(0, 5)}@gmail.com
              </p>
            </div>
            <div className="ml-auto font-medium">
              +
              {formatPrice({
                amount: item.totalAmount,
                currency: item.currency as "USD" | "EUR",
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
