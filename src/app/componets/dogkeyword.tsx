'use client'

import { useState } from "react"


export default function DogKeyWordPage() {
    const [dogkeyWords, setDogKeyWords] =  useState();
    return (
        <div>
            <h3>강아지 이름</h3>
            <input type="text" placeholder="강아지 이름을 입력 해주세요" style={{ border: '1px solid #999' }} />
            <h3 style={{ marginTop: '40px' }}>강아지 성별</h3>
            <ul>
                <li style={{ border: '1px solid #999' }}><button >♂</button></li>
                <li style={{ border: '1px solid #999' }}><button>♀</button></li>
            </ul>
            <h3 style={{ marginTop: '40px' }}>강아지 성격</h3>
            <ul>
                <li><button style={{ border: '1px solid #999' }}>데이터 값</button></li>
                <li><button style={{ border: '1px solid #999' }}>데이터 값</button></li>
                <li><button style={{ border: '1px solid #999' }}>데이터 값</button></li>
                <li><button style={{ border: '1px solid #999' }}>데이터 값</button></li>
                <li><button style={{ border: '1px solid #999' }}>데이터 값</button></li>
                <li><button style={{ border: '1px solid #999' }}>데이터 값</button></li>
            </ul>
        </div>
    )
}