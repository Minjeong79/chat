'use client'

import { useEffect, useState } from "react";
import { customAlphabet } from "nanoid";
import { DataType, dogDataType } from "../../../../lib/type";
import { useStore } from "zustand";
import { dogNumIdStore, userUidStore } from "@/app/store/store";
import { dataInsert, dataSelectAll, dogDatas, } from "../../../../lib/db";
import { useParams } from 'next/navigation';

export default function AiChatePage() {
  const nanoid = customAlphabet("123456789", 8);
  const nid = Number(nanoid());
  const storeDogId  = useStore(dogNumIdStore, (state) => state.dogNumid);
  const useri = useStore(userUidStore, (state) => state.uid);
  const params = useParams();
  const dogNumid = storeDogId && storeDogId !== 0 ? storeDogId : Number(params.id);

  const [useriChate, setUseriChate] = useState<string>('');
  const [aiChat, setaiChat] = useState<string>('');
  const [content, setContent] = useState(false);
  const [allData, setAllData] = useState<DataType[]>([]);
  const [dogName, setDogName] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      content: useriChate,
      name:'보호자',
    };

    try {
      await dataInsert(datas);

      const response = await fetch('/api/openpostai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // JSON 형식으로 전송
        },
        body: JSON.stringify({ dataid: dogNumid, role: 'user', userContent: useriChate }), // 전송할 데이터
      });
      setUseriChate('');
      if (!response.ok) {
        throw new Error('서버 응답 실패');
      }

      const data = await response.json();
      setaiChat(data.aianswer);
      setContent(true);
      console.log('서버 응답:', data);
    } catch (error) {
      console.error('서버 요청 오류:', error);
    }
  }
  

  useEffect(() => {
    if (dogNumid) {
      // 데이터가 있으면, 서버로 POST 요청
      fetch('/api/openpostai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // JSON 형식으로 전송
        },
        body: JSON.stringify({ dataid: dogNumid, role: 'aidog', userContent: '' }),  // 전송할 데이터
      })
        .then(response => response.json())
        .then(data => {
          setaiChat(data.aianswer);
          setContent(true)
          console.log('서버 응답:', data);  // 서버의 응답 처리
        })
        .catch(error => {
          console.log('서버 요청 오류:', error);  // 에러 처리
        });
    }
  
  }, [])

  useEffect(() => {
    console.log(dogNumid);
    const handleDogKeyword = async ()=>{
      const data = await dogDatas(dogNumid);
      
      if (data && data.length > 0 && data[0]?.name) {
        setDogName(data[0].name);
      } else {
        console.warn("🐶 dogDatas 결과가 비었거나 형식이 안 맞음", data);
      }
    }
    handleDogKeyword();
    if (aiChat && dogName) {
      const talckChat = async () => {
        const datas = {
          id: nid,
          uuid: useri,
          dogid: dogNumid,
          role: 'aidog',
          content: aiChat,
          name : dogName
        };
        console.log(datas);
        await dataInsert(datas);
        setContent(true);
      };
      talckChat();
    }

    const handleData = async () => {
      const data = await dataSelectAll(dogNumid);
      if (data) {
        setAllData(data);
      }
    }
    handleData();

  }, [aiChat, dogName]);
  console.log(allData);

  return (
    <section className="h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 ">
        <ul>
          {allData.map((item, idx) => (
            <li key={idx} className={`flex ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={item.role === 'user' ? 'speech_box_user' : 'speech_box_ai'}>{item.content}</div></li>))}
        </ul>
      </div>
      <form onSubmit={handleSubmit} className="relative">
        <div className="w-full bg-secondary border-t border-slate-500 p-2" >
          <textarea className="h-20 w-full bg-inherit border-0" value={useriChate} onChange={handleChange} placeholder="내용을 입력 해주세요" />
          <div className="w-full flex justify-end ">
            <button type="submit" className="rounded-lg bg-blue-600 p-2">보내기</button>
          </div>
        </div>

      </form>
    </section>);
}