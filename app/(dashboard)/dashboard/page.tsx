import React from "react";

import { useAuth as UseAuth } from "@/hooks/useAuth";

const DashboardPage = async () => {
  const session = await UseAuth();
  return <div>Hello from the Dashboard</div>;
};

export default DashboardPage;
