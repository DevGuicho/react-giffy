import React, { lazy, Suspense } from "react";
import Spinner from "components/Spinner";
import useNearScreen from "Hooks/useNearScreen";

const LazyListOfTrendings = lazy(() => import("./ListOfTrendings"));

const ListOfTrendings = () => {
  const { isNearScreen, elementRef } = useNearScreen();

  return (
    <section className="ListOfTrendings" ref={elementRef}>
      <Suspense fallback={<Spinner />}>
        {isNearScreen ? <LazyListOfTrendings /> : <Spinner />}
      </Suspense>
    </section>
  );
};

export default ListOfTrendings;
