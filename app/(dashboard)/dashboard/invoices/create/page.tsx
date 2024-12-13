import React from "react";

import CreateInvoiceForm from "../../_components/CreateInvoiceForm";

import { users } from "@/db/schema/auth";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";

import { useAuth } from "@/hooks/useAuth";

async function getUser(userId: string) {
  const data = await db.select().from(users).where(eq(users.id, userId));
  const user = data[0];
  return user;
}

const CreateInvoicePage = async () => {
  const session = await useAuth();
  const user = await getUser(session.user?.id as string);

  return (
    <CreateInvoiceForm
      lastName={user?.lastname as string}
      address={user?.address as string}
      email={user?.email as string}
      firstName={user?.fullname as string}
    />
  );
};

export default CreateInvoicePage;
