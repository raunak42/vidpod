import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface MarkerProps {
  left: number;
  onDrag: (id: number, newLeft: number) => void;
  id: number;
}

export const Marker: React.FC<MarkerProps> = ({ left, onDrag, id }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startLeft, setStartLeft] = useState(left);
  const markerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newLeft = startLeft + e.clientX - startX;
      onDrag(id, newLeft);
      console.log(`Marker ${id} distance from left: ${newLeft}px`);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, startX, startLeft, onDrag, id]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartLeft(left);
  };

  return (
    <div
      ref={markerRef}
      className={`p-[8px] w-[50px] z-10 h-full rounded-[6px] bg-[#86EFAC] cursor-pointer absolute flex flex-col items-center justify-end`}
      style={{ left: `${left}px` }}
      onMouseDown={handleMouseDown}
    >
      <Image
        draggable={false}
        alt="img"
        width={16}
        height={16}
        src={"/grip-green.svg"}
      />
    </div>
  );
};
