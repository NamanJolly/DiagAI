"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconBoxAlignRightFilled,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { motion } from "motion/react";


export function FeatureGrid() {
  return (
    <BentoGrid className="mt-20 max-w-4xl mx-auto md:auto-rows-[20rem] mb-20">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn("[&>p:text-lg]", item.className)}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}

const SkeletonOne = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-white dark:bg-black"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
      >
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
      </motion.div>
    </motion.div>
  );
};
const SkeletonTwo = () => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      width: ["0%", "100%"],
      transition: {
        duration: 2,
      },
    },
  };
  const arr = new Array(6).fill(0);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      {arr.map((_, i) => (
        <motion.div
          key={"skelenton-two" + i}
          variants={variants}
          style={{
            maxWidth: Math.random() * (100 - 40) + 40 + "%",
          }}
          className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-neutral-100 dark:bg-black w-full h-4"
        ></motion.div>
      ))}
    </motion.div>
  );
};
const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2"
      style={{
        background:
          "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
      }}
    >
      <motion.div className="h-full w-full rounded-lg"></motion.div>
    </motion.div>
  );
};
const SkeletonFour = () => {
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
    >
      <motion.div
        variants={first}
        className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <img
          src="data:image/png;base64,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"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-11 w-11"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          AI can’t be empathetic... right?
        </p>
        <p className="border border-red-500 bg-red-100 dark:bg-red-900/20 text-red-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Doubtful
        </p>
      </motion.div>
      <motion.div className="h-full relative z-20 w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center">
        <img
          src="data:image/png;base64,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"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-11 w-11"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          I just told the bot my symptoms, and it knew what to ask next!
        </p>
        <p className="border border-green-500 bg-green-100 dark:bg-green-900/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Impressed
        </p>
      </motion.div>
      <motion.div
        variants={second}
        className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <img
          src="data:image/png;base64,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"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-11 w-11"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          I don’t trust anything without a stethoscope.
        </p>
        <p className="border border-orange-500 bg-orange-100 dark:bg-orange-900/20 text-orange-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Suspicious
        </p>
      </motion.div>
    </motion.div>
  );
};
const SkeletonFive = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2  items-start space-x-2 bg-white dark:bg-black"
      >
        <img
          src="data:image/png;base64,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"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
        <p className="text-xs text-neutral-500">
          My eye’s been twitching. Could be stress... or a ghost?!
        </p>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
      >
        <p className="text-xs text-neutral-500">Likely stress. Ghost detection is still in beta.</p>
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0" />
      </motion.div>
    </motion.div>
  );
};
const items = [
  {
    title: "Capture Every Word",
    description: (
      <span className="text-sm">
        AI transcribes doctor-patient dialogues in real-time.
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Clinical Accuracy Assurance",
    description: (
      <span className="text-sm">
        Checks for Consistency and Accuracy in Clinical Notes
      </span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Contextual Medical Insights",
    description: (
      <span className="text-sm">
        Personalized care suggestions driven by patient-provider discussions.
      </span>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Sentiment-Aware Monitoring",
    description: (
      <span className="text-sm">
        AI picks up patient feelings to guide better responses.
      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },

  {
    title: "Diagnosis Snapshot",
    description: (
      <span className="text-sm">
        Automatically distills conversations into actionable insights
      </span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];
