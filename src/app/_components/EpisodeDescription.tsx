import Image from "next/image";

export const EpisodeDescription: React.FC = () => {
  return (
    <div className="flex flex-col gap-[16px] w-[50%]">
      <div className="flex flex-row items-center gap-1">
        <Image
          alt="arrowLeft"
          src={"/arrowLeft.svg"}
          height={14}
          width={14}
        ></Image>
        <h1 className="font-[600] text-[14px] leading-[20px] text-[#71717A]">
          Ads
        </h1>
      </div>

      <h1 className="font-[700] text-[30px] leading-[36px] text-[#27272A]">
      Does questioning reality lead you to madness? | Donald Hoffman and Lex Fridman
      </h1>

      <h1 className="font-[600] text-[16px] leading-[24px] text-[#71717A]">
        Episode 503 • 12 April 2024
      </h1>
    </div>
  );
};
