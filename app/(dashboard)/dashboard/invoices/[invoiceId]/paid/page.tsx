import React from "react";

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import PaidGif from "@/public/paid-gif.gif";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import SubmitButton from "@/app/(auth)/auth/_components/SubmitButton";

import { db } from "@/db/db";

import { useAuth } from "@/hooks/useAuth";

import { MarkPaidInvoice } from "@/server/MarkPaid";

const getInvoice = async (invoiceId: string, userId: string) => {
  const data = await db.query.Invoices.findFirst({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.id, invoiceId),
        operators.eq(fields.userId, userId),
      );
    },
  });

  if (!data) {
    return redirect("/dashboard/invoices");
  }
};

type MarkAsPaidType = {
  params: Promise<{ invoiceId: string }>;
};

const MarkAsPaidPage = async ({ params }: MarkAsPaidType) => {
  const { invoiceId } = await params;
  const session = await useAuth();
  await getInvoice(invoiceId, session.user?.id as string);
  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="max-w-[500px]">
        <CardHeader>
          <CardTitle>Mark as Paid?</CardTitle>
          <CardDescription>
            Are you sure you want to mark this invoice as paid?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image src={PaidGif} alt="Paid Gif" className="rounded-lg" />
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/dashboard/invoices"
          >
            Cancel
          </Link>
          <form
            action={async () => {
              "use server";
              await MarkPaidInvoice(invoiceId);
            }}
          >
            <SubmitButton label="Mark ad Paid!" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MarkAsPaidPage;
