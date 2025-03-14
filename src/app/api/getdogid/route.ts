import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { dataSelect, dogDatas } from "../../../../lib/db";

export async function GET(req: NextRequest) {
    try {
      const url = new URL(req.url);
      const dogId = url.searchParams.get('dogId'); 

      console.log(dogId);
        return NextResponse.json(dogId);
    } catch (error) {
        console.error("Error calling OpenAI API:", error);
        return NextResponse.json({ error: "api key error" }, { status: 500 });
    }
}