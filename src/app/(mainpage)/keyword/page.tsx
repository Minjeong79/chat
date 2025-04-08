import DogKeyWordPage from "@/app/componets/dogkeyword";
import KeywordSkeleton from "@/app/componets/skeleton/keyword-skeleton";
import { Suspense } from "react";

export default function KeyWordPage() {
  return (
    <section className="sm:w-2/5 mx-auto bg-secondary h-screen relative overflow-x-hidden overflow-y-scroll">
      <Suspense fallback={
        <KeywordSkeleton/>
      }>
         <DogKeyWordPage />
      </Suspense>
     
    </section>
  );
}
