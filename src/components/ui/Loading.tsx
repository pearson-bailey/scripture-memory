import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";

export default function Loading() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const container = document.querySelector(".loadingContainer");
    const containerWidth = container
      ? (container as HTMLElement).offsetWidth
      : 0;
    const animateLoader = async () => {
      await animate(
        [
          [scope.current, { x: 0, width: "100%" }],
          [scope.current, { x: containerWidth, width: "0%" }, { delay: 0.01 }],
        ],
        {
          duration: 2.5,
          repeat: Infinity,
          repeatDelay: 0.01,
        }
      );
    };
    animateLoader();
  }, []);

  return (
    <div className="loadingContainer relative -skew-x-6 w-fit">
      <motion.div ref={scope} className="absolute h-full bg-teal-600" />
      <h1 className="flex justify-center items-center mx-4 my-2 whitespace-nowrap mix-blend-screen">
        <span className="text-4xl text-center text-foreground">loading</span>
      </h1>
    </div>
  );
}
