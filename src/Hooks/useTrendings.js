import axios from "axios";
import { useEffect, useState } from "react";

const useTrendings = () => {
  const [ListOfTrendings, setListOfTrendings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios({
      method: "GET",
      url: `https://api.giphy.com/v1/trending/searches?api_key=${process.env.REACT_APP_API_KEY}`,
    }).then((response) => {
      setListOfTrendings(response.data.data);
      setIsLoading(false);
      return response.data.data;
    });
  }, []);

  return { ListOfTrendings, isLoading };
};

export default useTrendings;
