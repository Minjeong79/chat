import AiChatePage from "@/app/componets/chat/aichate";
import UserChatPage from "@/app/componets/chat/userchat";
import Link from "next/link";
import OpenAI from "openai";
import { dataSelect, dogDatas } from "../../../../../../lib/db";
import { cookies } from "next/headers";
export default async function ChatePage() {

  const cookieStore = await cookies();
  const dogIdValue = cookieStore.get("dogid")?.value;
  const dogId = dogIdValue ? Number(dogIdValue) : null;

  if (dogId === null || isNaN(dogId)) {
    console.warn("dogId가 설정되지 않았습니다. 기본값으로 UserChatPage 렌더링합니다.");
    return;
  }
  const dogDb = await dogDatas(dogId);
  const userChat = await dataSelect(dogId);

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: `성별은 ${dogDb?.[0]?.gender}, 이름은 ${dogDb?.[0]?.name} 성격은 ${dogDb?.[0]?.personality} 좋아하는 것 ${dogDb?.[0]?.like} 싫어하는 것 ${dogDb?.[0]?.hate} 하는 행동은 ${dogDb?.[0]?.active}인 강아지야 이름을 말 하면서 대화 해` },
      {
        role: "user",
        content: `${userChat?.slice(-1)[0]?.content}`,
      },
    ],
    store: true,
  });
 
  // console.log(userChat?.content)
  // console.log(user)
  const aiData = { aianswer: completion.choices[0].message.content };
  // console.log(aiData);
  if (!dogDb) {
    return <div>Loading...</div>; // 데이터가 없다면 로딩 화면 표시
  }
  return (
    <div
      className=""
      style={{ width: "400px", margin: "auto", height: "600px" }}
    >
      <div style={{ background: 'skyblue', height: '100%', position: 'relative' }}>
        <div >
          <AiChatePage ai={aiData} userChat={userChat ?? []} />

        </div>
       

      </div>

    </div>
  );
}
