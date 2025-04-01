'use client'

import { useEffect, useState } from "react";
import { customAlphabet } from "nanoid";
import { DataType, dogDataType } from "../../../../lib/type";
import { useStore } from "zustand";
import { dogNumIdStore, userUidStore } from "@/app/store/store";
import { dataInsert, dataSelectAi, dataSelectAll, } from "../../../../lib/db";
import { useRouter } from "next/navigation";
import { userContentData } from "@/app/actions/actions";

interface AiType {
  aianswer: string | null;
}
// export default function AiChatePage({ userChat, dogId ,dogDb}: { userChat: DataType[]; dogId:number; dogDb:dogDataType[]}) {
export default function AiChatePage() {
  const nanoid = customAlphabet("123456789", 8);
  const nid = Number(nanoid());
  const dogNumid = useStore(dogNumIdStore, (state) => state.dogNumid);
  const useri = useStore(userUidStore, (state) => state.uid);

  const [useriChate, setUseriChate] = useState<string>('');
  const [aiChat, setaiChat] = useState<string>('');
  const [content, setContent] =  useState(false);
  const [allData, setAllData] =  useState<DataType[]>([]);

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
      content: useriChate,
    };
  
    try {
      await dataInsert(datas); 
  
      const response = await fetch('/api/openpostai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // JSON 형식으로 전송
        },
        body: JSON.stringify({dataid: dogNumid, role : 'user', userContent: useriChate }), // 전송할 데이터
      });
  
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
  
    setUseriChate(''); 
  
  }
  
  useEffect(()=>{
    if (dogNumid) {
      // 데이터가 있으면, 서버로 POST 요청
      fetch('/api/openpostai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // JSON 형식으로 전송
        },
        body: JSON.stringify({ dataid: dogNumid, role : 'aidog' ,userContent: ''}),  // 전송할 데이터
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
  },[])    
         
  useEffect(() => {
    if (aiChat) { 
      const talckChat = async () => {
        const datas = {
          id: nid,
          uuid: useri,
          dogid: dogNumid,
          role: 'aidog',
          content: aiChat, 
        };
        await dataInsert(datas);
        setContent(true); 
      };
      talckChat();
    }

    const handleData = async ()=>{
      const data = await dataSelectAll(dogNumid);
      if(data){
        setAllData(data);
      }
    }
    handleData();
    
  }, [aiChat, content]);

  useEffect(()=>{
    
  },[])
  
  return (<div>
    {/* <div style={{color:'lime'}}>{aiChat}</div> */}
    <br />
    <br />
    <ul>
      {allData.map((item, idx) => (<li key={idx}>{item.content}</li>))}
    </ul>
    <form onSubmit={handleSubmit} style={{ border: '2px solid red' }}>
      <input type="text" onChange={handleChange} placeholder="내용을 입력 해주세요" />

      <button type="submit">보내기</button>
    </form>
  </div>);
}