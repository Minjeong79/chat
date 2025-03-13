import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { dataSelect, dogDatas } from "../../../../lib/db";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(req: NextRequest) {
    try {

     
        const dogid = req.cookies.get("dogid");
        console.log(`${dogid}0-0-0-0-0-0-0-0-`);

        if (!dogid) {
            return NextResponse.json(
              { message: "dogid가 쿠키에 없습니다." },
              { status: 400 }
            );
          }
      
          // dogid가 존재하면 응답으로 반환
        //   return NextResponse.json(
        //     { message: "dogid를 가져왔습니다.", dogId: dogid },
        //     { status: 200 }
        //   );
        // const dogDb = await dogDatas(dogId);
        // const userChat = await dataSelect(dogId);

        // const completion = await openai.chat.completions.create({
        //     model: "gpt-4o-mini",
        //     messages: [
        //       { role: "system", content: `성별은 ${dogDb?.[0]?.gender}, 이름은 ${dogDb?.[0]?.name} 성격은 ${dogDb?.[0]?.personality} 좋아하는 것 ${dogDb?.[0]?.like} 싫어하는 것 ${dogDb?.[0]?.hate} 하는 행동은 ${dogDb?.[0]?.active}인 강아지야 이름을 말 하면서 대화 해` },
        //       {
        //         role: "user",
        //         content: `${userChat?.slice(-1)[0]?.content}`,
        //       },
        //     ],
        //     store: true,
        //   });
        return NextResponse.json(dogid);
    } catch (error) {
        console.error("Error calling OpenAI API:", error);
        return NextResponse.json({ error: "api key error" }, { status: 500 });
    }
}