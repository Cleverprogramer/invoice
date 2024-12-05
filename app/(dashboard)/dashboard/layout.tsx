import React from "react";

import Link from "next/link";
import Image from "next/image";
import DashboardLinks from "./_components/DashboardLinks";
import logo from "@/public/logo.png";

import { useAuth as UseAuth } from "@/hooks/useAuth";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const session = await UseAuth();

  return (
    <div className="grid grid-cols-[280_1fr]">
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
      {children}
    </div>
  );
};

export default DashboardLayout;
