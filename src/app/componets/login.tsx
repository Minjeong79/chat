'use client'

import { supabase } from "../utils/supabase/createClinet"

export default function LoginPage(){
    
    async function signInWithKakao() {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'kakao',
        })
        console.log('click')
    }

      return (
        <button onClick={signInWithKakao}>카카오 로그인 </button>
      )
}