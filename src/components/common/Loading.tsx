import { useEffect, useState } from "react";

export default function Loading({ loadingTime }: { loadingTime: number }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, loadingTime);
  });
  
  return (
    <>
      {isLoading ? (
        <div className="z-[20000] text-green-600 h-screen w-full absolute top-0 left-0 flex justify-center items-center">
          <span className="loading loading-bars loading-lg "></span>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
