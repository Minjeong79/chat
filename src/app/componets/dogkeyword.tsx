'use client'

import { useEffect, useState } from "react"
import { userUidStore } from "../store/store";
import { Activetype, GenderType, Hatetype, Liketype, PersonalityType, UserType } from "../../../lib/type";
import { supabase } from "../../../utils/supabase/createClinet";
import { dogactive, doggender, doghate, dogInsert, dogLike, dogpersonality } from "../../../lib/db";
import { customAlphabet } from "nanoid";

export default function DogKeyWordPage() {
    const nanoid = customAlphabet("123456789abcdefg", 9);
    const [useri, setUser] = useState<UserType>();
    const { setUserData } = userUidStore();
    const [gender, setGender] = useState<GenderType[]>([]);
    const [personality, setpersonality] = useState<PersonalityType[]>([]);
    const [like, setLike] = useState<Liketype[]>([]);
    const [hate, setHate] = useState<Hatetype[]>([]);
    const [active, setActive] = useState<Activetype[]>([]);

    const [selectGender, setSelectGender] =  useState("");
    const [selectKeyWords, setSelectKeyWords] = useState<string[]>([]);
    const [selectlikes, setSelectLikes] = useState<string[]>([]);
    const [selecthates, setSelectHates] = useState<string[]>([]);
    const [selectactives, setSelectActives] = useState<string[]>([]);

    const [myDog, setMyDog] = useState([]);

    const handlebtn = (i: string) => {
        setSelectGender(i);
    }
    const handlepersonality = (value: string) => {
        const combinedValues = [...selectKeyWords, value];
        const arr: any = new Set(combinedValues)
        setSelectKeyWords(arr);
    }
    const handlelike = (value: string) => {
        const combinedValues = [...selectlikes, value];
        const arr: any = new Set(combinedValues)
        setSelectLikes(arr);
    }
    const handlehate = (value: string) => {
        const combinedValues = [...selecthates, value];
        const arr: any = new Set(combinedValues)
        setSelectHates(arr);
    }
    const handleactive = (value: string) => {
        const combinedValues = [...selectactives, value];
        const arr: any = new Set(combinedValues)
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


        const fetchLogin = async () => {
            const { data, error } = await supabase.auth.getUser();

            if (data.user) {
                const user: UserType = {
                    uid: data.user.id,
                    fullName: data.user.user_metadata.full_name,
                };
                setUser(user);
                setUserData(user)
            }

        }

        fetchLogin();
    }, [useri])
    
    const handleDogsubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const datas = {
            id :nanoid(),
            name:'멍멍',
            age:2,
            gender : selectGender,
            personality : selectKeyWords,
            like : selectlikes,
            hate : selecthates,
            active : selectactives,
        }
        dogInsert(datas);
        console.log(datas);
    }
    return (
        <div>
            <h3>강아지 이름</h3>
            <form onSubmit={handleDogsubmit}>
                <input type="text" placeholder="강아지 이름을 입력 해주세요" style={{ border: '1px solid #999' }} />
                <h3 style={{ marginTop: '40px' }}>강아지 성별</h3>
                <ul>
                    {gender.map((i, idx) => (
                        <li key={idx} style={{ border: '1px solid #999' }}><button type="button" onClick={() => handlebtn(i.gender)}>{i.gender}</button></li>
                    ))}
                </ul>
                <h3 style={{ marginTop: '40px' }}>강아지 성격</h3>
                <ul>
                    {personality[0] && (Object.entries(personality[0])?.filter(([key]) => key !== "id").map(([key, value], idx) => (<li key={idx} style={{ border: '1px solid #999' }}><button type="button" onClick={() => handlepersonality(value)}>{value}</button></li>)))}
                </ul>
                <br />
                <ul className="">
                    {like[0] && (Object.entries(like[0])?.filter(([key]) => key !== "id").map(([key, value], idx) => (<li key={idx} style={{ border: '1px solid #999' }}><button type="button" onClick={() => handlelike(value)}>{value}</button></li>)))}
                </ul>
                <br />
                <ul className="">
                    {hate[0] && (Object.entries(hate[0])?.filter(([key]) => key !== "id").map(([key, value], idx) => (<li key={idx} style={{ border: '1px solid #999' }}><button type="button" onClick={() => handlehate(value)}>{value}</button></li>)))}
                </ul>
                <br />
                <ul className="">
                    {active[0] && (Object.entries(active[0])?.filter(([key]) => key !== "id").map(([key, value], idx) => (<li key={idx} style={{ border: '1px solid #999' }}><button type="button" onClick={() => handleactive(value)}>{value}</button></li>)))}
                </ul>
                <br />
                <button type="submit">내 강아지와 대화하기</button>
            </form>

        </div>
    )
}