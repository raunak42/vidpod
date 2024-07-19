import Image from "next/image";

export const Navbar: React.FC = () => {
  return (
    <div>
      {/* <TodoList /> */}
      <div className="w-full flex flex-row px-[64px] py-[24px] justify-between items-center border-b-[1px] border-b-[#E4E4E7]">
        <button className="flex flex-row gap-[16px]">
          <Image
            alt="brandmark"
            src={"/brandmark.svg"}
            height={24}
            width={23.04}
          ></Image>
          <h1 className="text-[24px] font-[700] leading-[32px]">Vidpod</h1>
        </button>

        <div className="flex flex-row gap-[32px]">
          <button>
            <Image
              alt="settings"
              src={"/settings.svg"}
              height={20}
              width={20}
            ></Image>
          </button>
          <button>
            <Image
              alt="bell-dot"
              src={"/bell-dot.svg"}
              height={20}
              width={20}
            ></Image>
          </button>

          <button className="w-[206px] h-[56px] border-[1px] border-[#E4E4E7] rounded-[8px] flex flex-row justify-between items-center px-[16px]">
            <div className="size-[32px] overflow-hidden rounded-full flex">
              <Image width={62} height={64} alt="img" src="/image.png" className="object-cover size-full"></Image>
            </div>

            <h1 className="text-[16px] font-[700] leading-[24px] text-[#27272A]">
              Emma Warren
            </h1>

            <Image
              alt="chevron-down"
              src={"/chevron-down.svg"}
              height={16}
              width={16}
            ></Image>
          </button>
        </div>
      </div>
    </div>
  );
};
