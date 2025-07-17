"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Textarea } from "@/components/ui/textarea";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import DoctorAgentCard, { doctorAgent } from "./DoctorAgentCard";
import { ArrowRight, Loader2 } from "lucide-react";
import SuggestedDoctorCard from "./SuggestedDoctorCard";
import { useRouter } from "next/navigation";

type AddNewSessionProps = {
  children?: React.ReactNode;
};
function AddNewSession({ children }: AddNewSessionProps) {
  const [note, setNote] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>();
  const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent>();
  const router=useRouter();

  const OnClickNext = async () => {
    setLoading(true);
    const result = await axios.post("/api/suggest-doctors", {
      notes: note,
    });

    console.log(result.data);
    setSuggestedDoctors(result.data);
    setLoading(false);
  };

  const onStartConsultation = async () => {
    setLoading(true);
    const result = await axios.post("/api/session-chat", {
      notes: note,
      selectedDoctor: selectedDoctor,
    });
    console.log(result.data);
    if (result.data?.sessionId) {
      console.log(result.data.sessionId);
      router.push(`/dashboard/medical-agent/${result.data.sessionId}`);
    }
    setLoading(false);
  };
  

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children??
        (<InteractiveHoverButton className="mt-2">
          Start a Consultation
        </InteractiveHoverButton>)}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="ml-2 mb-3">
            {suggestedDoctors ? (
              <div>Ai Smart Suggestion</div>
            ) : (
              <div>Add Basic Details</div>
            )}
          </DialogTitle>
          <DialogDescription asChild>
            {!suggestedDoctors ? (
              <div>
                <h2 className="p-2 pt-1 pb-3">
                  Add Symptoms/ Relevent Details
                </h2>
                <Textarea
                  placeholder="Describe your symptoms..."
                  className="h-[100px]"
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-5">
                {suggestedDoctors.map((doctor, index) => (
                  <SuggestedDoctorCard
                    key={index}
                    doctorAgent={doctor}
                    setSelectedDoctor={() => setSelectedDoctor(doctor)}
                    //@ts-ignore
                    selectedDoctor={selectedDoctor}
                  />
                ))}
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button
              variant="outline"
              className="text-gray-600 cursor-pointer px-7"
            >
              CLOSE
            </Button>
          </DialogClose>
          {!suggestedDoctors ? (
            <ShinyButton
              disabled={!note || loading}
              onClick={() => OnClickNext()}
            >
              <div className="flex items-center gap-2">
                <span>Next</span>
                {loading ? (
                  <Loader2 className="animate-spin h-4 w-4" />
                ) : (
                  <div>➺</div>
                )}
              </div>
            </ShinyButton>
          ) : (
            <ShinyButton 
            disabled={loading || !selectedDoctor}
            onClick={() => onStartConsultation()}>
              <div className="flex items-center gap-2">
                <span>Start Now</span>
                {loading ? (
                  <Loader2 className="animate-spin h-4 w-4" />
                ) : (
                  <div>➺</div>
                )}
              </div>
            </ShinyButton>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewSession;
