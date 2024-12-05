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

const VerifyEmailPage = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <Card className=" w-[380px] px-5">
        <CardHeader className="mb-3 text-center">
          <div className="mb-5 bg-blue-200 w-fit p-5 rounded-full flex items-center justify-center mx-auto">
            <Mail className="text-blue-500 size-10" />
          </div>
          <CardTitle className="text-2xl font-semibold">
            Check your email
          </CardTitle>
          <CardDescription className="tex">
            We have sent a verification link to your email address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-yellow-50 border-yellow-300 p-4 rounded-md gap-3">
            <div className="flex items-center gap-3">
              <CircleAlert className="text-yellow-400" />
              <p className="text-yellow-700 text-sm font-medium">
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
            })}>
            <ArrowLeft /> Back to Homepage
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyEmailPage;
