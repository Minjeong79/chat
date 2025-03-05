import Link from "next/link";
import { dogDatas } from "../../../../../lib/db";

export default async function MainChateListPage() {

  const datas = await dogDatas();

  console.log(datas);

  return (
    <div
      className=""
      style={{ width: "400px", margin: "auto", height: "600px" }}
    >
      강아지 대화 목록
      <ul>
        {datas?.map((i) => (<li key={i.id}>
          <Link href = {`keywords/mainchate/${i.id}`}>
          
          </Link>
        </li>))}
      </ul>
    </div>
  );
}
