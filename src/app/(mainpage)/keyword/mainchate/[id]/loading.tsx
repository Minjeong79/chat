import Image from "next/image";
export default async function Loading() {
 
  return (
    <section className="sm:w-2/5 mx-auto bg-secondary h-screen relative flex justify-center">
     <Image src="https://rzlzhvlftiqiqovonrwd.supabase.co/storage/v1/object/public/dog//loading.png" width={60} height={60} alt="로딩중..." />
    </section>
  );
}
