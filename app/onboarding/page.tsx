"use client";

import React, { useActionState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "../(auth)/auth/_components/SubmitButton";
import { useForm } from "@conform-to/react";

import { onBoarding } from "@/server/onBoarding";
import { parseWithZod } from "@conform-to/zod";
import { onBoardingSchema } from "@/lib/schema";

const OnBoardingPage = () => {
  const [lastResult, action] = useActionState(onBoarding, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: onBoardingSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <div className="mx-auto flex min-h-screen w-screen items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">You are almost finished!</CardTitle>
          <CardDescription>
            Enter your information to create an acount
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={action}
            onSubmit={form.onSubmit}
            id={form.id}
            noValidate
          >
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
                  />
                  <p className="text-sm text-red-500">
                    {fields.firstname.errors}
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input
                    key={fields.lastname.key}
                    name={fields.lastname.name}
                    defaultValue={fields.lastname.initialValue}
                    id="lastname"
                    placeholder="Doe"
                  />
                  <p className="text-sm text-red-500">
                    {fields.lastname.errors}
                  </p>
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
                />
                <p className="text-sm text-red-500">{fields.address.errors}</p>
              </div>
            </div>
            <SubmitButton label="Finish onboarding" />
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnBoardingPage;
