import { videoLengthState } from "@/store/videoState";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import WaveSurfer from "wavesurfer.js";

interface WaveComponentProps {
  audioFile: string; 
}

export const WaveComponent: React.FC<WaveComponentProps> = ({
  audioFile,
}) => {
  const waveFormRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [videoLengthSeconds, setVideoLengthSeconds] =
    useRecoilState(videoLengthState);
  const timeLineLength = videoLengthSeconds * 1.5;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (waveFormRef.current && !wavesurferRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveFormRef.current,
        waveColor: "#ffffff", 
        progressColor: "#ffffff", 
        barWidth: 2, 
        barHeight: 1, 
        height: 140, 
        barGap: 5,
      });
    }

    let isMounted = true;

    if (wavesurferRef.current && audioFile) {
      wavesurferRef.current.load(audioFile).then(() => {
        if (isMounted) {
          setIsLoaded(true);
        }
      });
    }

    return () => {
      isMounted = false;
      if (wavesurferRef.current && isLoaded) {
        wavesurferRef.current.destroy();
      }
    };
  }, [audioFile, isLoaded])

  return (
    <div>
      <div ref={waveFormRef} style={{ width: `${timeLineLength}px`, height: "100px" }} />
    </div>
  );
};