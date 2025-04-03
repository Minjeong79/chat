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
      console.log('click')
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

  const logoutKakao = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      setUser(undefined); // useri 상태 초기화
    }
    console.log(error);
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
      <div className="p-2">{useri?.fullName && useri.fullName} 보호자 님</div> 
      {useri?.uid ? <button className="absolute right-0 p-1 bg-yellow-600 top-2" onClick={logoutKakao}>로그아웃 </button> : <button className="absolute bottom-6 v right-0 left-0 border-0 rounded-xl px-3 py-4 block w-4/5 bg-amber-400 mx-auto" onClick={signInWithKakao}>카카오 로그인 </button>}
      {useri?.uid && <div className="text-center absolute bottom-6 right-0 left-0">
        <Link href="/keyword" className="border-0 rounded-xl px-3 py-4 block min-w-min w-4/5 mx-auto bg-blue-600 text-white"> 시작 버튼</Link>
      </div>}
    </section>
  )
}