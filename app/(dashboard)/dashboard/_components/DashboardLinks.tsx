"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Home, Users } from "lucide-react";

const DashboardLinksData = [
  {
    id: 0,
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    id: 1,
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: Users,
  },
];
const DashboardLinks = () => {
  const pathname = usePathname();
  return (
    <>
      {DashboardLinksData.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          className={cn(
            pathname === link.href ? "bg-gray-300" : "opacity-60",
            "flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-black",
          )}
        >
          <link.icon className="size" />
          {link.name}
        </Link>
      ))}
    </>
  );
};

export default DashboardLinks;
