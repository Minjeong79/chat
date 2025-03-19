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


// const getUserData = async () => {
//   const res = await fetch(`http://localhost:3000/api/userpost?`);
//   const data = await res.json();
//   return data;
// };

export default async function ChatePage() {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  const dogId = await getDogId();
  // const userData = await getUserData();
  // console.log(`${userData.userContent} 여기 값이다!!!!!!!!!!!!!!!!!!`);
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

  // const completion = await openai.chat.completions.create({
  //   model: "gpt-4o-mini",
  //   messages: [
  //     { role: "assistant", content: `성별은 ${dogDb?.[0]?.gender}, 이름은 ${dogDb?.[0]?.name} 성격은 ${dogDb?.[0]?.personality} 좋아하는 것 ${dogDb?.[0]?.like} 싫어하는 것 ${dogDb?.[0]?.hate} 하는 행동은 ${dogDb?.[0]?.active}인 강아지로 대화해 사용자가 먼저 대화를 하면 대답해` },
  //     {
  //       role: "user",
  //       content: `${userChat?.slice(-1)[0]?.content}`,
  //     }, 
  //   ],
  //   store: true,
  // });
  
  
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
     messages: [
      { role: "assistant", content: `성별은 ${dogDb?.[0]?.gender}, 이름은 ${dogDb?.[0]?.name} 성격은 ${dogDb?.[0]?.personality} 좋아하는 것 ${dogDb?.[0]?.like} 싫어하는 것 ${dogDb?.[0]?.hate} 하는 행동은 ${dogDb?.[0]?.active}인 강아지로 대화해 사용자가 먼저 대화를 하면 대답해` },
      {
        role: "user",
        content: `${userChat?.slice(-1)[0]?.content}`,
      }, 
    ],
    response_format: {
      "type": "text"
    },
    temperature: 1,
    max_completion_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    store: true
  });



  const aiData = { aianswer: response.choices[0].message.content };


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
