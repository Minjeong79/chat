import Link from "next/link";

export default function KeyWordPage() {
  return (
    <div
      className=""
      style={{ width: "400px", margin: "auto", height: "600px" }}
    >
        <h3>강아지 이름</h3>
        <input type="text" placeholder="강아지 이름을 입력 해주세요"/>
        <h3 style={{marginTop:'40px'}}>강아지 성별</h3>
        <ul>
            <li><button style={{border:'1px solid #999'}}>♂</button></li>
            <li><button style={{border:'1px solid #999'}}>♀</button></li>
        </ul>
        <h3 style={{marginTop:'40px'}}>강아지 성격</h3>
      <ul>
        <li><button style={{border:'1px solid #999'}}>데이터 값</button></li>
        <li><button style={{border:'1px solid #999'}}>데이터 값</button></li>
        <li><button style={{border:'1px solid #999'}}>데이터 값</button></li>
        <li><button style={{border:'1px solid #999'}}>데이터 값</button></li>
        <li><button style={{border:'1px solid #999'}}>데이터 값</button></li>
        <li><button style={{border:'1px solid #999'}}>데이터 값</button></li>
      </ul>
      <Link href="/mainchate/0"> 내 강아지와 대화 하기</Link>
    </div>
  );
}
