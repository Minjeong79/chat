import AiChatePage from "@/app/componets/chat/aichate";
import UserChatPage from "@/app/componets/chat/userchat";
import Link from "next/link";
import OpenAI from "openai";

export default async function ChatePage() {
  
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",

    messages: [
      { role: "system", content: "성별은 암컷, 이름은 뚜뚜 좋아하는건 간식, 산책, 싫어 하는건 낯선 사람 죽어서 강아지 천사가 된 강아지로 대화 해" },
      {
        role: "user",
        content: "안녕. 뚜뚜야 보고 싶었어",
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
          <UserChatPage/>
        
      </div>
      
    </div>
  );
}
