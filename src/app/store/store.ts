import { create } from 'zustand';
import { DogIdType, IdType, UchatType, UserLoginType } from '../../../lib/type';



export const userUidStore = create<UserLoginType>((set) => ({
    uid: "",
    fullName: "",
    setUserData: (user) => set(() => ({ uid: user.uid, fullName: user.fullName })),
  }));

export const useUserChatStore  = create<UchatType>((set)=>({
    content:'',
    setContent: (content) => set({ content }),
    
}));

export const dogNumIdStore = create<DogIdType>((set)=>({
    dogNumid:0,
    setDogNumid: (dogNumid) => set({ dogNumid }),
}));

export const numidStore = create<IdType>((set)=>({
    numId:0,
    setNumid:(numId) => set({ numId })
}))