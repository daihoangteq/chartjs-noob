import { createContext } from "react";
import { IPropsContextChart } from "../type";

export const Context = createContext<null | IPropsContextChart>(null);
