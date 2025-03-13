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
// export default function AiChatePage({ ai, userChat }: { ai: AiType; userChat: DataType[]; }) {
export default function AiChatePage() {
    const nanoid = customAlphabet("123456789", 8);
    const nid = Number(nanoid());
    const storedData = sessionStorage.getItem('dogid');
    const useri = useStore(userUidStore, (state) => state.uid);
    // const [aian, setAian] = useState<AiType>(ai);

    // useEffect(() => {
    //     const talckChat = async () => {
    //         const datas = {
    //             id: nid,
    //             uuid: useri,
    //             dogid: storedData,
    //             role: 'aidog',
    //             content: aian.aianswer ,
    //         }
    //         dataInsert(datas)
    //     }
    //     talckChat();

    // }, [aian.aianswer]);

    // window.location.reload();
    useEffect(()=>{
       
        const getDogId = async () => {
            const response = await fetch("/api/getdogid", {
              method: "GET",
              cache: "no-store",  // 최신 데이터 가져오기
            });
          
            const data = await response.json();
            console.log("서버에서 받은 데이터:", JSON.stringify(data, null, 2));  // 서버에서 반환한 dogid 값
            console.log(data.value);
        };
          
          // 사용 예시
          getDogId();
    },[storedData])

    return (<div>
        {/* {aian.aianswer}<br /> */}
        <UserChatPage />
    </div>);
}