import { ContextStoreInitializer } from "@/packages/ui/src/contexts/ContextStore/types";
import { EntriesContextProviderProps, EntriesContextState } from "./types";
import createReducer from "@/packages/ui/src/contexts/ContextStore/utils/createReducer";

export const entriesInitialState: EntriesContextState = {
    entries: [],
    pagination: {
        offset: 0,
        limit: 50,
        search: "",
        sort_by: "revenue",
        sort_direction: "desc",
        filters: {
            days: 7,
        },
    },
    error: undefined,
};

export const getEntriesInitialState: ContextStoreInitializer<
    EntriesContextProviderProps["initialState"],
    EntriesContextState
> = (initialState) => {
    if (!initialState) {
        return entriesInitialState;
    }

    return {
        ...entriesInitialState,
        entries: initialState,
    };
};

export const entriesSlice = createReducer({
    name: "Entries",
    initialState: entriesInitialState,
    actions: {

    },
}).addThunks((_actions) => {
    return {

    };
});
