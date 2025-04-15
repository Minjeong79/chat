'use client'

import { useEffect, useState } from "react"
import { dogNumIdStore, userUidStore } from "../store/store";
import { Activetype, GenderType, Hatetype, Liketype, PersonalityType, UserType } from "../../../lib/type";
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

    const router = useRouter();

    const handlebtn = (i: string) => {
        setSelectGender(i);
    }
    const handlepersonality = (value: string) => {
        if (selectKeyWords.includes(value)) {
            const updated = selectKeyWords.filter((item) => item !== value);
            setSelectKeyWords(updated);
        } else {
            setSelectKeyWords([...selectKeyWords, value]);
        }
    }
    const handlelike = (value: string) => {
        if (selectlikes.includes(value)) {
            const updated = selectlikes.filter((item) => item !== value);
            console.log(updated);
            setSelectLikes(updated);
        } else {
            setSelectLikes([...selectlikes, value]);
        }
    };
    
    const handlehate = (value: string) => {
        if (selecthates.includes(value)) {
            const updated = selecthates.filter((item) => item !== value);
            setSelectHates(updated);
        } else {
            setSelectHates([...selecthates, value]);
        }
    }
    const handleactive = (value: string) => {
        if (selectactives.includes(value)) {
            const updated = selectactives.filter((item) => item !== value);
            setSelectActives(updated);
        } else {
            setSelectActives([...selectactives, value]);
        }
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
        <section className="mx-auto bg-secondary min-h-screen relative flex flex-col">
            <h2 className="text-center m-6">{fullName} 의 강아지는?</h2>
            <form onSubmit={handleDogsubmit} className="p-2 flex flex-col flex-1">
                <div className="flex-1 overflow-y-auto">
                    <h3 className="text-sm text-slate-300 mb-2">강아지 이름</h3>
                    <div className="flex gap-x-2.5">
                        <input type="text" maxLength={20} placeholder="강아지 이름" onChange={(e) => setDogName(e.target.value)} required />
                        <input type="number" min="0" max="20" maxLength={5} placeholder="강아지 나이" onChange={(e) => setDogAge(parseInt(e.target.value))} required />
                    </div>
                    <h3 className="text-sm mt-10 text-slate-300 mb-2">강아지 성별🐶</h3>
                    <ul className="flex flex-wrap gap-x-2.5">
                        {gender.map((i, idx) => (
                            <li key={idx}>
                                <button type="button" className={`rounded-lg py-2.5 px-5 ${selectGender.includes(i.gender) ? "bg-slate-400" : "bg-slate-700"}`} onClick={() => handlebtn(i.gender)}>{i.gender}</button>
                            </li>
                        ))}
                    </ul>
                    <h3 className="text-sm mt-10 text-slate-300 mb-2">강아지 성격😏</h3>
                    <ul className="flex flex-wrap gap-2.5">
                        {personality[0] && (Object.entries(personality[0])?.filter(([key]) => key !== "id").map(([key, value], idx) => (
                            <li key={idx}>
                                <button type="button" className={`rounded-lg py-2.5 px-5 ${selectKeyWords.includes(value) ? "bg-slate-400" : "bg-slate-700"}`} onClick={() => handlepersonality(value)}>{value}</button>
                            </li>)))}
                    </ul>
                    <h3 className="text-sm mt-10 text-slate-300 mb-2">좋아해🎈</h3>
                    <ul className="flex flex-wrap gap-2.5">
                        {like[0] && (Object.entries(like[0])?.filter(([key]) => key !== "id").map(([key, value], idx) => (
                            <li key={idx}>
                                <button type="button" className={`rounded-lg  py-2.5 px-5 ${selectlikes.includes(value) ? "bg-slate-400" : "bg-slate-700"}`} onClick={() => handlelike(value)}>{value}</button>
                            </li>)))}
                    </ul>
                    <h3 className="text-sm mt-10 text-slate-300 mb-2">싫어해⚡</h3>
                    <ul className="flex flex-wrap gap-2.5">
                        {hate[0] && (Object.entries(hate[0])?.filter(([key]) => key !== "id").map(([key, value], idx) => (
                            <li key={idx}>
                                <button type="button" className={`rounded-lg py-2.5 px-5 ${selecthates.includes(value) ? "bg-slate-400" : "bg-slate-700"} `} onClick={() => handlehate(value)}>{value}</button>
                            </li>)))}
                    </ul>
                    <h3 className="text-sm mt-10 text-slate-300 mb-2">행동🤠</h3>
                    <ul className="flex flex-wrap gap-2.5">
                        {active[0] && (Object.entries(active[0])?.filter(([key]) => key !== "id").map(([key, value], idx) => (
                            <li key={idx}><button type="button" className={`rounded-lg py-2.5 px-5 ${selectactives.includes(value) ? "bg-slate-400" : "bg-slate-700"}`} onClick={() => handleactive(value)}>{value}</button>
                            </li>)))}
                    </ul>
                </div>

                <div className="mt-6">
                    <p className="text-center text-sm p-2 mb-2 text-slate-500">키워드 설정 안할시 ai 자동으로 설정 됩니다.</p>
                    <button type="submit" className=" border-0 rounded-xl px-3 py-4 block min-w-min w-4/5 mx-auto bg-amber-500 text-white mb-5">내 강아지와 대화하기</button>
                </div>
            </form>

        </section>
    )
}