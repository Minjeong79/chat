import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../../utils/supabase/createClinet";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { dataid } = body; // 클라이언트에서 보낸 dogid 값
   
    const response = NextResponse.json(
      { message: "데이터가 성공적으로 저장되었습니다.", dogId: dataid },
      { status: 200 }
    );

  
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "서버 오류 발생", error: error.message },
      { status: 500 }
    );
  }
}

