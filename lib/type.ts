import { User } from "@supabase/supabase-js";

export interface UserType {
  uid: string;
  fullName: string;
}

export interface UserLoginType {
  uid: string;
  fullName: string;
  setUserData: (user: UserType) => void;
}

export interface UchatType {
    content:string;
    setContent: (content: string) => void;
}