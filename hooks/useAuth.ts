import { auth } from "@/utils/auth";

import { redirect } from "next/navigation";

export const useAuth = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  return await session;
};
