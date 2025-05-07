import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user from localStorage on mount
    const storedUser = localStorage.getItem("user");
    console.log(storedUser,"+++++++++=================")
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    console.log(userData)
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
