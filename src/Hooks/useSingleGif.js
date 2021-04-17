import { useEffect, useState } from "react";
import { getSingleGif } from "services/gifServices";

const useSingleGif = ({ id }) => {
  const [gif, setGif] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSingleGif({ id }).then((gif) => {
      setIsLoading(false);
      setGif(gif);
    });
  }, [id]);

  return { isLoading, gif };
};

export default useSingleGif;
