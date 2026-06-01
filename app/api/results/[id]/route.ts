import { NextResponse, type NextRequest } from "next/server";

import { getResult } from "@/lib/http";

export async function GET(
  _: NextRequest,
  ctx: RouteContext<"/api/results/[id]">,
) {
  const { id } = await ctx.params;

  const result = await getResult(id);

  if (!result) {
    return NextResponse.json(
      { success: false, error: "Room not found." },
      { status: 404 },
    );
  }

  return NextResponse.json(
    { success: true, data: { id, result } },
    { status: 200 },
  );
}

export async function DELETE(request: Request) {}
