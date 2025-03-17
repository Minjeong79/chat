'use client'

import { useEffect, useState } from "react";
import { customAlphabet } from "nanoid";
import { DataType } from "../../../../lib/type";
import UserChatPage from "./userchat";
import { useStore } from "zustand";
import { userUidStore } from "@/app/store/store";
import { dataInsert } from "../../../../lib/db";
import { useRouter } from "next/navigation";

interface AiType {
    aianswer: string | null;
}
export default function AiChatePage({ ai, userChat }: { ai: AiType; userChat: DataType[]; }) {
    const nanoid = customAlphabet("123456789", 8);
    const nid = Number(nanoid());
    const [storeDogId, setStoreDogId] =  useState<string | null>("");
    const useri = useStore(userUidStore, (state) => state.uid);
    
    const router = useRouter();
    const [aian, setAian] = useState<AiType>(ai);

    useEffect(() => {
        const storedData = sessionStorage.getItem('dogid');
        setStoreDogId(storedData);
        // 로컬 스토리지에서 데이터 가져오기
        if (storedData) {
          // 데이터가 있으면, 서버로 POST 요청
          fetch('/api/postdogid', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',  // JSON 형식으로 전송
            },
            body: JSON.stringify({ dataid: storedData }),  // 전송할 데이터
          })
            .then(response => response.json())
            .then(data => {
              console.log('서버 응답:', data);  // 서버의 응답 처리
              router.refresh();  
            })
            .catch(error => {
              console.log('서버 요청 오류:', error);  // 에러 처리
            });
        }

        const talckChat = async () => {
          const datas = {
              id: nid,
              uuid: useri,
              dogid: storeDogId,
              role: 'aidog',
              content: aian.aianswer ,
          }
          dataInsert(datas)
      }
      talckChat();
      }, [aian.aianswer ]);

      useEffect(() => {
        

    }, []);

    return (<div>
        {aian.aianswer}<br />
        <UserChatPage />
    </div>);
}