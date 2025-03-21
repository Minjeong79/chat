import { NextResponse } from "next/server";
import OpenAI from "openai";
import { dataSelect, dogDatas } from "../../../../lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { dataid } = body;
    console.log(dataid);
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

    return NextResponse.json({ aianswer: response.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ error: "AI 응답 생성 실패" }, { status: 500 });
  }
}
