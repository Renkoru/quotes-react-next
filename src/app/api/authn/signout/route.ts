import { redirect, RedirectType } from "next/navigation";
import { deleteSession } from "@lib/utils";
import { NextResponse } from "next/server";

export async function DELETE() {
  deleteSession();

  return NextResponse.json(null);
}
