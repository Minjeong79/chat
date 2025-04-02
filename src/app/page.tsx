import Image from "next/image";
import Link from "next/link";
import LoginPage from "./componets/login";

export default function Home() {



  return (
    <section className="sm:w-2/5 mx-auto bg-secondary h-screen relative">
      <main className="h-96 bg-white">
        <div> 메인 이미지</div>
        <LoginPage />
        
      </main>
    </section>
  );
}
