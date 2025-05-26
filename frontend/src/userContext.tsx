import { createContext } from "react";

export const UserContext = createContext<{ userToken: string }>({
  userToken: "",
});