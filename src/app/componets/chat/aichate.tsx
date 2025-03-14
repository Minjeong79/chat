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
    // useEffect(()=>{
       
    //     const getDogId = async () => {
    //         const response = await fetch("/api/getdogid", {
    //           method: "GET",
    //           cache: "no-store",  // 최신 데이터 가져오기
    //         });
          
    //         const data = await response.json();
    //         console.log("서버에서 받은 데이터:", JSON.stringify(data, null, 2));  // 서버에서 반환한 dogid 값
    //         console.log(data.value);
    //     };
          
    //       // 사용 예시
    //       getDogId();
    // },[storedData])

    useEffect(() => {
        const storedData = sessionStorage.getItem('dogid');
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
            })
            .catch(error => {
              console.log('서버 요청 오류:', error);  // 에러 처리
            });
        }
      }, []);
    return (<div>
        {/* {aian.aianswer}<br /> */}
        <UserChatPage />
    </div>);
}