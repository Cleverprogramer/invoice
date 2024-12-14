"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ISubmitButton {
  label: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}

const SubmitButton = ({ label, variant }: ISubmitButton) => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button variant={variant} disabled className="w-full">
          <Loader2 className="ml-2 size-2 animate-spin" />
          Please wait...
        </Button>
      ) : (
        <Button variant={variant} type="submit" className="w-full">
          {label}
        </Button>
      )}
    </>
  );
};

export default SubmitButton;
