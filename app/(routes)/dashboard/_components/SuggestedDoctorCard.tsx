import React from "react";
import { doctorAgent } from "./DoctorAgentCard";
import Image from "next/image";

type props = {
  doctorAgent: doctorAgent;
  setSelectedDoctor: any;
  selectedDoctor: doctorAgent
};
function SuggestedDoctorCard({
  doctorAgent,
  setSelectedDoctor,
  selectedDoctor,
}: props) {
  return (
    <div
      className={`flex  gap-2 flex-col items-center text-center justify-center p-3 bg-white  cursor-pointer rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 hover:bg-slate-100  ${
        selectedDoctor?.id === doctorAgent?.id
          && 'border border-blue-500'}`}
      onClick={() => setSelectedDoctor(doctorAgent)}
    >
      <Image
        src={doctorAgent?.image}
        alt={doctorAgent?.specialist}
        width={70}
        height={70}
        className="w-[60px] h-[60px] rounded-full object-cover"
      />
      <h2 className="font-bold text-sm">{doctorAgent?.specialist}</h2>
      <p className="text-xs line-clamp-2">{doctorAgent?.description}</p>
    </div>
  );
}

export default SuggestedDoctorCard;
