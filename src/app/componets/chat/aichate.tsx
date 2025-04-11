'use client'

import { useEffect, useState, useRef } from "react";
import { customAlphabet } from "nanoid";
import { DataType } from "../../../../lib/type";
import { useStore } from "zustand";
import { dogNumIdStore, numidStore, userUidStore } from "@/app/store/store";
import { dataInsert, dataSelectAll, dogDatas, } from "../../../../lib/db";
import { useParams } from 'next/navigation';
import Image from "next/image";
import Loading from "../skeleton/loding";

export default function AiChatePage() {
  const nanoid = customAlphabet("123456789", 8);
  const nid = Number(nanoid());
  const storeDogId = useStore(dogNumIdStore, (state) => state.dogNumid);//상태 id
  const useri = useStore(userUidStore, (state) => state.uid);
  const setNumid = useStore(numidStore, (state) => state.setNumid);
  const numId = useStore(numidStore, (state) => state.numId);
  const params = useParams();
  const pid = Number(params.id);
  // const dogNumid = storeDogId && storeDogId !== 0 ? storeDogId : Number(params.id);

  const [useriChate, setUseriChate] = useState<string>('');
  const [aiChat, setaiChat] = useState<string>('');
  const [content, setContent] = useState(false);
  const [allData, setAllData] = useState<DataType[]>([]);
  const [allpidData, setAllpidData] = useState<DataType[]>([]);
  const [dogName, setDogName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setUseriChate(newContent);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const datas = {
      id: nid,
      uuid: useri,
      dogid: pid,
      role: 'user',
      content: useriChate,
      name: '보호자',
    };

    try {
      await dataInsert(datas);

      const response = await fetch('/api/openpostai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // JSON 형식으로 전송
        },
        body: JSON.stringify({ dataid: pid, role: 'user', userContent: useriChate }), // 전송할 데이터
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
    if (pid) {
      // 데이터가 있으면, 서버로 POST 요청
      fetch('/api/openpostai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // JSON 형식으로 전송
        },
        body: JSON.stringify({ dataid: pid, role: 'aidog', userContent: '' }),  // 전송할 데이터
      })
        .then(response => response.json())
        .then(data => {
          setaiChat(data.aianswer);
          setNumid(nid);
          console.log('서버 응답:', data);  // 서버의 응답 처리
        })
        .catch(error => {
          console.log('서버 요청 오류:', error);  // 에러 처리
        });
    }


  }, [])

  useEffect(() => {
    const handleDogKeyword = async () => {
      const data = await dogDatas(pid);

      if (data && data.length > 0 && data[0]?.name) {
        setDogName(data[0].name);
      } else {
        console.warn("🐶 dogDatas 결과가 비었거나 형식이 안 맞음", data);
      }

    }
    handleDogKeyword();
    const insertAiChat = async () => {
      if (aiChat && dogName) {
        const datas = {
          id: nid,
          uuid: useri,
          dogid: pid,
          role: 'aidog',
          content: aiChat,
          name: dogName
        };

        try {
          await dataInsert(datas);
          setContent(true);
        } catch (error) {
          console.error("❌ 데이터 저장 실패:", error);
        }
      }
    };
    insertAiChat();

    const handleData = async () => {
      const data = await dataSelectAll(pid);
      if (data) {
        if (pid === storeDogId) {
          setAllData(data);
        } else {
          setAllpidData(data);
        }
      }
      setIsLoading(false);
    }

    handleData();
  }, [aiChat]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [allData, allpidData]);
  return (
    <section className="h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 " >
        {isLoading ? <Loading /> :
          <div>
            {pid === storeDogId ? <ul>
              {allData.map((item, idx) => (
                <li key={idx} className={`flex ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={item.role === 'user' ? 'speech_box_user' : 'speech_box_ai'}>{item.content}</div></li>))}
              <div ref={bottomRef} />
            </ul> : <ul>
              {allpidData.map((item, idx) => (
                <li key={idx} className={`flex ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={item.role === 'user' ? 'speech_box_user' : 'speech_box_ai'}>{item.content}</div></li>))}
              <div ref={bottomRef} />
            </ul>}
          </div>}
      </div>
      <form onSubmit={handleSubmit} className="relative">
        <div className="w-full bg-secondary border-t border-slate-500 p-2 " >
          <textarea className="h-20 w-full bg-inherit border-0" value={useriChate} onChange={handleChange} placeholder="내용을 입력 해주세요" />
          <div className="w-full flex justify-end ">
            <button type="submit" className="rounded-lg bg-blue-600 p-2">보내기</button>
          </div>
        </div>

      </form>


    </section>);
}