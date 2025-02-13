'use client'


import { useUserChat } from "@/app/store/store";
import { useState } from "react"
import { dataInsert } from "../../../../lib/db";

interface UchatType {
    content: string;
}
export default function UserChatPage() {
    const [userChate, setChate] = useState<string>('');
    const { content, setContent } = useUserChat();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newContent = e.target.value;

        setChate(newContent);
        setContent(newContent);
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const date = new Date();
        const formattedDate = date.toLocaleDateString('en-CA');
        
        const datas = {
          id: 'ai', 
          userid: 'test', 
          dogid: 'testdog', 
          role:'ai', 
        //   content:aiData.aianswer!, 
          content:userChate, 
        //   created_at: date.toISOString() 
        }
        console.log(datas);
        
        dataInsert(datas);
      }
    return (
        <>
            {content}
            <form onSubmit={handleSubmit} style={{ border: '2px solid lime' }}>
                <input type="text" value={userChate} onChange={handleChange} placeholder="내용을 입력 해주세요" style={{ border: '1px solid red' }} />

                <button type="submit">보내기</button>
            </form>
        </>
    )
}