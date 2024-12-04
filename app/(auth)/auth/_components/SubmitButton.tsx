"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className="w-full">
          <Loader2 className="ml-2 size-2 animate-spin" />
          Please wait...
        </Button>
      ) : (
        <Button type="submit" className="w-full">
          Submit
        </Button>
      )}
    </>
  );
};

export default SubmitButton;
