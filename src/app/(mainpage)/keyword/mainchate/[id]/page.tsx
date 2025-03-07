import AiChatePage from "@/app/componets/chat/aichate";
import UserChatPage from "@/app/componets/chat/userchat";
import Link from "next/link";
import OpenAI from "openai";
import { dataSelect, dogDatas } from "../../../../../../lib/db";
import { cookies } from "next/headers";
export default async function ChatePage() {
  
  
  const userChat = await dataSelect();


  const cookieStore =await cookies();
  const dogId = Number(cookieStore.get("dogId")?.value);
  const dogDb = await dogDatas(dogId);
 
  console.log(dogDb?.[0]?.gender);

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",

   
    messages: [
      { role: "system", content: `성별은 ${dogDb?.[0]?.gender}, 이름은 ${dogDb?.[0]?.name} 성격은 ${dogDb?.[0]?.personality} 좋아하는 것 ${dogDb?.[0]?.like} 싫어하는 것 ${dogDb?.[0]?.hate} 하는 행동은 ${dogDb?.[0]?.active}인 강아지로 대화 해` },
      {
        role: "user",
        content: "안녕. 도구야",
      },
    ],
    store: true,
  });
  
 
  const aiData = { aianswer: completion.choices[0].message.content };
  // console.log(aiData);
  
  return (
    <div
      className=""
      style={{ width: "400px", margin: "auto", height: "600px" }}
    >
      <div style={{ background: 'skyblue', height: '100%', position: 'relative' }}>
        <div >
          <AiChatePage ai={aiData}/>
        </div>
          <UserChatPage dogDb = {dogDb}/>
        
      </div>
      
    </div>
  );
}
