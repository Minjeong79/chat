'use client'

import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabase/createClinet"
import { UserType } from "../../../lib/type";
import { userUidStore } from "../store/store";
import Link from "next/link";


export default function LoginPage() {
  const [useri, setUser] = useState<UserType>();
  const { setUserData } = userUidStore();

  const signInWithKakao = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: `https://rzlzhvlftiqiqovonrwd.supabase.co/auth/v1/callback`,
        },

      });

    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    const fetchLogin = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (data.user) {
        const user: UserType = {
          uid: data.user.id,
          fullName: data.user.user_metadata.full_name,
        };
        setUser(user);
        setUserData(user)
      }

    }

    fetchLogin();
  }, [useri])

  return (
    <section className="lg mx-auto">
      <div className="p-2">{useri?.fullName ? <p className="text-right">{useri.fullName} 보호자 님</p> : <p className="text-center text-lg p-10">어서오세요!<br/>당신의 강아지와 대화 해보세요!</p> } </div> 
      {useri?.uid ? <></> : <button className="absolute v right-0 left-0 border-0 rounded-xl px-3 py-4 block w-4/5 bg-amber-400 mx-auto" onClick={signInWithKakao}>카카오 로그인 </button>}
      {useri?.uid && <div className="text-center absolute bottom-10 right-0 left-0">
        <Link href="/keyword" className="border-0 rounded-xl px-3 py-4 block min-w-min w-4/5 mx-auto bg-amber-500 text-white"> 시작 버튼</Link>
        <Link href="/keyword/mainchate" className="border-0 px-3 py-4 block mx-auto text-base text-slate-500 underline"> 기존 대화로 가기</Link>
      </div>}
    </section>
  )
}