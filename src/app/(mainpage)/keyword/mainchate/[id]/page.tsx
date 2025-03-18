import AiChatePage from "@/app/componets/chat/aichate";
import Link from "next/link";
import OpenAI from "openai";
import { dataSelect, dogDatas } from "../../../../../../lib/db";
import { cookies } from "next/headers";
import { userContentData } from "@/app/actions/actions";
import { DataType } from "../../../../../../lib/type";


const getDogId = async () => {
  const res = await fetch(`http://localhost:3000/api/postdogid?`);
  const data = await res.json();
  return data;
};

export default async function ChatePage() {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const dogId = await getDogId();
  console.log(dogId.dataid);
  if (!dogId || !dogId.dataid) {
    // dogId가 없을 때도 AiChatePage를 렌더링할 수 있도록 기본 값 설정
    const aiData = { aianswer: "로딩중..." };
    const userChat:DataType[] = [];

    return (
      <div
        className=""
        style={{ width: "400px", margin: "auto", height: "600px" }}
      >
        <div style={{ background: 'skyblue', height: '100%', position: 'relative' }}>
          <AiChatePage ai={aiData} userChat={userChat ?? []} />
        </div>
      </div>
    );
  }
  const dogDb = await dogDatas(dogId.dataid);
  const userChat = await dataSelect(dogId.dataid);

  console.log(userChat);
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `${userChat?.slice(-1)[0]?.content}`,
      },
      { role: "assistant", content: `성별은 ${dogDb?.[0]?.gender}, 이름은 ${dogDb?.[0]?.name} 성격은 ${dogDb?.[0]?.personality} 좋아하는 것 ${dogDb?.[0]?.like} 싫어하는 것 ${dogDb?.[0]?.hate} 하는 행동은 ${dogDb?.[0]?.active}인 강아지로 대화해 사용자가 먼저 대화를 하면 대답해` },
      
    ],
    store: true,
  });

  const aiData = { aianswer: completion.choices[0].message.content };


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
