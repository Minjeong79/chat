import AiChatePage from "@/app/componets/chat/aichate";
import Link from "next/link";
import OpenAI from "openai";
import { dataSelect, dogDatas } from "../../../../../../lib/db";
import { cookies } from "next/headers";
import { userContentData } from "@/app/actions/actions";
import { DataType } from "../../../../../../lib/type";

export default async function ChatePage() {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  return (
    <div
      className=""
      style={{ width: "400px", margin: "auto", height: "600px" }}
    >
      <div style={{ background: 'skyblue', height: '100%', position: 'relative' }}>
        <div >
          <AiChatePage />

        </div>


      </div>

    </div>
  );
}
