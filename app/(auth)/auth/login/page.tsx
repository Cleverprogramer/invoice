import React from "react";

import { redirect } from "next/navigation";

import { auth, signIn } from "@/utils/auth";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "../_components/SubmitButton";

const LoginPage = async () => {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }
  return (
    <>
      <div className="flex items-center justify-center h-screen ">
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login in to your acount
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              action={async (formData: FormData) => {
                "use server";
                await signIn("nodemailer", formData);
              }}
              className="flex flex-col space-y-4">
              <div className="flex flex-col gap-y-2">
                <Label>Email</Label>
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="hello@hello.com"
                />
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
