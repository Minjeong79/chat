'use client'

import { useEffect, useState } from "react";
import OpenAI from "openai";

interface AiType{
    aianswer : string | null;
}
export default function AiChatePage(){
    const [ai, setAi] =  useState<AiType>();
    
   

    useEffect(()=>{
       
      
    },[])
    return(<>{ai}</>);
}