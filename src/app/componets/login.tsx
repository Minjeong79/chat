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
      <div className="text-right">{useri?.fullName && useri.fullName}</div>
      <div style={{ color: 'blue', fontSize: '20px' }}>{ }</div>
      {useri?.uid ? <button className="" onClick={logoutKakao}>로그아웃 </button> : <button className="border rounded-xl px-3 py-4 block min-w-min" onClick={signInWithKakao}>카카오 로그인 </button>}
      {useri?.uid && <div className="text-center absolute bottom-0 right-0 left-0">
        <Link href="/keyword" className="border rounded-xl px-3 py-4 block min-w-min"> 시작 버튼</Link>
      </div>}
    </section>
  )
}