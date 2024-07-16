import Image from "next/image";

export const Navbar: React.FC = () => {
  return (
    <div>
      {/* <TodoList /> */}
      <div className="w-full flex flex-row px-[64px] py-[24px] justify-between items-center border-b-[1px] border-b-[#E4E4E7]">
        <div className="flex flex-row gap-[16px]">
          <Image
            alt="brandmark"
            src={"/brandmark.svg"}
            height={24}
            width={23.04}
          ></Image>
          <h1 className="text-[24px] font-[700] leading-[32px]">Vidpod</h1>
        </div>

        <div className="flex flex-row gap-[32px]">
          <Image
            alt="settings"
            src={"/settings.svg"}
            height={20}
            width={20}
          ></Image>

          <Image
            alt="bell-dot"
            src={"/bell-dot.svg"}
            height={20}
            width={20}
          ></Image>

          <div className="w-[206px] h-[56px] border-[1px] border-[#E4E4E7] rounded-[8px] flex flex-row gap-[8px] items-center px-[16px]">
            <div className="size-[32px] overflow-hidden rounded-full flex">
              <img src="/image.png" className="object-cover size-full"></img>
            </div>

            <h1 className="text-[16px] font-[700] leading-[24px] text-[#27272A]">Emma Warren</h1>

            <Image
              alt="chevron-down"
              src={"/chevron-down.svg"}
              height={16}
              width={16}
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
};
