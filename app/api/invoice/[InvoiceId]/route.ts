import { NextResponse } from "next/server";

import { db } from "@/db/db";
import { Invoices } from "@/db/schema/invoice";
import { eq } from "drizzle-orm";

import { isValidUUID } from "@/utils/isValidUUID";
import { jsPDF } from "jspdf";

import { formatPrice } from "@/utils/formatPrice";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ InvoiceId: string }>;
  },
) {
  const { InvoiceId } = await params;

  if (typeof InvoiceId !== "string" || !isValidUUID(InvoiceId)) {
    return NextResponse.json(
      { error: "Invalid InvoiceId format" },
      { status: 400 },
    );
  }

  const data = await db
    .select()
    .from(Invoices)
    .where(eq(Invoices.id, InvoiceId));

  if (data.length === 0) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // set font
  pdf.setFont("helvetica");

  //set header
  pdf.setFontSize(24);
  pdf.text(data[0].invoiceName, 20, 20);

  // From Section
  pdf.setFontSize(12);
  pdf.text("From", 20, 40);
  pdf.setFontSize(10);
  pdf.text([data[0].fromName, data[0].fromEmail, data[0].fromAddress], 20, 45);

  // Client Section
  pdf.setFontSize(12);
  pdf.text("Bill to", 20, 70);
  pdf.setFontSize(10);
  pdf.text(
    [data[0].clientName, data[0].clientEmail, data[0].clientAddress],
    20,
    75,
  );

  // Invoice details
  pdf.setFontSize(10);
  pdf.text(`Invoice Number: #${data[0].invoiceNumber}`, 120, 40);
  pdf.text(
    `Date: ${new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
    }).format(new Date(data[0].date))}`,
    120,
    45,
  );
  pdf.text(`Due Date: Net ${data[0].dueDate.split("Net")[1]}`, 120, 50);

  // Item table header
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "bold");
  pdf.text("Description", 20, 100);
  pdf.text("Quantity", 100, 100);
  pdf.text("Rate", 130, 100);
  pdf.text("Total", 160, 100);

  // draw header line
  pdf.line(20, 102, 190, 102);

  // Item Details
  pdf.setFont("helvetica", "normal");
  pdf.text(data[0].description, 20, 110);
  pdf.text(data[0].quantity.toString(), 100, 110);
  pdf.text(
    formatPrice({
      amount: data[0].rate,
      currency: data[0].currency as "USD" | "EUR",
    }),
    130,
    110,
  );
  pdf.text(
    formatPrice({
      amount: data[0].totalAmount,
      currency: data[0].currency as "USD" | "EUR",
    }),
    160,
    110,
  );

  // Total Section
  pdf.line(20, 115, 190, 115);
  pdf.setFont("helvetica", "bold");
  pdf.text(`Total (${data[0].currency})`, 130, 130);
  pdf.text(
    formatPrice({
      amount: data[0].totalAmount,
      currency: data[0].currency as "USD" | "EUR",
    }),
    160,
    130,
  );

  //Additional Note
  if (data[0].note) {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text("Note:", 20, 150);
    pdf.text(data[0].note, 20, 155);
  }

  const jsBuffer = Buffer.from(pdf.output("arraybuffer"));

  return new NextResponse(jsBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline",
    },
  });
}
