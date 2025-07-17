"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { doctorAgent } from "../../_components/DoctorAgentCard";
import { Circle, Loader, PhoneCall, PhoneOff } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";


export type MedicalReport = {
  sessionId: string;
  agent: string;
  user: string;
  timestamp: string;
  chiefComplaint: string;
  summary: string;
  symptoms: string[];
  duration: string;
  severity: string;
  medicationsMentioned: string[];
  recommendations: string[];
};

export type SessionDetail = {
  id: number;
  notes: string;
  sessionId: string;
  report: MedicalReport;
  selectedDoctor: doctorAgent;
  createdOn: string;
  
};

type messages = {
  role: string;
  text: string;
};

function MedicalVoiceAgent() {
  const { sessionId } = useParams();
  const [sessionDetail, setSessionDetail] = useState<SessionDetail>();
  const [callStarted, setCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<any>();
  const [currentRole, setCurrentRole] = useState<string | null>();
  const [liveTranscript, setLiveTranscript] = useState<string>();
  const [messages, setMessages] = useState<messages[]>([]);
  const [loading,setLoading]=useState(false);
  const router=useRouter();

  useEffect(() => {
    sessionId && GetSessionDetails();
  }, [sessionId]);

  const GetSessionDetails = async () => {
    const result = await axios.get("/api/session-chat?sessionId=" + sessionId);
    console.log(result.data);
    setSessionDetail(result.data);
  };

  const StartCall = () => {
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setVapiInstance(vapi);
    var api_key:(string | undefined);
    if(sessionDetail?.selectedDoctor?.id == 1){
      api_key=process.env.NEXT_PUBLIC_VAPI_GENERAL_PHYSICIAN_ID;
    }
    else if(sessionDetail?.selectedDoctor?.id == 2){
      api_key=process.env.NEXT_PUBLIC_VAPI_PEDIATRICIAN_ID;
    }
    else if(sessionDetail?.selectedDoctor?.id == 3){
      api_key=process.env.NEXT_PUBLIC_VAPI_DERMATOLOGIST_ID;
    }
    else if(sessionDetail?.selectedDoctor?.id == 4){
      api_key=process.env.NEXT_PUBLIC_VAPI_PSYCHOLOGIST_ID;
    }
    else if(sessionDetail?.selectedDoctor?.id == 5){
      api_key=process.env.NEXT_PUBLIC_VAPI_NUTRITIONIST_ID;
    }
    else if(sessionDetail?.selectedDoctor?.id == 6){
      api_key=process.env.NEXT_PUBLIC_VAPI_CARDIOLOGIST_ID;
    }
    else if(sessionDetail?.selectedDoctor?.id == 7){
      api_key=process.env.NEXT_PUBLIC_VAPI_ENT_ID;
    }
    else if(sessionDetail?.selectedDoctor?.id == 8){
      api_key=process.env.NEXT_PUBLIC_VAPI_ORTHOPEDIC_ID;
    }
    else if(sessionDetail?.selectedDoctor?.id == 9){
      api_key=process.env.NEXT_PUBLIC_VAPI_GYNECOLOGIST_ID;
    }
    else if(sessionDetail?.selectedDoctor?.id == 10){
      api_key=process.env.NEXT_PUBLIC_VAPI_DENTIST_ID;
    }
    

    const VapiAgentConfig={
      name: "AI Medical Assistant",
      firstMessage:"Hi there! I'm your AI Medical Assistant. I'm here to help you with any health questions or concerns you might have today. How are you feeling?",
      transcriber:{
        provider:'assembly-ai',
        language:'en'
      },
      voice:{
        provider: 'playht',
        voiceId: sessionDetail?.selectedDoctor?.voiceId ?? "s3://default-voice-id"
      },
      model:{
        provider:'google',
        model:'gemini-2.5-flash',
        messages:[
          {
            role:'system',
            content: sessionDetail?.selectedDoctor?.agentPrompt
          }
        ]
      }
    }
    vapi.on("error", (error: any) => {
      console.error("Vapi Error:", error);
      alert("Something went wrong: " + (error?.message || "Unknown error"));
    });

    vapi.start(api_key);
    //@ts-ignore
    //vapi.start(VapiAgentConfig);
    vapi.on("call-start", () => {
      console.log("Call started");
      setCallStarted(true);
    });
    vapi.on("call-end", () => {
      console.log("Call ended");
      setCallStarted(false);
    });
    vapi.on("message", (message) => {
      if (message.type === "transcript") {
        const { role, transcriptType, transcript } = message;
        console.log(`${message.role}: ${message.transcript}`);
        if (transcriptType == "partial") {
          setLiveTranscript(transcript);
          setCurrentRole(role);
        } else if (transcriptType == "final") {
          //Final Transcript
          setMessages((prev: any) => [
            ...prev,
            { role: role, text: transcript },
          ]);
          setLiveTranscript("");
          setCurrentRole(null);
        }
      }
    });

    vapi.on("speech-start", () => {
      console.log("Assisstent started speaking");
      setCurrentRole("assistant");
    });
    vapi.on("speech-end", () => {
      console.log("Assisstent stopped speaking");
      setCurrentRole("user");
    });
  };

  const endCall = async() => {
    setLoading(true);
    const result=await GenerateReport();
    setLoading(false);
    if (!vapiInstance) return;

    vapiInstance.stop();

    vapiInstance.removeAllListeners();

    setCallStarted(false);
    setVapiInstance(null);
    toast.success('Your report is generated!')
    router.replace('/dashboard')

    

  };

  const GenerateReport=async()=>{
    const result=await axios.post('/api/medical-report',{
      messages:messages,
      sessionDetail:sessionDetail,
      sessionId:sessionId
    })

    console.log(result.data);
    return result.data;
  }

  return (
    <div className="mx-20 pt-20 pb-10 px-10 md:px-14 lg:px-28 ">
      <div className="p-10 border bg-secondary rounded-3xl">
        <div className="flex justify-between items-center">
          <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center">
            <Circle
              className={`h-4 w-4 rounded-full  ${
                callStarted ? "bg-green-500" : "bg-red-500"
              }`}
            />
            {callStarted ? "Connected" : "Not Connected"}
          </h2>
          <h2 className="font-semibold text-xl text-gray-500">00:00</h2>
        </div>
        {sessionDetail && (
          <div className="flex items-center flex-col mt-10">
            <Image
              src={sessionDetail?.selectedDoctor?.image}
              alt={sessionDetail?.selectedDoctor?.specialist ?? ""}
              width={120}
              height={120}
              className="h-[100px] w-[100px] object-cover rounded-full"
            />
            <h2 className="mt-2 text-lg">
              {sessionDetail?.selectedDoctor?.specialist}
            </h2>
            <p className="text-sm text-gray-400">AI Medical Assistant</p>

            <div className="mt-24 text-center overflow-y-auto flex flex-col items-center px-10 md:px-24 lg:px-48 xl:px-64">
              {messages?.slice(-4).map((msg:messages, index) => (
                
                  <h2 className="text-gray-400 p-2" key={index}>{msg.role}: {msg.text}</h2>
                
              ))}

              {liveTranscript && liveTranscript?.length > 0 && (
                <h2 className="text-gray-600">
                  {currentRole}: {liveTranscript}
                </h2>
              )}
            </div>
            {!callStarted ? (
              <Button 
              className="mt-28 cursor-pointer" 
              onClick={StartCall} 
              disabled={loading}>
                {loading ? <Loader className='animate-spin' /> : <PhoneCall />} Start Call
              </Button>
            ) : (
              <Button
                variant={"destructive"}
                className="mt-28 cursor-pointer"
                onClick={endCall}
                disabled={loading}
              >
                {loading ? <Loader className='animate-spin' /> : <PhoneOff />} Disconnect
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MedicalVoiceAgent;
