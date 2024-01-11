// import { FilterValues } from "../../../ops/services/api/types";
// import {
//   EntriesResponse,
//   EntriesResponseItem,
// } from "../../services/apoloClient/queries/Deal/types";

import { ContextProviderProps, ContextStore } from "@packages/ui/contexts/ContextStore/types";
import { Ensure } from "@packages/ui/types";

export type EntriesContextProviderProps = Ensure<
    ContextProviderProps<Entry[]>,
    "initialState"
>;
export type EntriesContextState = ContextStore<{
    entries: Entry[];
    pagination: {}
    error?: string
}>;

export interface SetEntriesActionPayload {
    entries: Entry[];
    pagination?: {}
}


export interface Entry { }