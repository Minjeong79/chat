import { NextResponse } from "next/server";
import OpenAI from "openai";
import { dataSelectAll, dogDatas } from "../../../../lib/db";
import { DataType } from "../../../../lib/type";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
let aianswer: string | null = null;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { dataid, role, userContent } = body;

    const dogDb = await dogDatas(dataid);

    async function waitForAiChatData(dataid: number, maxAttempts = 5, delayMs = 300): Promise<DataType[]> {
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const aiChatDb = await dataSelectAll(dataid);

        if (aiChatDb && aiChatDb.length > 0) {
          return aiChatDb;
        }
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }

      return [];
    }

    const aiChatDb = await waitForAiChatData(dataid);
    const previousChats = aiChatDb
      .map(chat => `${chat.name}: ${chat.content}`)
      .join("\n");
    console.log(previousChats);
    const dogIntro = `성별은 ${dogDb?.[0]?.gender}, 이름은 ${dogDb?.[0]?.name} 성격은 ${dogDb?.[0]?.personality} 나이는 ${dogDb?.[0].age} 좋아하는 것 ${dogDb?.[0]?.like} 싫어하는 것 ${dogDb?.[0]?.hate} 하는 행동은 ${dogDb?.[0]?.active}인 강아지로 대화해.`;
    const systemMessage = aiChatDb && aiChatDb.length > 0
      ? `${previousChats} 강아지 처럼 기존 대화를 바탕으로 자연 스럽게 강아지 처럼 대화 해 `
      : `${dogIntro} 자연스럽게 반가운 인사를 포함해.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "assistant",
          content: systemMessage,
        },
        {
          role: "user",
          content: userContent || "대화 기록이 없습니다.",
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