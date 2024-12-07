import React from "react";

import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";

import { useAuth as UseAuth } from "@/hooks/useAuth";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import DashboardLinks from "./_components/DashboardLinks";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const session = await UseAuth();

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
        <div className="w-full">
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
              Userbutton
            </div>
          </div>
          <div className="">{children}</div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
