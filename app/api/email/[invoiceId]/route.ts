import { db } from "@/db/db";

import { useAuth as UseAuth } from "@/hooks/useAuth";

import { emailClient } from "@/utils/mailtrap";

import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  },
) {
  try {
    const session = await UseAuth();

    const { invoiceId } = await params;

    const invoiceData = await db.query.Invoices.findFirst({
      where(fields, operators) {
        return operators.and(
          operators.eq(fields.id, invoiceId),
          operators.eq(fields.userId, session.user?.id as string),
        );
      },
    });

    if (!invoiceData) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const sender = {
      email: "hello@demomailtrap.com",
      name: "Clever programmer",
    };

    emailClient.send({
      from: sender,
      to: [{ email: invoiceData.clientEmail }],
      template_uuid: "58b43788-2d0f-4b5f-9b83-a1249713318a",
      template_variables: {
        first_name: invoiceData.clientName,
        company_info_name: "Invoice",
        company_info_address: "San Francisco",
        company_info_city: "California",
        company_info_zip_code: "+1",
        company_info_country: "USA",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send Email reminder" },
      { status: 500 },
    );
  }
}
