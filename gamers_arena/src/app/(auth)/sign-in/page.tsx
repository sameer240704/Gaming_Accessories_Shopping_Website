"use client";

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from "@/lib/validators/account-credentials-validator";
import { trpc } from "@/trpc/client";
import { toast } from "react-hot-toast";
import { ZodError } from "zod";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const isSeller = searchParams.get("as") === "seller";
  const origin = searchParams.get("origin"); // Using to redirect from the card page to the sign-in page

  const continueAsSeller = () => {};

  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    onError: (error) => {
      toast.dismiss();
      if (error.data?.code === "UNAUTHORIZED") {
        toast.error("Invalid email or password!");
        return;
      }

      if (error instanceof ZodError) toast.error(error.issues[0].message); // *Using this just for better security

      toast.error("Please try again!");
    },

    onSuccess: () => {
      toast.success("User has been signed in successfully");
      router.refresh();
      if (origin) {
        router.push(`/${origin}`);
        return;
      }
      if (isSeller) {
        router.push("/sell");
        return;
      }
      router.push("/");
    },
  });

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    signIn({ email, password });
  };

  return (
    <>
      <div className="container relative flex flex-col items-center justify-center pt-20 lg:px-0">
        <div className="mx-auto w-full flex flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-bold">Login to your Account</h1>
            <Link
              href="/sign-up"
              className={buttonVariants({ variant: "link" })}
            >
              Don&apos;t have an account? Sign Up
              <FaLongArrowAltRight className="ml-2" />
            </Link>
          </div>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="johndoe@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 lg:text-lg">
                      {errors.email?.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register("password")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    placeholder="johndoe123"
                    type="password"
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500 lg:text-lg">
                      {errors.password?.message}
                    </p>
                  )}
                </div>
                <Button>Sign In</Button>
              </div>
            </form>
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  or
                </span>
              </div>
            </div>
            {isSeller ? (
              <Button>Continue as customer</Button>
            ) : (
              <Button>Continue as Seller</Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
