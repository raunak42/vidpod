import Image from "next/image";

export const AdMarkersCard: React.FC = () => {
  return (
    <div className="flex flex-col p-[32px] w-[412px] border-[1px] border-[#E4E4E7] rounded-[16px] shadow-sm">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-[700] text-[16px] leading-[24px] text-[#27272A]">
          Ad markers
        </h1>
        <h1 className="font-[600] text-[16px] leading-[24px] text-[#71717A]">
          3 markers
        </h1>
      </div>

      <div className="w-full h-[40px] py-[8px] px-[16px] rounded-md bg-[#18181B] flex gap-2 items-center justify-center">
        <h1 className="font-[600] text-[14px] leading-[20px] text-[#FAFAFA]">
          Create ad marker
        </h1>
        <Image alt="plus" src={"/plus.svg"} height={16} width={16}></Image>
      </div>

      <div className="w-full h-[40px] py-[8px] px-[16px] rounded-md bg-[#ffffff] flex gap-2 items-center justify-center border-[1px] border-[#E4E4E7]">
        <h1 className="font-[600] text-[14px] leading-[20px] text-[#18181B]">
          Automatically place
        </h1>
        <Image
          alt="magic-wand"
          src={"/magic-wand.svg"}
          height={16}
          width={16}
        ></Image>
      </div>
    </div>
  );
};
