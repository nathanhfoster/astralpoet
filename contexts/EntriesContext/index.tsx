import { FC } from "react";
import { entriesInitialState, entriesSlice, getEntriesInitialState } from "./reducer";
import createContextWithName from "@/packages/ui/src/contexts/ContextStore/utils/createContextWithName";
import { EntriesContextState, EntriesContextProviderProps } from "./types";
import Provider from "@/packages/ui/src/contexts/ContextStore/Provider";



export const EntriesActions = entriesSlice.actions;

export const EntriesContext = createContextWithName<
    EntriesContextState,
    typeof EntriesActions
>("Entries", entriesInitialState);

export const {
    StateContext: EntriesStateContext,
    useSelector: useEntriesSelector,
    DispatchContext: EntriesDispatchContext,
    useDispatch: useEntriesDispatch,
} = EntriesContext;

export const EntriesContextProvider: FC<
    EntriesContextProviderProps
> = ({ children, ...restOfProps }) => {
    return (
        <Provider
            {...restOfProps}
            StateContext={EntriesStateContext}
            reducer={entriesSlice.reducer}
            initializer={getEntriesInitialState}
            DispatchContext={EntriesDispatchContext}
        >
            {children}
        </Provider>
    );
};
