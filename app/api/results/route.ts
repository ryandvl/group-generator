import { createResult } from "@/lib/http";
import { generateGroups } from "@/utils/generation";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { participants, minGroup, maxGroup, idealSize } = await request.json();

  if (!participants || !minGroup || !maxGroup || !idealSize) {
    return NextResponse.json(
      {
        success: false,
        error: "Cannot find fields.",
      },
      {
        status: 400,
      },
    );
  }

  const result = generateGroups(participants, idealSize, minGroup, maxGroup);
  const code = await createResult(result);

  return NextResponse.json(
    {
      success: true,
      message: "Result created.",
      data: {
        participants,
        minGroup,
        maxGroup,
        idealSize,
        code,
      },
    },
    {
      status: 201,
    },
  );
}
