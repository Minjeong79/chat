import { userContentData } from "@/app/actions/actions";
import { NextRequest, NextResponse } from "next/server";


let userContent: string | null = null;

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { userContent } = body; 

    console.log(`${userContent} 값 들어 옴?`)
    
    const response = NextResponse.json(
        { message: "사용자 데이터 저장되었습니다.", userContent: userContent },
        { status: 200 }
      );

    return response;
}


export async function GET() {
    try {

        return NextResponse.json(
            { message: "사용자 데이터  성공적으로 가져옴.", userContent: userContent },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "서버 오류 발생", error: error.message },
            { status: 500 }
        );
    }
}