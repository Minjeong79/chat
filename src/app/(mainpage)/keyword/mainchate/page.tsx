import ChateListPage from "@/app/componets/chat/chateList";
import ListSkeleton from "@/app/componets/skeleton/list-skeleton";
import { Suspense } from "react";

export default async function MainChateListPage() {
  return (
    <section className="sm:w-2/5 mx-auto bg-secondary h-screen relative overflow-x-hidden overflow-y-auto">
      <h3 className="text-center p-5">강아지 대화 목록</h3>
      <Suspense fallback={
        <ListSkeleton />
      }>
        <ChateListPage />
      </Suspense>

    </section>
  );
}
