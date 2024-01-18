import { produce } from 'immer';
import { useEffect, useReducer } from 'react';
import { createContainer } from 'react-tracked';

import getInit from "@/clientSide/getInit";
import mainReducer, { ACTION_TYPES } from "@/clientSide/mainReducer";

function useValue() {
  const [state, dispatch] = useReducer(produce(mainReducer), {});

  useEffect(() => {
    (async () => dispatch({ type: ACTION_TYPES.INIT, ...await getInit() }))();
  }, []);

  return [state, dispatch];
};

const { Provider, useTrackedState, useUpdate } = createContainer(useValue);

export default function StateProvider({ children }) {
  return (<Provider>
    {children}
  </Provider>);
}

export {
  useTrackedState,
  useUpdate as useDispatch,
};
