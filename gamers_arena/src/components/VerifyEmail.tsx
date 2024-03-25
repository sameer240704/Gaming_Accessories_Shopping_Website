"use client";

import { trpc } from "@/trpc/client";
import { MdCancel } from "react-icons/md";
import Image from "next/image";
import EmailSent from "../../public/email-sent-illustration.gif";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { BiLoaderCircle } from "react-icons/bi";

interface VerifyEmailProps {
  token: string;
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  if (false) {
    return (
      <div className="flex flex-col items-center gap-2">
        <MdCancel className="h-10 w-10 text-red-600" />
        <h3 className="font-semibold text-xl">A problem has occurred</h3>
        <p className="text-muted-foreground text-sm text-center">
          This token is not valid or has possibly expired. Please try again.
        </p>
      </div>
    );
  }

  if (false) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="relative mb-4 h-60 w-60 text-muted-foreground">
          <Image src={EmailSent} alt="Email Sent Icon" />
        </div>
        <h3 className="font-semibold text-2xl">You&apos;re all set!</h3>
        <p className="text-muted-foreground text-center mt-1">
          Your email has been successfully verified!
        </p>
        <Link href="sign-in" className={buttonVariants({ className: "mt-4" })}>
          Sign In
        </Link>
      </div>
    );
  }

  if (true) {
    return (
      <div className="flex flex-col items-center gap-2">
        <BiLoaderCircle className="animate-spin h-10 w-10 text-blue-600" />
        <h3 className="font-semibold text-xl">Verifying...</h3>
        <p className="text-muted-foreground text-sm text-center">
          This won&apos;t take long
        </p>
      </div>
    );
  }
};

export default VerifyEmail;
