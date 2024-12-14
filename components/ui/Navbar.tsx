import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";

import { RainbowButton } from "./rainbow-button";
import { useAuth } from "@/hooks/useAuth";

export async function Navbar() {
  const session = await useAuth();
  return (
    <div className="flex items-center justify-between py-5">
      <Link href="/" className="flex w-fit items-center gap-3">
        <Image src={Logo} alt="Logo" className="size-10" />
        <h1 className="text-3xl text-blue-400">Invoice</h1>
      </Link>
      {session.user?.id ? (
        <Link href="/dashboard">
          <RainbowButton>Go Dashboard</RainbowButton>
        </Link>
      ) : (
        <Link href="/login">
          <RainbowButton>Get Unlimted Access</RainbowButton>
        </Link>
      )}
    </div>
  );
}
