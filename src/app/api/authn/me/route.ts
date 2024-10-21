import { getSession } from "@lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  const session = getSession();

  if (!session) {
    return NextResponse.json(null);
  }

  const url = `${process.env.BACKEND_URL}/api/users/me`;

  const user = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.jwt}`,
    },
  }).then((res) => res.json());

  return NextResponse.json(user);
}
