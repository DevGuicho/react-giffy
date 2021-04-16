import React, { Suspense, useCallback, useRef, useState } from "react";
import Spinner from "../Spinner";
import "./TrendingSearches.css";

const TrendingSearches = React.lazy(() => import("./TrendingSearches"));

export default function LazyTrending() {
  /* const { isNearScreen, fromRef } = useNearScreen({
    distance: "0px",
  }); */

  const [isNearScreen, setIsNearScreen] = useState(false);
  const observer = useRef();
  const lastBookElementRef = useCallback(
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

  return (
    <section className="TrendingSearches" ref={lastBookElementRef}>
      <Suspense fallback={<Spinner />}>
        {isNearScreen ? <TrendingSearches /> : <Spinner />}
      </Suspense>
    </section>
  );
}
