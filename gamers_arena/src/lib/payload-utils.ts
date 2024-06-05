import { NextRequest } from "next/server";

export const getServerSideUser = () => {
  cookies: NextRequest["cookies"] | ReadonlyRequestCookies;
};
