'use client'

import { supabase } from "../../../utils/supabase/createClinet"


export default function LoginPage(){
    
    async function signInWithKakao() {
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

      return (
        <button onClick={signInWithKakao}>카카오 로그인 </button>
      )
}