import * as jose from "jose";
import { NextRequest } from "next/server";
import { redirect, RedirectType } from "next/navigation";
import { setSession } from "@lib/utils";

const ACCESS_TOKEN_QUERY_KEY = "access_token";

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } },
) {
  const searchParams = req.nextUrl.searchParams;
  const accessToken = searchParams.get(ACCESS_TOKEN_QUERY_KEY);

  // https://strapi.website.com/api/auth/github/callback?access_token=eyfvg

  const backendRes = await fetch(
    `${process.env.BACKEND_AUTH_GOOGLE_CALLBACK_URL}?access_token=${accessToken}`,
  ).then((res) => res.json());
  console.log(
    "TCL: [line 25][route.ts<authenticate>] backendRes: ",
    backendRes,
  );

  const expiresAt = jose.decodeJwt(backendRes.jwt).exp;

  setSession(backendRes, expiresAt);

  // console.log("TCL: [line 22][route.ts<authenticate>] claims: ", claims);

  // query is "hello" for /api/search?query=hello
  // const { path } = params;

  // TODO: replace with payload param

  // const data = await response.json();
  // return NextResponse.json(data);

  redirect("/");
}
