import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const id = (await params).id;
  return NextResponse.json(
    { message: `fetch product ${id} ` },
    { status: 200 }
  );
};
