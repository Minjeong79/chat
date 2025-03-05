'use client'

import { useEffect, useState } from "react";
import OpenAI from "openai";

interface AiType{
    aianswer : string | null;
}
export default function AiChatePage({ai}:{ai:AiType;}){
    const [aian, setAian] =  useState<AiType>(ai);
    
  

    useEffect(()=>{
        const talckChat =async ()=>{

        }
       
      
    },[])
    return(<div>{aian.aianswer}</div>);
}