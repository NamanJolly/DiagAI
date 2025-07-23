import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { IconArrowRight } from "@tabler/icons-react";
import AddNewSession from "./AddNewSession";
export type doctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
  voiceId?: string;
  subscriptionRequired: boolean;
};
type props = {
  doctorAgent: doctorAgent;
};

function DoctorAgentCard({ doctorAgent }: props) {
  return (
    // <div className=" rounded-xl mb-10">
    //   <Image
    //     src={doctorAgent.image}
    //     alt={doctorAgent.specialist}
    //     width={200}
    //     height={300}
    //     className="w-full h-[260px] object-cover rounded-xl"
    //   />
    //   <div className="m-1">
    //     <h2 className="font-bold">{doctorAgent.specialist}</h2>
    //     <p className="line-clamp-2 text-sm text-gray-500">
    //       {doctorAgent.description}
    //     </p>
        
    //   </div>
    // </div>


    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[14rem] h-auto rounded-xl p-2 border -mb-12 ">

        
        <CardItem translateZ="100" className="w-full rounded-xl mb-2">
          <Image
        src={doctorAgent.image}
        alt={doctorAgent.specialist}
        width={200}
        height={300}
        className="w-full h-[260px] object-cover rounded-xl"
      />
        </CardItem>
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {doctorAgent.specialist}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 line-clamp-2 text-sm max-w-sm mt-1 mb-2 dark:text-neutral-300"
        >
          {doctorAgent.description}
        </CardItem>
        {/* <div className="flex justify-between items-center mt-20"> */}
          {/* <CardItem
            translateZ={20}
            as="a"
            href="https://twitter.com/mannupaaji"
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Try now →
          </CardItem> */}
          <AddNewSession>
          <CardItem
            translateZ={20}
            as="button"
            
            className="px-4 cursor-pointer py-2 rounded-2xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold "
          >
            Consult ➺
          </CardItem>
          </AddNewSession>
        {/* </div> */}
      </CardBody>
    </CardContainer>
  );
}

export default DoctorAgentCard;




