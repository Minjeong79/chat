'use client'

import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabase/createClinet"
import { UserType } from "../../../lib/type";
import { userUidStore } from "../store/store";


export default function LoginPage() {
  const [useri, setUser] = useState<UserType>();
  const {setUserData} = userUidStore();
  async function signInWithKakao() {
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


  useEffect(() => {
    const fetchLogin = async () => {
      const { data, error } = await supabase.auth.getUser();
      
      if(data.user){
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
    <>
      <div style={{color:'blue', fontSize:'20px'}}>{useri?.fullName}</div>
      <button onClick={signInWithKakao}>카카오 로그인 </button>
    </>
  )
}