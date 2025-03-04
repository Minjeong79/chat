import Link from "next/link";
import UserDogKeywordPage from "../../componets/userDogkeyword";
import DogKeyWordPage from "@/app/componets/dogkeyword";
export default function KeyWordPage() {
  return (
    <div
      className=""
      style={{ width: "400px", margin: "auto", height: "600px" }}
    >
      <DogKeyWordPage />
      
      <UserDogKeywordPage />
    </div>
  );
}
