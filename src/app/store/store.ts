import { create } from 'zustand';
import { UchatType, UserLoginType } from '../../../lib/type';



export const userUidStore = create<UserLoginType>((set) => ({
    uid: "",
    fullName: "",
    setUserData: (user) => set(() => ({ uid: user.uid, fullName: user.fullName })),
  }));

export const useUserChatStore  = create<UchatType>((set)=>({
    content:'',
    setContent: (content) => set({ content }),
    
}));