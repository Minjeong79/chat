'use client'

import { useEffect, useState } from "react"
import { dogNumIdStore, userUidStore } from "../store/store";
import { Activetype, GenderType, Hatetype, Liketype, PersonalityType, UserType } from "../../../lib/type";
import { supabase } from "../../../utils/supabase/createClinet";
import { dogactive, doggender, doghate, dogInsert, dogLike, dogpersonality } from "../../../lib/db";
import { customAlphabet } from "nanoid";
import { useRouter } from "next/navigation";
import { useStore } from "zustand";

export default function DogKeyWordPage() {
    const nanoid = customAlphabet("123456789", 8);
    const nid = Number(nanoid());
    const useri = useStore(userUidStore, (state) => state.uid);
    const fullName = useStore(userUidStore, (state) => state.fullName);

    const { setDogNumid } = dogNumIdStore();
    const [dogName, setDogName] = useState('');
    const [dogAge, setDogAge] = useState(0);
    const [gender, setGender] = useState<GenderType[]>([]);
    const [personality, setpersonality] = useState<PersonalityType[]>([]);
    const [like, setLike] = useState<Liketype[]>([]);
    const [hate, setHate] = useState<Hatetype[]>([]);
    const [active, setActive] = useState<Activetype[]>([]);

    const [selectGender, setSelectGender] = useState("");
    const [selectKeyWords, setSelectKeyWords] = useState<string[]>([]);
    const [selectlikes, setSelectLikes] = useState<string[]>([]);
    const [selecthates, setSelectHates] = useState<string[]>([]);
    const [selectactives, setSelectActives] = useState<string[]>([]);


    const [myDog, setMyDog] = useState([]);

    const router = useRouter();

    const handlebtn = (i: string) => {
        setSelectGender(i);
    }
    const handlepersonality = (value: string) => {
        const combinedValues = [...selectKeyWords, value];
        const arr: any = [... new Set(combinedValues)]
        setSelectKeyWords(arr);
    }
    const handlelike = (value: string) => {
        const combinedValues = [...selectlikes, value];
        const arr: any = [... new Set(combinedValues)]
        setSelectLikes(arr);
    }
    const handlehate = (value: string) => {
        const combinedValues = [...selecthates, value];
        const arr: any = [... new Set(combinedValues)]
        setSelectHates(arr);
    }
    const handleactive = (value: string) => {
        const combinedValues = [...selectactives, value];
        const arr: any = [... new Set(combinedValues)]
        setSelectActives(arr);
    }

    useEffect(() => {
        const genderData = async () => {
            const data = await doggender();
            if (data) {
                setGender(data);
            }
        }
        genderData();

        const personalityData = async () => {
            const data = await dogpersonality();
            if (data) {
                setpersonality(data);
            }
        }
        personalityData();

        const likeData = async () => {
            const data = await dogLike();
            if (data) {
                setLike(data);
            }
        }
        likeData();

        const hateData = async () => {
            const data = await doghate();
            if (data) {
                setHate(data);
            }
        }
        hateData();

        const activeData = async () => {
            const data = await dogactive();
            if (data) {
                setActive(data);
            }
        }
        activeData();

    }, [])

    const handleDogsubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!fullName) {
            alert("로그인을 다시 해주세요😣");
            return;
        }
    

        const datas = {
            id: nid,
            uuid: useri,
            name: dogName,
            age: dogAge,
            gender: selectGender,
            personality: selectKeyWords,
            like: selectlikes,
            hate: selecthates,
            active: selectactives,
        }

        setDogNumid(nid)
        sessionStorage.setItem('dogid', `${nid}`);
        dogInsert(datas);
        router.push(`/keyword/mainchate/${nid}`)

        console.log(datas);
    }
    return (
        <section className="mx-auto bg-secondary h-screen relative">
            <h2 className="text-center m-6">{fullName} 의 강아지는?</h2>
           
            <form onSubmit={handleDogsubmit} className="p-2 ">
            <h3 className="text-sm text-slate-300 mb-2">강아지 이름</h3>
                <div className="flex gap-x-2.5">
                    <input type="text" maxLength={20} placeholder="강아지 이름" onChange={(e) => setDogName(e.target.value)} required/>
                    <input type="number" min="0" max="20" maxLength={5} placeholder="강아지 나이" onChange={(e) => setDogAge(parseInt(e.target.value))} required/>
                </div>
                <h3 className="text-sm mt-10 text-slate-300 mb-2">강아지 성별🐶</h3>
                <ul className="flex flex-wrap gap-x-2.5">
                    {gender.map((i, idx) => (
                        <li key={idx}><button type="button" className="rounded-lg bg-slate-700 py-2.5 px-5" onClick={() => handlebtn(i.gender)}>{i.gender}</button></li>
                    ))}
                </ul>
                <h3 className="text-sm mt-10 text-slate-300 mb-2">강아지 성격😏</h3>
                <ul className="flex flex-wrap gap-2.5">
                    {personality[0] && (Object.entries(personality[0])?.filter(([key]) => key !== "id").map(([key, value], idx) => (<li key={idx}><button type="button" className="rounded-lg bg-slate-700 py-2.5 px-5" onClick={() => handlepersonality(value)}>{value}</button></li>)))}
                </ul>
                <h3 className="text-sm mt-10 text-slate-300 mb-2">좋아해🎈</h3>
                <ul className="flex flex-wrap gap-2.5">
                    {like[0] && (Object.entries(like[0])?.filter(([key]) => key !== "id").map(([key, value], idx) => (<li key={idx}><button type="button" className="rounded-lg bg-slate-700 py-2.5 px-5" onClick={() => handlelike(value)}>{value}</button></li>)))}
                </ul>
                <h3 className="text-sm mt-10 text-slate-300 mb-2">싫어해⚡</h3>
                <ul className="flex flex-wrap gap-2.5">
                    {hate[0] && (Object.entries(hate[0])?.filter(([key]) => key !== "id").map(([key, value], idx) => (<li key={idx}><button type="button" className="rounded-lg bg-slate-700 py-2.5 px-5" onClick={() => handlehate(value)}>{value}</button></li>)))}
                </ul>
                <h3 className="text-sm mt-10 text-slate-300 mb-2">행동🤠</h3>
                <ul className="flex flex-wrap gap-2.5">
                    {active[0] && (Object.entries(active[0])?.filter(([key]) => key !== "id").map(([key, value], idx) => (<li key={idx}><button type="button" className="rounded-lg bg-slate-700 py-2.5 px-5" onClick={() => handleactive(value)}>{value}</button></li>)))}
                </ul>
                <button type="submit" className="mt-6 border-0 rounded-xl px-3 py-4 block min-w-min w-4/5 mx-auto bg-amber-500 text-white">내 강아지와 대화하기</button>
            </form>

        </section>
    )
}