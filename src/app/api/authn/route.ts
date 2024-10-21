import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
// import { auth, STRAPI_ACCESS_TOKEN_KEY } from "@auth";
// import { getToken } from "@auth/core/jwt";
// import { decode } from "@auth/core/jwt";
// import { cookies } from "next/headers";

const CONNECT_URL = process.env.BACKEND_AUTH_CONNECT_URL;

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } },
) {
  // const { path } = params;

  // TODO: replace with payload param
  const provider = "google";

  const url = `${CONNECT_URL}/${provider}`;

  // const data = await response.json();
  // return NextResponse.json(data);

  redirect(url);
}
