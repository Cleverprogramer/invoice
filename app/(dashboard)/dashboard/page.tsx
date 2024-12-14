import React from "react";

import { useAuth as UseAuth } from "@/hooks/useAuth";

import DashboardBlocks from "./_components/DashboardBlocks";

const DashboardPage = async () => {
  const session = await UseAuth();
  return (
    <>
      <DashboardBlocks />
    </>
  );
};

export default DashboardPage;
