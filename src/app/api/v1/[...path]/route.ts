import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSession } from "@lib/utils";

const BACKEND_URL = process.env.BACKEND_URL;

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } },
) {
  const cookie = cookies();

  const { path } = params;
  // TODO: add validation if there is no session yet
  const session = getSession();

  const url = `${BACKEND_URL}/api/${path.join("/")}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.jwt}`,
      // "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return NextResponse.json(data);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { path: string[] } },
) {
  const session = getSession();
  console.log("CCOOCOCOCOCO", session.jwt);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { path } = params;
  const url = `${BACKEND_URL}/api/${path.join("/")}`;
  const body = await req.json();

  console.log("TCL: [line 59][route.ts<[...path]>] url: ", url);
  console.log("TCL: [line 57][route.ts<[...path]>] body: ", body);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return NextResponse.json(data);
}
