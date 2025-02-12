import Link from "next/link";

export default function MainChateListPage() {
  return (
    <div
      className=""
      style={{ width: "400px", margin: "auto", height: "600px" }}
    >
      <ul>
        <li>
          <Link href="/mainchate/0">
            강아지 이름 <br />
            마지막 글 내용
          </Link>
        </li>
        <li>채팅 목록</li>
        <li>채팅 목록</li>
        <li>채팅 목록</li>
        <li>채팅 목록</li>
        <li>채팅 목록</li>
        <li>채팅 목록</li>
      </ul>
    </div>
  );
}
