"use client";

import React from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/app/(auth)/auth/_components/SubmitButton";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";

import { InvoiceSchema } from "@/lib/schema";
import { Invoice as newInvoice } from "@/server/Invoice";
import { formatPrice } from "@/utils/formatPrice";

interface CreateInvoiceFormProps {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
}

const CreateInvoiceForm = ({
  address,
  email,
  firstName,
  lastName,
}: CreateInvoiceFormProps) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date(),
  );
  const [quantity, setQuantity] = React.useState<number>(0);
  const [rate, setRate] = React.useState<number>(0);
  const [currency, setCurrency] = React.useState<"USD" | "EUR">();
  const calculateTotalAmount = quantity * rate;
  const [lastResult, action] = React.useActionState(newInvoice, undefined);
  const [form, fields] = useForm({
    defaultValue: {
      fromName: `${firstName} ${lastName}`,
      fromEmail: email,
      fromAddress: address,
    },
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: InvoiceSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <Card>
      <CardContent className="p-5">
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <section className="space-y-6">
            <input
              name={fields.date.name}
              value={selectedDate?.toISOString()}
              readOnly
              hidden
            />

            <input
              name={fields.totalAmount.name}
              value={calculateTotalAmount}
              readOnly
              hidden
            />

            <div className="flex items-center gap-5 lg:w-1/3">
              <Badge>Draft</Badge>
              <div>
                <Input
                  autoComplete="off"
                  placeholder="Invoice Name"
                  name={fields.invoiceName.name}
                  defaultValue={fields.invoiceName.initialValue}
                  key={fields.invoiceName.key}
                />
                <p className="text-sm text-red-500">
                  {fields.invoiceName.errors}
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="">
                <Label>Invoice No.</Label>
                <div>
                  <Input
                    autoComplete="off"
                    name={fields.invoiceNumber.name}
                    defaultValue={fields.invoiceNumber.initialValue}
                    key={fields.invoiceNumber.key}
                    placeholder="INV-001"
                  />
                  <p className="text-sm text-red-500">
                    {fields.invoiceNumber.errors}
                  </p>
                </div>
              </div>
              <div className="">
                <Label>Currency</Label>
                <Select
                  name={fields.currency.name}
                  defaultValue={fields.currency.initialValue}
                  key={fields.currency.key}
                  onValueChange={(e) => setCurrency(e as "USD" | "EUR")}
                >
                  <SelectTrigger defaultValue={"USD"}>
                    <SelectValue placeholder="United States Dollar -- USD" />
                    <SelectContent>
                      <SelectItem value="USD">
                        United States Dollar -- USD
                      </SelectItem>
                      <SelectItem value="EUR">Euro -- EUR</SelectItem>
                    </SelectContent>
                  </SelectTrigger>
                </Select>
                <p className="text-sm text-red-500">{fields.currency.errors}</p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="w-full space-y-2">
                <Label>From</Label>
                <Input
                  autoComplete="off"
                  name={fields.fromName.name}
                  defaultValue={fields.fromName.initialValue}
                  key={fields.fromName.key}
                  placeholder="Your Name"
                />
                <p className="text-sm text-red-500">{fields.fromName.errors}</p>
                <Input
                  autoComplete="off"
                  name={fields.fromEmail.name}
                  defaultValue={fields.fromEmail.initialValue}
                  key={fields.fromEmail.key}
                  placeholder="Your Email"
                />
                <p className="text-sm text-red-500">
                  {fields.fromEmail.errors}
                </p>
                <Input
                  autoComplete="off"
                  name={fields.fromAddress.name}
                  defaultValue={fields.fromAddress.initialValue}
                  key={fields.fromAddress.key}
                  placeholder="Your Address"
                />
                <p className="text-sm text-red-500">
                  {fields.fromAddress.errors}
                </p>
              </div>
              <div className="w-full space-y-2">
                <Label>To</Label>
                <Input
                  autoComplete="off"
                  name={fields.clientName.name}
                  defaultValue={fields.clientName.initialValue}
                  key={fields.clientName.key}
                  placeholder="Client Name"
                />
                <p className="text-sm text-red-500">
                  {fields.clientName.errors}
                </p>
                <Input
                  autoComplete="off"
                  name={fields.clientEmail.name}
                  defaultValue={fields.clientEmail.initialValue}
                  key={fields.clientEmail.key}
                  placeholder="Client Email"
                />
                <p className="text-sm text-red-500">
                  {fields.clientEmail.errors}
                </p>
                <Input
                  autoComplete="off"
                  name={fields.clientAddress.name}
                  defaultValue={fields.clientAddress.initialValue}
                  key={fields.clientAddress.key}
                  placeholder="Client Address"
                />
                <p className="text-sm text-red-500">
                  {fields.clientAddress.errors}
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex w-full flex-col space-y-2">
                <Label>Date</Label>
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
                      onSelect={(date) => setSelectedDate(date)}
                      mode="single"
                      fromDate={new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="">
                <Label>Due Date</Label>
                <Select
                  name={fields.dueDate.name}
                  defaultValue={fields.dueDate.initialValue}
                  key={fields.dueDate.key}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select due date" />
                    <SelectContent>
                      <SelectItem value="Reciept">Due on Reciept</SelectItem>
                      <SelectItem value="Net15">Net 15</SelectItem>
                      <SelectItem value="Net30">Net 30</SelectItem>
                    </SelectContent>
                  </SelectTrigger>
                </Select>
                <p className="text-sm text-red-500">{fields.dueDate.errors}</p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-12">
              <div className="col-span-6 flex w-full flex-col space-y-2">
                <Label>Description</Label>
                <Textarea
                  autoComplete="off"
                  name={fields.description.name}
                  defaultValue={fields.description.initialValue}
                  key={fields.description.key}
                  placeholder="Item name and discription"
                />
                <p className="text-sm text-red-500">
                  {fields.description.errors}
                </p>
              </div>
              <div className="col-span-2 flex w-full flex-col space-y-2">
                <Label>Quantity</Label>
                <Input
                  autoComplete="off"
                  name={fields.quantity.name}
                  defaultValue={fields.quantity.initialValue}
                  key={fields.quantity.key}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  type="number"
                  value={quantity}
                  placeholder="0"
                />
                <p className="text-sm text-red-500">{fields.quantity.errors}</p>
              </div>
              <div className="col-span-2 flex w-full flex-col space-y-2">
                <Label>Rate</Label>
                <Input
                  autoComplete="off"
                  name={fields.rate.name}
                  defaultValue={fields.rate.initialValue}
                  key={fields.rate.key}
                  onChange={(e) => setRate(Number(e.target.value))}
                  type="number"
                  value={rate}
                  placeholder="0"
                />
                <p className="text-sm text-red-500">{fields.rate.errors}</p>
              </div>
              <div className="col-span-2 flex w-full flex-col space-y-2">
                <Label>Amount</Label>
                <Input
                  autoComplete="off"
                  value={formatPrice({
                    amount: calculateTotalAmount,
                    currency: (currency as "USD" | "EUR") || "USD",
                  })}
                  disabled
                  readOnly
                  placeholder="0"
                />
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="">
                <Label>Note</Label>
                <Textarea
                  autoComplete="off"
                  name={fields.note.name}
                  defaultValue={fields.note.initialValue}
                  key={fields.note.key}
                  placeholder="Add your Note/s right here.."
                />
              </div>
              <div className="mr-auto flex w-full items-center justify-end">
                <div className="flex w-1/2 flex-col items-center justify-between space-y-3">
                  <div className="flex w-full justify-between">
                    <p>SubTotal</p>
                    <span>
                      {formatPrice({
                        amount: calculateTotalAmount,
                        currency: (currency as "USD" | "EUR") || "USD",
                      })}
                    </span>
                  </div>
                  <div className="w-full border-b"></div>
                  <div className="flex w-full justify-between">
                    <p>SubTotal</p>
                    <span>
                      {formatPrice({
                        amount: calculateTotalAmount,
                        currency: (currency as "USD" | "EUR") || "USD",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-auto flex w-fit justify-end">
              <SubmitButton label="Send invoice to client" />
            </div>
          </section>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateInvoiceForm;
