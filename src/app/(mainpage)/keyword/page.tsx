import Link from "next/link";
import UserDogKeywordPage from "../../componets/userDogkeyword";
import DogKeyWordPage from "@/app/componets/dogkeyword";
export default function KeyWordPage() {
  return (
    <div
      className=""
      style={{ width: "400px", margin: "auto", height: "600px" }}
    >
       <DogKeyWordPage/>
      <Link href="/mainchate/0"> 내 강아지와 대화 하기</Link>
      <UserDogKeywordPage/>
    </div>
  );
}
