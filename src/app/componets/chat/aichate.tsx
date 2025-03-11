'use client'

import { useEffect, useState } from "react";
import OpenAI from "openai";
import { DataType } from "../../../../lib/type";
import UserChatPage from "./userchat";

interface AiType {
    aianswer: string | null;
}
export default function AiChatePage({ ai, userChat }: { ai: AiType; userChat: DataType[]; }) {
    const [aian, setAian] = useState<AiType>(ai);

    console.log(userChat);

    useEffect(() => {
        const talckChat = async () => {

        }


    }, [])
    return (<div>{aian.aianswer}<br />
     <UserChatPage />
        </div>);
}