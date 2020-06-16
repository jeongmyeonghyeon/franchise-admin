import React, {createContext, useState, useReducer, useContext} from "react";

const StoreContext = createContext();

const initialState = {
  franchiseList: [],
};

export const LOAD_FRANCHISE_LIST_REQUEST = 'LOAD_FRANCHISE_LIST_REQUEST';
export const ADD_FRANCHISE_REQUEST = 'ADD_FRANCHISE_REQUEST';

export const reducer = (state, action) => {
  console.log(action.type)
  switch (action.type) {
    case ADD_FRANCHISE_REQUEST:
      console.log(state)
      console.log(action)
      return {
        franchiseList: [action.data, ...state.franchiseList]
      }
    case LOAD_FRANCHISE_LIST_REQUEST:
      return { franchiseList: action.data };
    default:
      throw new Error();
  }
}

export const StoreProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{state, dispatch}}>
        {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
