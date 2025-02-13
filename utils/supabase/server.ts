import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function createClientsupa() {
  const cookieStore = await cookies();

  // 쿠키를 직접 처리
  const cookieData = cookieStore.getAll(); // 필요한 경우 추가 처리

  // Supabase 클라이언트 생성 (쿠키 제외)
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}