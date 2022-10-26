import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.util";

// as the actual value you want to access:
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});
//The actual component
export const UserProvider = ({ children }) => {
  //accessing the values of the state changes
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  //signOutUser();

  useEffect(() => {
    const usubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return usubscribe;
  }, []);
  //Every context need to return component wrapper for every component thats need to access the value
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
