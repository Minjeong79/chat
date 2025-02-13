import { create } from 'zustand';

interface UchatType {
    content:string;
    setContent: (content: string) => void;
}
export const useUserChat  = create<UchatType>((set)=>({
    content:'',
    setContent: (content) => set({ content }),
    
}));