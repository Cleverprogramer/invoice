"use client";

import { useActionState, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import SubmitButton from "@/app/(auth)/auth/_components/SubmitButton";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { InvoiceSchema } from "@/lib/schema";
import { formatPrice } from "@/utils/formatPrice";

import { InferModel } from "drizzle-orm";
import { Invoices } from "@/db/schema/invoice";

import { EditInvoice } from "@/server/EditInvoice";

type EditInvoiceProps = {
  data: InferModel<typeof Invoices>;
};

export function EditInvoiceForm({ data }: EditInvoiceProps) {
  const [lastResult, action] = useActionState(EditInvoice, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: InvoiceSchema,
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(data.date),
  );
  const [rate, setRate] = useState(data.rate.toString());
  const [quantity, setQuantity] = useState(data.quantity.toString());
  const [currency, setCurrency] = useState<"USD" | "EUR" | null>(data.currency);

  const calcualteTotal = (Number(quantity) || 0) * (Number(rate) || 0);
  return (
    <Card className="mx-auto w-full max-w-4xl">
      <CardContent className="p-6">
        <form id={form.id} action={action} onSubmit={form.onSubmit} noValidate>
          <input
            type="hidden"
            name={fields.date.name}
            value={new Date(selectedDate as Date).toISOString()}
          />
          <input type="hidden" name="id" value={data.id} />

          <input
            type="hidden"
            name={fields.totalAmount.name}
            value={calcualteTotal}
          />

          <div className="mb-6 flex w-fit flex-col gap-1">
            <div className="flex items-center gap-4">
              <Badge>Draft</Badge>
              <Input
                name={fields.invoiceName.name}
                key={fields.invoiceName.key}
                defaultValue={data.invoiceName}
                placeholder="Test 123"
              />
            </div>
            <p className="text-sm text-red-500">{fields.invoiceName.errors}</p>
          </div>

          <div className="mb-6 grid gap-6 md:grid-cols-3">
            <div>
              <Label>Invoice No.</Label>
              <div className="flex">
                <span className="flex items-center rounded-l-md border border-r-0 bg-muted px-3">
                  #
                </span>
                <Input
                  name={fields.invoiceNumber.name}
                  key={fields.invoiceNumber.key}
                  defaultValue={data.invoiceNumber}
                  className="rounded-l-none"
                  placeholder="5"
                />
              </div>
              <p className="text-sm text-red-500">
                {fields.invoiceNumber.errors}
              </p>
            </div>

            <div>
              <Label>Currency</Label>
              <Select
                defaultValue="USD"
                name={fields.currency.name}
                key={fields.currency.key}
                onValueChange={(value) => setCurrency(value as "USD" | "EUR")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">
                    United States Dollar -- USD
                  </SelectItem>
                  <SelectItem value="EUR">Euro -- EUR</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-red-500">{fields.currency.errors}</p>
            </div>
          </div>

          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <div>
              <Label>From</Label>
              <div className="space-y-2">
                <Input
                  name={fields.fromName.name}
                  key={fields.fromName.key}
                  placeholder="Your Name"
                  defaultValue={data.fromName}
                />
                <p className="text-sm text-red-500">{fields.fromName.errors}</p>
                <Input
                  placeholder="Your Email"
                  name={fields.fromEmail.name}
                  key={fields.fromEmail.key}
                  defaultValue={data.fromEmail}
                />
                <p className="text-sm text-red-500">
                  {fields.fromEmail.errors}
                </p>
                <Input
                  placeholder="Your Address"
                  name={fields.fromAddress.name}
                  key={fields.fromAddress.key}
                  defaultValue={data.fromAddress}
                />
                <p className="text-sm text-red-500">
                  {fields.fromAddress.errors}
                </p>
              </div>
            </div>

            <div>
              <Label>To</Label>
              <div className="space-y-2">
                <Input
                  name={fields.clientName.name}
                  key={fields.clientName.key}
                  defaultValue={data.clientName}
                  placeholder="Client Name"
                />
                <p className="text-sm text-red-500">
                  {fields.clientName.errors}
                </p>
                <Input
                  name={fields.clientEmail.name}
                  key={fields.clientEmail.key}
                  defaultValue={data.clientEmail}
                  placeholder="Client Email"
                />
                <p className="text-sm text-red-500">
                  {fields.clientEmail.errors}
                </p>
                <Input
                  name={fields.clientAddress.name}
                  key={fields.clientAddress.key}
                  defaultValue={data.clientAddress}
                  placeholder="Client Address"
                />
                <p className="text-sm text-red-500">
                  {fields.clientAddress.errors}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <div>
              <div>
                <Label>Date</Label>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[280px] justify-start text-left"
                  >
                    <CalendarIcon />

                    {selectedDate ? (
                      new Intl.DateTimeFormat("en-US", {
                        dateStyle: "long",
                      }).format(selectedDate)
                    ) : (
                      <span>Pick a Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    selected={selectedDate}
                    onSelect={(date) => setSelectedDate(date || new Date())}
                    mode="single"
                    fromDate={new Date()}
                  />
                </PopoverContent>
              </Popover>
              <p className="text-sm text-red-500">{fields.date.errors}</p>
            </div>

            <div>
              <Label>Invoice Due</Label>
              <Select
                name={fields.dueDate.name}
                key={fields.dueDate.key}
                defaultValue={data.dueDate.toString()}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select due date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Reciept">Due on Reciept</SelectItem>
                  <SelectItem value="Net15">Net 15</SelectItem>
                  <SelectItem value="Net30">Net 30</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-red-500">{fields.dueDate.errors}</p>
            </div>
          </div>

          <div>
            <div className="mb-2 grid grid-cols-12 gap-4 font-medium">
              <p className="col-span-6">Description</p>
              <p className="col-span-2">Quantity</p>
              <p className="col-span-2">Rate</p>
              <p className="col-span-2">Amount</p>
            </div>

            <div className="mb-4 grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <Textarea
                  name={fields.description.name}
                  key={fields.description.key}
                  defaultValue={data.description}
                  placeholder="Item name & description"
                />
                <p className="text-sm text-red-500">
                  {fields.description.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  name={fields.quantity.name}
                  key={fields.quantity.key}
                  type="number"
                  placeholder="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <p className="text-sm text-red-500">{fields.quantity.errors}</p>
              </div>
              <div className="col-span-2">
                <Input
                  name={fields.rate.name}
                  key={fields.rate.key}
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  type="number"
                  placeholder="0"
                />
                <p className="text-sm text-red-500">{fields.rate.errors}</p>
              </div>
              <div className="col-span-2">
                <Input
                  value={formatPrice({
                    amount: calcualteTotal,
                    currency: currency as "USD" | "EUR",
                  })}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="w-1/3">
              <div className="flex justify-between py-2">
                <span>Subtotal</span>
                <span>
                  {formatPrice({
                    amount: calcualteTotal,
                    currency: currency as "USD" | "EUR",
                  })}
                </span>
              </div>
              <div className="flex justify-between border-t py-2">
                <span>Total ({currency})</span>
                <span className="font-medium underline underline-offset-2">
                  {formatPrice({
                    amount: calcualteTotal,
                    currency: currency as "USD" | "EUR",
                  })}
                </span>
              </div>
            </div>
          </div>

          <div>
            <Label>Note</Label>
            <Textarea
              name={fields.note.name}
              key={fields.note.key}
              defaultValue={data.note ?? undefined}
              placeholder="Add your Note/s right here..."
            />
            <p className="text-sm text-red-500">{fields.note.errors}</p>
          </div>

          <div className="mt-6 flex items-center justify-end">
            <div>
              <SubmitButton label="Update Invoice" />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
