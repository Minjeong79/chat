<h2>나의 강아지와 채팅(Nextjs 구현) </h2>

<img src="https://rzlzhvlftiqiqovonrwd.supabase.co/storage/v1/object/public/git//Frame%202.png" alt="나의 강아지와 채팅(Nextjs 구현)" style="width:60%"/>
<ul>
        <li>배포 url : https://ai-chat-gamma-hazel.vercel.app/</li>
        <li>Test ID : minj92@kakao.com</li>
        <li>Test PW : fkdnxj0906!!</li>
</ul>



<h3>🌟프로젝트 소개</h3>
<ul>
        <li>이 프로젝트는 사용자가 선택한 키워드를 기반으로 강아지 AI가 대화를 이어가는 채팅 애플리케이션입니다. </li>
        <li>랜선 집사가 되어 보세요.</li>
</ul>


<h3>🚀개발 환경</h3>
<ul>
      <li>Front : Nextjs, Ts, Recoil, Tailwind</li>
      <li>Back : supabase, platform.openai</li>
      <li>버전 및 이슈 관리 : Github</li>
      <li>디자인 : Figma</li>
      <li>서비스 배포 환경 : vercel</li>
</ul>




<h3>🛠채택한 개발 기술</h3>
<ul>
         <li>
           Nextjs App Router 사용<br>
          Next.js의 App Router는 별도 설정 없이도 라우팅 구조를 쉽게 구성할 수 있습니다. 강아지별 대화 페이지를 손쉽게 분리하고 유지보수할 수 있어, 이 프로젝트에 특히 적합했습니다.
         </li>
         <li>상태 관리에는 Recoil을 사용<br>
         컨텐츠 ID, 강아지 ID, 강아지 이름 등의 전역 상태를 간편하게 다루기 위해 Recoil을 도입했습니다.
         </li>
</ul>
<ul>
         <li>카카오 로그인, Supabase를 사용, platform.openai</li>
</ul>




<h3>📂프로젝트 구조</h3>

```/ (루트 디렉터리)
📦lib
 ┣ 📜db.ts
 ┗ 📜type.ts
📦app
 ┣ 📂(mainpage)
 ┃ ┗ 📂keyword
 ┃ ┃ ┣ 📂mainchate
 ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┣ 📂actions
 ┃ ┗ 📜actions.ts
 ┣ 📂api
 ┃ ┣ 📂getdogid
 ┃ ┃ ┗ 📜route.ts
 ┃ ┣ 📂openpostai
 ┃ ┃ ┗ 📜route.ts
 ┃ ┣ 📂postdogid
 ┃ ┃ ┗ 📜route.ts
 ┃ ┗ 📂userpost
 ┃ ┃ ┗ 📜route.ts
 ┣ 📂componets
 ┃ ┣ 📂chat
 ┃ ┃ ┣ 📜aichate.tsx
 ┃ ┃ ┗ 📜chateList.tsx
 ┃ ┣ 📂skeleton
 ┃ ┃ ┣ 📜keyword-skeleton.tsx
 ┃ ┃ ┣ 📜list-skeleton.tsx
 ┃ ┃ ┗ 📜loding.tsx
 ┃ ┣ 📜dogkeyword.tsx
 ┃ ┣ 📜Footer.tsx
 ┃ ┣ 📜Header.tsx
 ┃ ┗ 📜login.tsx
 ┣ 📂store
 ┃ ┗ 📜store.ts
 ┣ 📜favicon.ico
 ┣ 📜globals.css
 ┣ 📜layout.tsx
 ┗ 📜page.tsx
```




<h3>🗺페이지 별 주요 기능</h3>
<h4>[ 첫 페이지 ] </h4>
<img src="https://rzlzhvlftiqiqovonrwd.supabase.co/storage/v1/object/public/git//Frame%202.png" alt="첫페이지"/>
<ul>
      <li>로그인이 되어 있지 않은 경우 : SNS 로그인 페이지</li>
     
</ul>

<h4>[ 시작 페이지 ] </h4>
<img src="https://rzlzhvlftiqiqovonrwd.supabase.co/storage/v1/object/public/git//Frame%203.png" alt="시작 페이지"/>
<ul>
      <li>로그인 후 시작 페이지 / 기존 대화로 이동 </li>
</ul>


<h4>[ 키워드 페이지 ] </h4>
<img src="https://rzlzhvlftiqiqovonrwd.supabase.co/storage/v1/object/public/git//Frame%204.png" alt="키워드 페이지"/>
<ul>
      <li>사용자 닉네임이 표시 됩니다.</li>
      <li>강아지의 이름, 나이를 작성합니다.</li>
      <li>강아지의 성격, 좋아하는 것, 싫어하는 것, 행동등을 설정 할 수 있습니다.</li>
</ul>


<h4>[ 채팅 페이지 ] </h4>
<img src="https://rzlzhvlftiqiqovonrwd.supabase.co/storage/v1/object/public/git//Frame%206.png" alt="채팅 페이지"/>
<ul>
      <li>설정한 키워드의 강아지와 대화를 할 수 있습니다.</li>
</ul>


<h4>[ 채팅 목록 페이지 ] </h4>
<img src="https://rzlzhvlftiqiqovonrwd.supabase.co/storage/v1/object/public/git//Frame%205.png" alt="채팅 목록 페이지"/>
<ul>
      <li>기존에 채팅 목록 페이지 입니다.</li>
</ul>





<h3>🖐프로젝트 후기</h3>
Platform.OpenAI를 활용해 AI 기능을 구현하면서, 초기에 구조를 어떻게 설계하느냐가 개발 효율성과 보안 측면에서 매우 중요하다는 것을 체감했습니다.

서버 컴포넌트 기반 사용
Platform.OpenAI는 서버 컴포넌트에서만 사용할 수 있기 때문에, 클라이언트와의 역할 분리를 명확히 해야 했습니다. 어떤 데이터를 서버에서 처리하고, 어떤 데이터를 클라이언트로 전달할지를 명확히 나누는 설계가 필수였습니다.

API 라우트와 클라이언트 연결 방식
서버에서 OpenAI API 호출 후, 그 결과를 클라이언트 컴포넌트로 어떻게 안전하고 효율적으로 전달할 것인지 고민이 필요했습니다. <br>
이를 위해 Next.js의 API 라우트를 활용해 중간 처리 로직을 구현했습니다.

보안 키 관리
API Key는 절대 클라이언트에 노출되어선 안 되기 때문에, 서버에서만 접근할 수 있도록 환경 변수로 안전하게 관리했습니다.<br>
이 과정에서 키를 어떻게 구조적으로 숨길지, 어떤 방식으로 안전하게 활용할지에 대한 이해도 함께 쌓을 수 있었습니다.

결론적으로, Platform.OpenAI처럼 서버와 클라이언트가 명확히 분리되는 시스템에서는 초기 아키텍처 설계가 곧 보안과 유지보수의 핵심이라는 것을 실감했습니다.
