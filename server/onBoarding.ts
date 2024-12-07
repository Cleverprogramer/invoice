"use server";

import { useAuth as UseAuth } from "@/hooks/useAuth";

import { redirect } from "next/navigation";

import { parseWithZod } from "@conform-to/zod";
import { onBoardingSchema } from "@/lib/schema";

import { db } from "@/db/db";
import { users } from "@/db/schema/auth";
import { eq } from "drizzle-orm";

export const onBoarding = async (prevState: unknown, formData: FormData) => {
  const session = await UseAuth();

  if (!session.user) {
    return redirect("/auth/login");
  }

  const submission = parseWithZod(formData, {
    schema: onBoardingSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await db
    .update(users)
    .set({
      name: submission.value.firstname,
      fullname: submission.value.firstname,
      lastname: submission.value.lastname,
      address: submission.value.address,
    })
    .where(eq(users.id, session.user.id as string));

  return redirect("/dashboard");
};
