import Image from "next/image";
import Link from "next/link";
import LoginPage from "./componets/login";
export default function Home() {



  return (
    <section className="sm:w-2/5 mx-auto bg-secondary h-screen relative">
      <div className="relative h-96 bg-[#F7EDDD]">
        <Image src="https://rzlzhvlftiqiqovonrwd.supabase.co/storage/v1/object/public/dog//dogmain.png" fill  className="object-contain"  alt="강아지 캐릭터"/>
      </div>
      <main className="">
        <LoginPage />
        
      </main>
    </section>
  );
}
