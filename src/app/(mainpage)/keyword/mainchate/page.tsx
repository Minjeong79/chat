import Link from "next/link";
import { dataUserAll } from "../../../../../lib/db";
import ChateListPage from "@/app/componets/chat/chateList";

export default async function MainChateListPage() {

 

  return (
    <section className="sm:w-2/5 mx-auto bg-secondary h-screen relative overflow-x-hidden overflow-y-scroll">
      <h3 className="text-center p-5">강아지 대화 목록</h3>
     <ChateListPage/>
    </section>
  );
}
