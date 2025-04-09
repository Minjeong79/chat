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
  content: string;
  setContent: (content: string) => void;
}
export interface DogIdType {
  dogNumid: number;
  setDogNumid: (dogNumid: number) => void;
}

export interface IdType {
  numId: number;
  setNumid: (numId: number) => void;
}

export interface GenderType {
  gender: string;
}
export interface PersonalityType {
  id:number;
  active:string;
  shy:string;
  brave:string;
  aggressive:string;
  gentle:string;
  curious:string;
  affectionate:string;
  loyal:string;
  patient:string;
  independent:string;
  cautious:string;
}
export interface Liketype {
  id:number;
  treats:string;
  walk:string;
  newenvironment:string;
  guardian:string;
  sleeping:string;
  physicalaffection:string;
  smell:string;
  friend:string;
  food:string;
  play:string;
  toys:string;
  sunlight:string;
}
export interface Hatetype {
  id:number;
  strangers:string;
  alone:string;
  clothes:string;
  loudnoises:string;
  physicalaffection:string;
  baths:string;
  friend:string;
  veterinary:string;
  carrides:string;
  training:string;
}
export interface Activetype {
  id:number;
  tailwagging:string;
  barking:string;
  spinning:string;
  licking:string;
  training:string;
  beingcuddly:string;
  running:string;
  mouthing:string;
  biting:string;
  following:string;
  beingannoyed:string;
  bigging:string;
  crazy:string;
}
export interface dogDataType {
  id: number;
  uuid: string;
  name: string;
  age: number;
  gender: string;
  personality: string[];
  like:string[];
  hate:string[];
  active:string[];
}

export interface DataType {
    id: number;
    uuid: string;
    dogid: number;
    role: string;
    content: string;
    name:string;
}
