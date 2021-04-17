import UserContext from "context/user/userContext";
import { useContext, useState } from "react";

const useUser = () => {
  const [isLoading, setIsloading] = useState(false);
  const { login, isLogged, logout, error, logUp } = useContext(UserContext);

  const logIn = ({ email, password }) => {
    setIsloading(true);
    return login({ email, password }).then(() => {
      setIsloading(false);
      return true;
    });
  };
  return { login, isLogged, logIn, error, isLoading, logout, logUp };
};

export default useUser;
