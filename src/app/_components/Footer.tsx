import Image from "next/image";

export const Footer: React.FC = () => {
  return (
    <div className="w-full border-t-[1px] border-[#E4E4E7] px-[64px] py-[36px] flex flex-row items-center justify-between">
      <h1 className="font-[600] text-[16px] leading-[24px] text-[#71717A]">
        Video first podcasts
      </h1>
      <div className="flex flex-row gap-[16px]">
        <Image
          alt="brandmark"
          src={"/brandmark.svg"}
          height={24}
          width={23.04}
        ></Image>
        <h1 className="text-[24px] font-[700] leading-[32px]">Vidpod</h1>
      </div>
    </div>
  );
};
