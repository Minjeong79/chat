'use client'
import { userUidStore } from "@/app/store/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { dataUserAll } from "../../../../lib/db";
import { DataType } from "../../../../lib/type";

export default function ChateListPage() {

    const useri = useStore(userUidStore, (state) => state.uid);
    const [allData, setAllData] = useState<DataType[]>([]);

    const uniqueData = Array.from(
        new Map(allData.map(item => [item.dogid, item])).values()
    );


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
                {uniqueData.map((item) => <li key={item.id} className="p-3 rounded bg-blue-800">
                    <Link href={`keywords/mainchate/${item.dogid}`}>
                        <p className="truncate overflow-hidden whitespace-nowrap w-full">
                            {item.content}
                        </p></Link>
                </li>)}
            </ul>

        </div>
    );
}