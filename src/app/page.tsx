import Image from "next/image";
import Link from "next/link";
import { supabase } from "./utils/supabase/createClinet";

export default function Home() {

  async function signInWithKakao() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
    })
  }

  return (
    <div className="" style={{width:'400px', margin:'auto', height:'600px'}}>
      <main className="">
       <div> 메인 이미지</div>
      <button>카카오 로그인 </button>
       <Link href="/keyword"> 시작 버튼</Link>
      </main>
    </div>
  );
}
