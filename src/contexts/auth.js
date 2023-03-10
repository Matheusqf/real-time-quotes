import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [isUserActive, setIsUserActive] = useState(true);
  const location = window.location.href;

  useEffect(() => {
    let timeoutId;

    function resetTimeout() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsSessionExpired(true);
        if (location.includes("/home")) {
          // Set user inactive after 1 minute without movement
          setIsUserActive(false);
        }
      }, 60 * 1000);
    }

    resetTimeout();
    document.addEventListener("mousemove", resetTimeout);
    document.addEventListener("keypress", resetTimeout);
    document.addEventListener("touchstart", resetTimeout);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousemove", resetTimeout);
      document.removeEventListener("keypress", resetTimeout);
      document.removeEventListener("touchstart", resetTimeout);
    };
  }, []);

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    const usersStorage = localStorage.getItem("users_db");

    if (userToken && usersStorage) {
      const hasUser = JSON.parse(usersStorage)?.filter(
        (user) => user.email === JSON.parse(userToken).email
      );

      if (hasUser[0]) setUser(hasUser[0]);
    }
  }, []);

  const isValidEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const signin = (email, password) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_db"));

    const hasUser = usersStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        setUser({ email, password });
        setIsUserActive(true);
        return;
      } else {
        return "E-mail ou senha incorretos";
      }
    } else {
      return "Usu??rio n??o cadastrado";
    }
  };

  const signup = (email, password) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_db"));

    const hasUser = usersStorage?.filter((user) => user.email === email);

    if (!isValidEmail(email)) {
      return "Digite um email v??lido";
    }

    if (hasUser?.length) {
      return "J?? existe uma conta cadastrada com esse e-mail";
    }

    let newUser;

    if (usersStorage) {
      newUser = [...usersStorage, { email, password }];
    } else {
      newUser = [{ email, password }];
    }

    localStorage.setItem("users_db", JSON.stringify(newUser));

    return;
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signed: !!user,
        signin,
        signup,
        signout,
        isUserActive,
        setIsSessionExpired,
        isSessionExpired,
        setIsUserActive,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
