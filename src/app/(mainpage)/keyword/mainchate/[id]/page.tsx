import AiChatePage from "@/app/componets/chat/aichate";
import UserChatPage from "@/app/componets/chat/userchat";
import Link from "next/link";
import OpenAI from "openai";
import { dataSelect, dogDatas } from "../../../../../../lib/db";
import { cookies } from "next/headers";
import { userContentData } from "@/app/actions/actions";
export default async function ChatePage() {
  
 
  const dogId = 12146525;
 

 
  // const aiData = { aianswer: completion.choices[0].message.content };
 

  return (
    <div
      className=""
      style={{ width: "400px", margin: "auto", height: "600px" }}
    >
      <div style={{ background: 'skyblue', height: '100%', position: 'relative' }}>
        <div >
          {/* <AiChatePage ai={aiData} userChat={userChat ?? []} /> */}
          <AiChatePage  />

        </div>
       

      </div>

    </div>
  );
}
