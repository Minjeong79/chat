'use client'

import { useEffect, useState } from "react";
import { customAlphabet } from "nanoid";
import { DataType } from "../../../../lib/type";
import UserChatPage from "./userchat";
import { useStore } from "zustand";
import { userUidStore } from "@/app/store/store";
import { dataInsert } from "../../../../lib/db";

interface AiType {
    aianswer: string | null;
}
export default function AiChatePage({ ai, userChat }: { ai: AiType; userChat: DataType[]; }) {
    const nanoid = customAlphabet("123456789", 8);
    const nid = Number(nanoid());
    const storedData = sessionStorage.getItem('dogid');
    const useri = useStore(userUidStore, (state) => state.uid);
    const [aian, setAian] = useState<AiType>(ai);

    console.log(userChat);

    useEffect(() => {
        const talckChat = async () => {
            const datas = {
                id: nid,
                uuid: useri,
                dogid: storedData,
                role: 'aidog',
                content: aian.aianswer ,
            }
            dataInsert(datas)
        }
        talckChat();

    }, [aian.aianswer]);

    return (<div>{aian.aianswer}<br />
        <UserChatPage />
    </div>);
}