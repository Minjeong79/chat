import Image from "next/image";
import Link from "next/link";
import LoginPage from "./componets/login";

export default function Home() {

 

  return (
    <div className="" style={{width:'400px', margin:'auto', height:'600px'}}>
      <main className="">
       <div> 메인 이미지</div>
        <LoginPage/>
       <Link href="/keyword"> 시작 버튼</Link>
      </main>
    </div>
  );
}
