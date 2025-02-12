import Link from "next/link";

export default function ChatePage() {
  return (
    <div
      className=""
      style={{ width: "400px", margin: "auto", height: "600px" }}
    >
      <div style={{background:'skyblue', height:'100%', position:'relative'}}>
        <div >
            안녕
        </div>
        <div style={{background:'#999', height:'60px'}}>
            보고 싶었어
        </div>
      </div>
      <input type="text" placeholder="내용을 입력 해주세요"/>
    </div>
  );
}
