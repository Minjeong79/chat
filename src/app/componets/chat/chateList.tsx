'use client'
import { dogNumIdStore, userUidStore } from "@/app/store/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { dataDelete, dataUserAll } from "../../../../lib/db";
import { DataType } from "../../../../lib/type";
import { useRouter } from "next/navigation";
import { GoXCircleFill } from "react-icons/go";

export default function ChateListPage() {
    const router = useRouter();
    const useri = useStore(userUidStore, (state) => state.uid);
    const [allData, setAllData] = useState<DataType[]>([]);
    const storeDogId = useStore(dogNumIdStore, (state) => state.dogNumid);

    const uniqueData = Array.from(
        new Map(allData.map(item => [item.dogid, item])).values()
    );
    const handleDelete = async (dogid: number) => {
        console.log(dogid);
        await dataDelete(dogid);
        router.refresh();
    }

    useEffect(() => {
        const hadleAllData = async () => {
            const datas = await dataUserAll(useri);
            if (datas) {
                setAllData(datas);
            }
        }
        hadleAllData();
    }, [allData]);
    return (
        <div>
            <ul className="m-3">
                {uniqueData.map((item) =>
                    <li key={item.id} className="p-3 rounded bg-amber-500 mb-2">
                        <div className="flex items-center gap-2">
                            <Link href={`/keyword/mainchate/${item.dogid}`} className="flex-1 min-w-0">
                                <p className="truncate overflow-hidden whitespace-nowrap w-4/5">
                                    {item.name} / {item.content}
                                </p>
                            </Link>
                            <button className="shrink-0" onClick={() => handleDelete(item.dogid)}>
                                <GoXCircleFill />
                            </button>
                        </div>
                    </li>)}
            </ul>

        </div>
    );
}