import Image from "next/image";
export default function Loading() {
    return (<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-1 text-center justify-center w-full">
        <Image className="animate-pulse" src="https://rzlzhvlftiqiqovonrwd.supabase.co/storage/v1/object/public/dog//loading1.png" width={40} height={40} alt="로딩중..." />
        강아지가 말을<br />준비하고 있어요...
    </div>)
}