import { NextRequest, NextResponse } from "next/server";
let storedDataId: string | null = null;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { dataid } = body; // 클라이언트에서 보낸 dogid 값
    
    // 받은 dataid를 서버 메모리에 저장
    storedDataId = dataid;

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

export async function GET(req: NextRequest) {
  try {
    
    return NextResponse.json(
      { message: "dataid 성공적으로 가져옴.", dataid: storedDataId },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "서버 오류 발생", error: error.message },
      { status: 500 }
    );
  }
}
