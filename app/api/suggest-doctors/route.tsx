import { openai } from "@/config/OpenAiModel";
import { AIDoctorAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {notes}=await req.json();
  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-exp:free",
      messages: [
        {role: "system", content: JSON.stringify(AIDoctorAgents)},
        { role: "user", content: "User Notes/Symptoms: " + notes + "Depending on user notes and symptoms, please suggest list of doctors, return object in JSON only." }],
    });

    const rawResp=completion.choices[0].message.content || '';
    //@ts-ignore
    const Resp=rawResp.trim().replace('```json','').replace('```','');
    const JSONResp=JSON.parse(Resp);
    return NextResponse.json(JSONResp);
  } catch (e) {
    return NextResponse.json(e);
  }
}