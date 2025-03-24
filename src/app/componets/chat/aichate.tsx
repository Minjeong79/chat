'use client'

import { useEffect, useState } from "react";
import { customAlphabet } from "nanoid";
import { DataType, dogDataType } from "../../../../lib/type";
import { useStore } from "zustand";
import { dogNumIdStore, userUidStore } from "@/app/store/store";
import { dataInsert, dataSelect } from "../../../../lib/db";
import { useRouter } from "next/navigation";
import { userContentData } from "@/app/actions/actions";

interface AiType {
  aianswer: string | null;
}
// export default function AiChatePage({ userChat, dogId ,dogDb}: { userChat: DataType[]; dogId:number; dogDb:dogDataType[]}) {
export default function AiChatePage() {
  const nanoid = customAlphabet("123456789", 8);
  const nid = Number(nanoid());
  // const [storeDogId, setStoreDogId] = useState<string | null>("");
  // const numid = Number(storeDogId);
  const dogNumid = useStore(dogNumIdStore, (state) => state.dogNumid);
  const useri = useStore(userUidStore, (state) => state.uid);

  const router = useRouter();
  // const [aian, setAian] = useState<AiType>(ai);
  const [useriChate, setUseriChate] = useState<string>('');
  const [userChat, setUserChat] = useState<string>('');
  const [content, setContent] =  useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newContent = e.target.value;

    setUseriChate(newContent);

  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const datas = {
      id: nid,
      uuid: useri,
      dogid: dogNumid,
      role: 'user',
      //   content:aiData.aianswer!, 
      content: useriChate,
    }
    
    dataInsert(datas);
    // router.refresh();
  }

  // useEffect(() => {

  //   // const storedData = sessionStorage.getItem('dogid');
  //   // setStoreDogId(dogNumid);
  //   // 로컬 스토리지에서 데이터 가져오기
  //   if (dogNumid) {
  //     // 데이터가 있으면, 서버로 POST 요청
  //     fetch('/api/postdogid', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',  // JSON 형식으로 전송
  //       },
  //       body: JSON.stringify({ dataid: dogNumid }),  // 전송할 데이터
  //     })
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log('서버 응답:', data);  // 서버의 응답 처리
  //         // router.refresh();
  //       })
  //       .catch(error => {
  //         console.log('서버 요청 오류:', error);  // 에러 처리
  //       });
  //   }
  
   
  // }, []);
  useEffect(()=>{
       if (dogNumid) {
      // 데이터가 있으면, 서버로 POST 요청
      fetch('/api/openpostai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // JSON 형식으로 전송
        },
        body: JSON.stringify({ dataid: dogNumid }),  // 전송할 데이터
      })
        .then(response => response.json())
        .then(data => {
          setUserChat(data.aianswer);
          setContent(true)
          console.log('서버 응답:', data);  // 서버의 응답 처리
        })
        .catch(error => {
          console.log('서버 요청 오류:', error);  // 에러 처리
        });
    }

    //   const talckChat = async () => {
    //     const datas = {
    //       id: nid,
    //       uuid: useri,
    //       dogid: dogNumid,
    //       role: 'aidog',
    //       content: aian.aianswer, // AI의 답변을 content에 저장
    //     };
    //     await dataInsert(datas); 
    // };
    // talckChat();
  },[content])

  // useEffect(() => {
  //   const getChatData = async () => {
  //     const res = await fetch(`/api/openpostai`);
  //     const data = await res.json();
  //     return data;
  //   };
  //   getChatData();
  //   console.log(`${getChatData} 여긴 클라이언트`);
   


  //   const talckChat = async () => {
  //     if (aian.aianswer) {
  //       const datas = {
  //         id: nid,
  //         uuid: useri,
  //         dogid: dogNumid,
  //         role: 'aidog',
  //         content: aian.aianswer, // AI의 답변을 content에 저장
  //       };
  //       await dataInsert(datas); // 데이터 삽입
  //     }
  //   };
  //   talckChat();
   
  //   console.log("AI 답변 업데이트:", aian.aianswer);
   
  // }, [aian.aianswer, useriChate]);
  
  return (<div>
    <div style={{color:'lime'}}>{userChat}</div>
    <br />
    <br />
    {/* <ul>
      {userChat.map((item, idx) => (<li key={idx}>{item.content}</li>))}
    </ul> */}
    <form onSubmit={handleSubmit} style={{ border: '2px solid red' }}>
      <input type="text" onChange={handleChange} placeholder="내용을 입력 해주세요" />

      <button type="submit">보내기</button>
    </form>
  </div>);
}