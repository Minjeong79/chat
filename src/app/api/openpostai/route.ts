import { NextResponse } from "next/server";
import OpenAI from "openai";
import { dataSelectAi, dogDatas } from "../../../../lib/db";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
let aianswer: string | null = null;
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { dataid, role , userContent} = body;

    const dogDb = await dogDatas(dataid);
    const aiChatDb = await dataSelectAi(dataid, "aidog");  // AI가 했던 대화
    console.log(aiChatDb);
    const dogIntro = `성별은 ${dogDb?.[0]?.gender}, 이름은 ${dogDb?.[0]?.name} 성격은 ${dogDb?.[0]?.personality} 나이는 ${dogDb?.[0].age} 좋아하는 것 ${dogDb?.[0]?.like} 싫어하는 것 ${dogDb?.[0]?.hate} 하는 행동은 ${dogDb?.[0]?.active}인 강아지로 대화해.`;
    const systemMessage = aiChatDb && aiChatDb.length > 0
    ? `${aiChatDb} 기존 데이터를 참고해서 대화를 이어가. 인사는 생략하고 자연스럽게 대화하고 사용자가 말할때 까지 기다려`
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






    // if (userChatDb && userChatDb?.length > 0) {
    //   // 강아지 이름이 있고, AI 데이터가 있을 경우 기존 데이터를 바탕으로 대화를 이어감
    //   console.log(`기존 대화로 시작`);
    //   const response = await openai.chat.completions.create({
    //     model: "gpt-4o-mini",
    //     messages: [
    //       {
    //         role: "assistant",
    //         content: `성별은 ${dogDb?.[0]?.gender}, 이름은 ${dogDb?.[0]?.name} 성격은 ${dogDb?.[0]?.personality} 좋아하는 것 ${dogDb?.[0]?.like} 싫어하는 것 ${dogDb?.[0]?.hate} 하는 행동은 ${dogDb?.[0]?.active}인 강아지로 대화하면서
    //          ${aiChatDb} 기존 데이터 기반으로 사용자와 대화해`,
    //       },
    //       {
    //         role: "user",
    //         content: userContent || "대화 기록이 없습니다.",
    //       },
    //     ],
    //     response_format: { type: "text" },
    //     temperature: 1,
    //     max_completion_tokens: 2048,
    //     top_p: 1,
    //     frequency_penalty: 0,
    //     presence_penalty: 0,
    //     store: true,
    //   });
  
    //   return NextResponse.json({ aianswer: response.choices[0].message.content });
    // } else {
    //   // 강아지 이름이 있고, AI 데이터가 없을 경우 새로운 대화를 시작
    //   const response = await openai.chat.completions.create({
    //     model: "gpt-4o-mini",
    //     messages: [
    //       {
    //         role: "assistant",
    //         content: `성별은 ${dogDb?.[0]?.gender}, 이름은 ${dogDb?.[0]?.name} 성격은 ${dogDb?.[0]?.personality} 좋아하는 것 ${dogDb?.[0]?.like} 싫어하는 것 ${dogDb?.[0]?.hate} 하는 행동은 ${dogDb?.[0]?.active}인 강아지로 대화해 사용자가 먼저 대화를 하면 대답해.`,
    //       },
    //     ],
    //     response_format: { type: "text" },
    //     temperature: 1,
    //     max_completion_tokens: 2048,
    //     top_p: 1,
    //     frequency_penalty: 0,
    //     presence_penalty: 0,
    //     store: true,
    //   });
      
    //   return NextResponse.json({ aianswer: response.choices[0].message.content });
    // }
    
    // return NextResponse.json({ aianswer: response.choices[0].message.content });
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