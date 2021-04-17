import { useCallback, useRef, useState } from "react";

const useNearScreen = () => {
  const [isNearScreen, setIsNearScreen] = useState(false);
  const observer = useRef();
  const elementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setIsNearScreen(true);
        }
      });
      if (node) observer.current.observe(node);
    },
    [setIsNearScreen]
  );
  return { isNearScreen, elementRef };
};

export default useNearScreen;
