'use client'

import { userUidStore } from "../store/store";

export default function UserDogKeywordPage(){
    const { uid, fullName } = userUidStore();
    return(<div>hi</div>);
}