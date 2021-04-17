import { useCallback, useRef, useState } from "react";

const useNearScreen = () => {
  const [isNearScreen, setIsNearScreen] = useState(false);
  const [page, setPage] = useState(0);
  const observer = useRef();
  const elementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setIsNearScreen(true);
          setPage((page) => page + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [setIsNearScreen]
  );
  return { isNearScreen, elementRef, page };
};

export default useNearScreen;
