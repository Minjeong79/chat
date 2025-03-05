import { create } from 'zustand';
import { DogIdType, UchatType, UserLoginType } from '../../../lib/type';



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
}))