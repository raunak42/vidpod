import { VideoPlayer } from "./VideoPlayer";

export const VideoCard: React.FC = () => {
  return (
    <div className="  w-full h-[500px] border-[1px] border-[#E4E4E7] rounded-[16px] shadow-sm p-[32px] flex flex-col items-center justify-center">
      <VideoPlayer />
    </div>
  );
};
