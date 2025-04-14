import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const dataid = searchParams.get("dataid"); 
   
    if (!dataid) {
      return NextResponse.json(
        { message: "dataid query parameter is required." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "dataid 성공적으로 보냄.", dataid: dataid },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error occurred." },
      { status: 500 }
    );
  }
}
