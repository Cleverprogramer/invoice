import React from "react";

import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import { redirect } from "next/navigation";

import { useAuth as UseAuth } from "@/hooks/useAuth";
import { signOut } from "@/utils/auth";

import { db } from "@/db/db";
import { users } from "@/db/schema/auth";
import { eq } from "drizzle-orm";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import DashboardLinks from "./_components/DashboardLinks";
import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toaster } from "@/components/ui/sonner";

async function getUser(userId: string) {
  const data = await db.select().from(users).where(eq(users.id, userId));
  const user = data[0];
  if (!user.name || !user.fullname || !user.lastname || !user.address) {
    redirect("/onboarding");
  }
  return user;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const session = await UseAuth();
  const user = await getUser(session?.user?.id as string);

  return (
    <>
      <div className="min-h-scren grid gap-0 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden min-h-screen w-full border-r border-opacity-10 bg-secondary md:block">
          <div className="flex flex-col">
            <div className="mb-3 w-full border-b border-opacity-10 px-5 py-5">
              <Link href="/" className="flex w-fit items-center gap-3">
                <Image src={logo} alt="Logo" className="size-10" />
                <h1 className="text-3xl text-blue-400">Invoice</h1>
              </Link>
            </div>
            <div className="w-full flex-1 self-center px-5">
              <nav className="flex flex-col gap-3">
                <DashboardLinks />
              </nav>
            </div>
          </div>
        </div>
        <header className="w-full">
          <div className="flex items-center justify-between border-b border-opacity-10 px-5 py-4 md:py-5">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"outline"} size={"icon"} className="md:hidden">
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side={"left"}>
                <SheetTitle>
                  <div className="mb-3 w-full border-b border-opacity-10 px-5 py-5">
                    <Link href="/" className="flex w-fit items-center gap-3">
                      <Image src={logo} alt="Logo" className="size-10" />
                      <h1 className="text-3xl text-blue-400">Invoice</h1>
                    </Link>
                  </div>
                </SheetTitle>
                <nav className="flex flex-col justify-between gap-3">
                  <DashboardLinks />
                </nav>
              </SheetContent>
            </Sheet>

            <div className="ml-auto flex items-center justify-end md:pb-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    className="rounded-full"
                  >
                    <User className="size-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/invoices">Invoices</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <form
                      action={async () => {
                        "use server";
                        await signOut();
                      }}
                    >
                      <button>Logout</button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <main className="px-5 py-5">{children}</main>
        </header>
        <Toaster richColors closeButton theme="light" />
      </div>
    </>
  );
};

export default DashboardLayout;
