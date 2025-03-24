import { NextResponse } from "next/server";
import OpenAI from "openai";
import { dataSelect, dogDatas } from "../../../../lib/db";

let aianswer :string | null = null;
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { dataid } = body;
    console.log('나오는거 맞음?');
    console.log(`${dataid} 여긴 라우터 openai입니다`);
    const dogDb = await dogDatas(dataid.dataid);
    const userChat = await dataSelect(dataid.dataid);

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "assistant",
          content: `성별은 ${dogDb?.[0]?.gender}, 이름은 ${dogDb?.[0]?.name} 성격은 ${dogDb?.[0]?.personality} 좋아하는 것 ${dogDb?.[0]?.like} 싫어하는 것 ${dogDb?.[0]?.hate} 하는 행동은 ${dogDb?.[0]?.active}인 강아지로 대화해 사용자가 먼저 대화를 하면 대답해`,
        },
        {
          role: "user",
          content: `${userChat?.slice(-1)[0]?.content}`,
        },
      ],
      response_format: { type: "text" },
      temperature: 1,
      max_completion_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      store: true,
    });
    aianswer = response.choices[0].message.content

    console.log(`${aianswer} 여긴 라우터 페이지`)
    return NextResponse.json({ aianswer: response.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ error: "AI 응답 생성 실패" }, { status: 500 });
  }
}

export async function GET() {
  try {
      
      return NextResponse.json(
        { message: "dataid 성공적으로 가져옴.", aianswer: aianswer },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "서버 오류 발생", error: error.message },
        { status: 500 }
      );
    }
}