'use client'
import Image from "next/image";
import {useEffect, useState } from "react";
import { supabase } from "../../../utils/supabase/createClinet"
import { UserType } from "../../../lib/type";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { userUidStore } from "../store/store";

export default function HeaderPage() {
    const [useri, setUser] = useState<UserType>();
    const { uid, setUserData } = userUidStore();
    const router = useRouter();    
    
    const logoutKakao = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
          setUser(undefined); 
          const user: UserType = {
            uid: '',
            fullName: '',
          };
          setUserData(user);
          history.replaceState(null, '', window.location.pathname);
          window.location.replace("/");
        }
        console.log(error);
      }
     
    return (
    <header className="sm:w-2/5 mx-auto p-2 flex justify-center relative items-center">
        <Link href="/">
            <Image src="https://rzlzhvlftiqiqovonrwd.supabase.co/storage/v1/object/public/dog//logo.png" width={120} height={40} className="object-contain" alt="강아지 캐릭터" />
        </Link>
           {uid && <button className="absolute right-0 p-1 " onClick={logoutKakao}>로그아웃 </button>}
    </header>)
}