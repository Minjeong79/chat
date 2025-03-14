"use server";

export async function userContentData(formData: FormData) {
    const userInput = formData.get("message"); // 폼 데이터에서 "message" 값 가져오기

    console.log("사용자가 입력한 값:", userInput);

    return userInput;
}


export async function dogIddData(formData: FormData) {
    const dogid = formData.get("message"); 

    console.log("dogid 값이다아아아아아아아:", dogid);

    return dogid;
}

export async function openAikey(formData: FormData) {
    const aikey = formData.get("message"); 
    return aikey;
}