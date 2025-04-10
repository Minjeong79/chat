'use client'
import { dogNumIdStore, userUidStore } from "@/app/store/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { dataUserAll } from "../../../../lib/db";
import { DataType } from "../../../../lib/type";

export default function ChateListPage() {

    const useri = useStore(userUidStore, (state) => state.uid);
    const [allData, setAllData] = useState<DataType[]>([]);
 const storeDogId  = useStore(dogNumIdStore, (state) => state.dogNumid);
    const uniqueData = Array.from(
        new Map(allData.map(item => [item.dogid, item])).values()
    );

console.log(storeDogId);
    useEffect(() => {
        const hadleAllData = async () => {
            const datas = await dataUserAll(useri);
            if (datas) {
                setAllData(datas);
            }
        }
        hadleAllData();
    }, []);
    return (
        <div>
            <ul className="m-3">
                {uniqueData.map((item) =>
                <li key={item.id} className="p-3 rounded bg-amber-500 mb-2">
                    <Link href={`/keyword/mainchate/${item.dogid}`} className="flex">
                        <p className="truncate overflow-hidden whitespace-nowrap w-4/5">
                        {item.name} / {item.content}
                        </p></Link>
                        <button>삭</button>
                </li>)}
            </ul>

        </div>
    );
}