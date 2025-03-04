import { supabase } from "../utils/supabase/createClinet";
import { dogDataType, GenderType } from "./type";

interface DataType {
    id: string;
    userid: string;
    dogid: string;
    role: string;
    content: string;
    // created_at: string;
}

export async function dataInsert(datas: DataType) {
    const { data, error } = await supabase
        .from('chatdata')
        .insert([
            {
                id: datas.id,
                userid: datas.userid,
                dogid: datas.dogid,
                role: datas.role,
                content: datas.content,
                // created_at: datas.created_at
            },
        ])
        .select("*");
    if (error) {
        console.error("Error inserting data:", error);
    } else {
        console.log("Data inserted successfully:", data);
    }
}

//강아지 키워드
export async function doggender() {
    let { data, error } = await supabase
        .from('doggender')
        .select('*')
    return data || [];
}

export async function dogpersonality() {
    let { data, error } = await supabase
        .from('dogpersonality')
        .select('*')
    if (error) {
        throw error;
    }
    return data;
}

export async function dogLike() {
    let { data, error } = await supabase
        .from('doglike')
        .select('*')
    if (error) {
        throw error;
    }
    return data;
}

export async function doghate() {
    let { data, error } = await supabase
        .from('doghate')
        .select('*')
    if (error) {
        throw error;
    }
    return data;
}

export async function dogactive() {
    let { data, error } = await supabase
        .from('dogactive')
        .select('*')
    if (error) {
        throw error;
    }
    return data;
}

export async function dogInsert(datas: dogDataType) {
    const { data, error } = await supabase
        .from('dogdata')
        .insert([
            {
                id: datas.id,
                name: datas.name,
                age: datas.age,
                gender: datas.gender,
                personality: datas.personality,
                like: datas.like,
                hate: datas.hate,
                active: datas.active,
            },
        ])
        .select()
}