import { supabase } from "../utils/supabase/createClinet";




export async function dogInsert() {
    const { data, error } = await supabase
        .from('dogdata')
        .insert([
            { id: '' },
            { name: 'otherValue' },
            { age: 'otherValue' },
            { gender: 'otherValue' },
            { personality: 'otherValue' },
        ])
        .select()

}

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

