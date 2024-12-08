"use client";

import React from "react";

import { onBoardingSchema } from "@/lib/schema";
import { onBoarding } from "@/server/onBoarding";
import { parseWithZod } from "@conform-to/zod";

import { useForm } from "@conform-to/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/app/(auth)/auth/_components/SubmitButton";
import { z } from "zod";

type OnBoardingFormProps = z.infer<typeof onBoardingSchema>;

const OnBoardingForm = ({
  address,
  firstname,
  lastname,
}: OnBoardingFormProps) => {
  const [lastResult, action] = React.useActionState(onBoarding, undefined);
  const [form, fields] = useForm({
    defaultValue: {
      address,
      firstname,
      lastname,
    },
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: onBoardingSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <form action={action} onSubmit={form.onSubmit} id={form.id} noValidate>
      <div className="mb-2 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-3">
            <Label htmlFor="firstname">First Name</Label>
            <Input
              key={fields.firstname.id}
              name={fields.firstname.name}
              defaultValue={fields.firstname.initialValue}
              id="firstname"
              placeholder="John"
              autoComplete="off"
            />
            <p className="text-sm text-red-500">{fields.firstname.errors}</p>
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="lastname">Last Name</Label>
            <Input
              key={fields.lastname.key}
              name={fields.lastname.name}
              defaultValue={fields.lastname.initialValue}
              id="lastname"
              placeholder="Doe"
              autoComplete="off"
            />
            <p className="text-sm text-red-500">{fields.lastname.errors}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="address">Address</Label>
          <Input
            key={fields.address.key}
            name={fields.address.name}
            defaultValue={fields.address.initialValue}
            id="address"
            placeholder="Street"
            autoComplete="off"
          />
          <p className="text-sm text-red-500">{fields.address.errors}</p>
        </div>
      </div>
      <SubmitButton label="Finish onboarding" />
    </form>
  );
};

export default OnBoardingForm;
