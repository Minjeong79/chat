import { supabase } from "../utils/supabase/createClinet";
import { DataType, dogDataType, GenderType } from "./type";

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
        .from('dogdatas')
        .insert([
            {
                id: datas.id,
                uuid: datas.uuid,
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

export async function dogDatas() {
    let { data, error } = await supabase
        .from('dogdatas')
        .select('*')
    return data;
}

//강아지와 대화
export async function dataInsert(datas: DataType) {
    const { data, error } = await supabase
        .from('chatdata')
        .insert([
            {
                id: datas.id,
                uuid: datas.uuid,
                dogid: datas.dogid,
                role: datas.role,
                content: datas.content,
            },
        ])
        .select();
}

export async function dataSelect() {
    let { data, error } = await supabase
        .from('chatdata')
        .select('*')
    return dataInsert;
}


