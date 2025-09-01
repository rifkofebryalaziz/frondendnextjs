import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const skip = searchParams.get("skip");
  const limit = searchParams.get("limit");

  return NextResponse.json({ name: "Phone", skip, limit }, { status: 200 });
};

export const POST = async (request: NextRequest) => {
  const payload = await request.json();
  return NextResponse.json(payload, { status: 201 });
};
