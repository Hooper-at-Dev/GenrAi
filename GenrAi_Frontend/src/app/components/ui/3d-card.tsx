"use client";

import React, {
  useState,
  useRef,
  ReactNode,
  ElementType,
  MouseEvent,
  ComponentPropsWithoutRef,
} from "react";
import { cn } from "@/app/utils/utils";

interface CardContainerProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: CardContainerProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setMousePosition({ x, y });

    const shineElement = containerRef.current.querySelector(".card-shine") as HTMLElement | null;
    if (shineElement) {
      const shineDeg = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI);
      shineElement.style.setProperty("--shine-deg", `${shineDeg}deg`);
    }
  };

  return (
    <div
      className={cn("relative perspective-1000px group/card", containerClassName)}
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute -inset-[1px] rounded-xl opacity-0 group-hover/card:opacity-30 transition-opacity duration-500 bg-gradient-to-tr from-purple-500 to-blue-500 blur-[2px]"
        style={{
          transform: isHovered
            ? `rotateY(${(mousePosition.x - 0.5) * 30}deg) rotateX(${(mousePosition.y - 0.5) * -30}deg)`
            : "rotateY(0deg) rotateX(0deg)",
          transformStyle: "preserve-3d",
        }}
      />
      <div
        className={cn(
          "card-container card-shine relative transition-all duration-200 ease-out w-full h-full bg-black/80 backdrop-blur-sm rounded-xl border border-white/10",
          className
        )}
        style={{
          transform: isHovered
            ? `rotateY(${(mousePosition.x - 0.5) * 30}deg) rotateX(${(mousePosition.y - 0.5) * -30}deg)`
            : "rotateY(0deg) rotateX(0deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </div>
  );
};


interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export const CardBody = ({ children, className }: CardBodyProps) => {
  return <div className={cn("relative w-full h-full p-6", className)}>{children}</div>;
};


type CardItemProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  href?: string;
} & ComponentPropsWithoutRef<T>;

export const CardItem = <T extends ElementType = "div">({
  as,
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  href,
  ...rest
}: CardItemProps<T>) => {
  const Tag = as || "div";

  return (
    <Tag
      className={cn("card-item transform-gpu transition-transform duration-300", className)}
      style={{
        transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
        transition: "transform 200ms ease-out",
      }}
      {...(href ? { href } : {})}
      {...rest}
    >
      {children}
    </Tag>
  );
};
