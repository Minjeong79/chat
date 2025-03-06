'use client'

import { dogNumIdStore, userUidStore, useUserChatStore } from "@/app/store/store";
import { useEffect, useState } from "react"
import { dataInsert } from "../../../../lib/db";
import { customAlphabet } from "nanoid";
import { dogDataType, UserType } from "../../../../lib/type";
import { supabase } from "../../../../utils/supabase/createClinet";
import { useStore } from "zustand";


export default function UserChatPage({ dogDb }: { dogDb: dogDataType[] | null }) {
  const nanoid = customAlphabet("123456789", 8);
  const nid = Number(nanoid());
  const dogNumid = useStore(dogNumIdStore, (state) => state.dogNumid);
  const useri = useStore(userUidStore, (state) => state.uid);


  const [userChate, setChate] = useState<string>('');
  // const { content, setContent } = useUserChatStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newContent = e.target.value;

    setChate(newContent);
    // setContent(newContent);
  }

  if (!dogDb) {
    console.error("dogDb가 null입니다. 데이터를 불러오는지 확인하세요.");
    return;
  }

  const foundDog = dogDb.find(item => item.id === dogNumid);
  if (!foundDog) {
    console.error("해당 dogNumid와 일치하는 데이터가 없습니다.");
    return;
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const datas = {
      id: nid,
      uuid: useri,
      dogid: dogNumid,
      role: 'user',
      //   content:aiData.aianswer!, 
      content: userChate,
      //   created_at: date.toISOString() 
    }
    // console.log(datas);
    dataInsert(datas);

  }

  useEffect(() => {
    // 로컬 스토리지에서 데이터 가져오기
    const storedData = sessionStorage.getItem('dogid');

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