import AiChatePage from "@/app/componets/chat/aichate";
import UserChatPage from "@/app/componets/chat/userchat";
import Link from "next/link";
import OpenAI from "openai";
import { dataSelect, dogDatas } from "../../../../../../lib/db";
import { cookies } from "next/headers";
import { userContentData } from "@/app/actions/actions";
export default async function ChatePage() {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
 
  const getDogId = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/getdogid", {
        method: "GET",
      });
      
      // 응답이 정상적이면 JSON 형식으로 파싱
      if (response.ok) {
        const data = await response.json();
        console.log(data.value);  // 콘솔에 데이터를 출력
      } else {
        console.error("Error fetching dog data:", response.statusText);
      }
    } catch (error) {
      console.error("Error in fetch:", error);
    }
  };
  
  getDogId();

  const dogId = 18217225;
  const dogDb = await dogDatas(dogId);
  const userChat = await dataSelect(dogId);

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
 
  const aiData = { aianswer: completion.choices[0].message.content };
 

  return (
    <div
      className=""
      style={{ width: "400px", margin: "auto", height: "600px" }}
    >
      <div style={{ background: 'skyblue', height: '100%', position: 'relative' }}>
        <div >
          <AiChatePage ai={aiData} userChat={userChat ?? []} />
          {/* <AiChatePage  /> */}

        </div>
       

      </div>

    </div>
  );
}
