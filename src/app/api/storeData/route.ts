// pages/api/storeData.ts (타입스크립트 파일로 변경)
import { NextApiRequest, NextApiResponse } from 'next';

export default async function storeData(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { data } = req.body;  // 클라이언트에서 보낸 dogid 값

    // 여기에서 data를 처리합니다.
    console.log("받은 데이터:", data);

    // 예시로 받은 데이터를 그대로 응답으로 보냄
    return res.status(200).json({ message: '데이터가 성공적으로 저장되었습니다.', dogId: data });
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
