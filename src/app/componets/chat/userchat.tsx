'use client'

import { dogNumIdStore, userUidStore, useUserChatStore } from "@/app/store/store";
import { useEffect, useState } from "react"
import { dataInsert } from "../../../../lib/db";
import { customAlphabet } from "nanoid";
import { dogDataType, UserType } from "../../../../lib/type";
import { supabase } from "../../../../utils/supabase/createClinet";
import { useStore } from "zustand";
import { userContentData } from "@/app/actions/actions";


export default function UserChatPage() {
  const nanoid = customAlphabet("123456789", 8);
  const nid = Number(nanoid());
  const dogNumid = useStore(dogNumIdStore, (state) => state.dogNumid);
  const storedData = sessionStorage.getItem('dogid');
  const useri = useStore(userUidStore, (state) => state.uid);


  const [userChate, setChate] = useState<string>('');
  // const { content, setContent } = useUserChatStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newContent = e.target.value;

    setChate(newContent);
    // setContent(newContent);
  }
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const datas = {
      id: nid,
      uuid: useri,
      dogid: storedData,
      role: 'user',
      //   content:aiData.aianswer!, 
      content: userChate,
    }
    // console.log(datas);
    // const formData = new FormData();
    // formData.append("message", userChate); 
    // await userContentData(formData); 
    dataInsert(datas);

  }

  useEffect(() => {
    // 로컬 스토리지에서 데이터 가져오기
   
    console.log(`${storedData} userpage!!!!!!!!!!!!`)
    if (storedData) {
      // 데이터가 있으면, 서버로 POST 요청
      fetch('/api/storeData', {
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

  

  return (
    <>
      <form onSubmit={handleSubmit} style={{ border: '2px solid lime' }}>
        <input type="text" onChange={handleChange} placeholder="내용을 입력 해주세요" style={{ border: '1px solid red' }} />

        <button type="submit">보내기</button>
      </form>
    </>
  )
}