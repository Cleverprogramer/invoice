import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, CircleAlert, Mail } from "lucide-react";
import BgGradient from "@/app/(dashboard)/dashboard/_components/BgGradient";

const VerifyEmailPage = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <BgGradient />
      <Card className="w-[380px] px-5">
        <CardHeader className="mb-3 text-center">
          <div className="mx-auto mb-5 flex w-fit items-center justify-center rounded-full bg-blue-200 p-5">
            <Mail className="size-10 text-blue-500" />
          </div>
          <CardTitle className="text-2xl font-semibold">
            Check your email
          </CardTitle>
          <CardDescription className="tex">
            We have sent a verification link to your email address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="gap-3 rounded-md border-yellow-300 bg-yellow-50 p-4">
            <div className="flex items-center gap-3">
              <CircleAlert className="text-yellow-400" />
              <p className="text-sm font-medium text-yellow-700">
                Be sure to check your spam folder!
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link
            href="/"
            className={buttonVariants({
              className: "w-full",
              variant: "outline",
            })}
          >
            <ArrowLeft /> Back to Homepage
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyEmailPage;
