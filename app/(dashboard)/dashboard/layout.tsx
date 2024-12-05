import React from "react";

import { useAuth as UseAuth } from "@/hooks/useAuth";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const session = await UseAuth();

  return <div>{children}</div>;
};

export default DashboardLayout;
