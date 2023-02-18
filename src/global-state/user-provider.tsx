import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { authenticationHelper, fireBaseHelper } from "../App";
import { providerProps } from "../types/interfaces";
import LofiRoomsUser from "../types/user";

export const UserContext = React.createContext<LofiRoomsUser | null>(null);
export const UserContextUpdate = React.createContext(
  (value: User | null) => {}
);

export function useUser() {
  return useContext(UserContext);
}

export function useUserUpdate() {
  return useContext(UserContextUpdate);
}

export default function UserProvider({ children }: providerProps) {
  const [user, setUser] = useState<LofiRoomsUser | null>(null);
  async function updateUser(user: User | null) {
    if (user !== null) {
      let userData = await fireBaseHelper.getSenderData(user!.uid);
      setUser(
        () =>
          new LofiRoomsUser(
            user.displayName!,
            user.email!,
            user.uid,
            user.emailVerified,
            userData?.badges
          )
      );
    } else {
      setUser(() => null);
    }
  }

  useEffect(() => {
    const unsubscribe = authenticationHelper.auth.onAuthStateChanged(
      (user: User | null) => {
        updateUser(user);
      }
    );
    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={user}>
      <UserContextUpdate.Provider value={updateUser}>
        {children}
      </UserContextUpdate.Provider>
    </UserContext.Provider>
  );
}
