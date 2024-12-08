import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import OnBoardingForm from "../(dashboard)/dashboard/_components/OnBoardingForm";

import { useAuth } from "@/hooks/useAuth";

import { users } from "@/db/schema/auth";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";

async function getUser(userId: string) {
  const data = await db.select().from(users).where(eq(users.id, userId));
  const user = data[0];

  return user;
}

const OnBoardingPage = async () => {
  const session = await useAuth();
  const user = await getUser(session.user?.id as string);
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
          <OnBoardingForm
            address={user.address as string}
            firstname={user.fullname as string}
            lastname={user.lastname as string}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default OnBoardingPage;
