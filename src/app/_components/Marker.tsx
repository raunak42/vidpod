import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { trpc } from "../_trpc/client";
import { useRecoilState } from "recoil";
import { adTypeState } from "@/store/adMarkerState";
import { Toaster, toast } from "sonner";


interface MarkerProps {
  left: number;
  onDrag: (id: number, newLeft: number) => void;
  id: number;
}

export const Marker: React.FC<MarkerProps> = ({ left, onDrag, id }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const markerRef = useRef<HTMLDivElement>(null);
  const [adTypeData, setAdtypeData] = useRecoilState(adTypeState);


  const editMarker = trpc.editMarker.useMutation();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !markerRef.current) return;
      const container = markerRef.current.parentElement;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      let newLeft = (e.clientX - containerRect.left - dragOffset);

      newLeft = Math.max(
        0,
        Math.min(newLeft, containerRect.width - markerRef.current.offsetWidth)
      );

      onDrag(id, newLeft);
    };

    const handleMouseUp = async (e: MouseEvent) => {
      if (!isDragging || !markerRef.current) return;
      const container = markerRef.current.parentElement;
      if (!container) return;

      setIsDragging(false);
      const containerRect = container.getBoundingClientRect();
      let newLeft = e.clientX - containerRect.left - dragOffset;

      newLeft = Math.max(
        0,
        Math.min(newLeft, containerRect.width - markerRef.current.offsetWidth)
      );

      const result = await editMarker.mutateAsync({
        markerId: id,
        newStart: newLeft/1.5,
        adType: "Auto",
      });
      toast.success("Marker set to new position.")
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, onDrag, id, dragOffset]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!markerRef.current) return;
    const markerRect = markerRef.current.getBoundingClientRect();
    setDragOffset(e.clientX - markerRect.left);
    setIsDragging(true);
  };

  return (
    <div
      ref={markerRef}
      className={`p-[8px] w-[50px] z-10 h-full rounded-[6px] bg-[#86EFAC] cursor-pointer absolute flex flex-col items-center justify-between`}
      style={{ left: `${left}px` }}
      onMouseDown={handleMouseDown}
    >
      <Image
        draggable={false}
        alt="img"
        width={16}
        height={16}
        src={"/marker-auto.svg"}
      />
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
