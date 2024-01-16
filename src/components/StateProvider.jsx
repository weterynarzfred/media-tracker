import { produce } from 'immer';
import { useEffect, useReducer } from 'react';
import { createContainer } from 'react-tracked';

import mainReducer, { ACTION_TYPES } from '../clientSide/mainReducer';
import getInitEntries from '../clientSide/getInitEntries';

function useValue() {
  const [state, dispatch] = useReducer(produce(mainReducer), {});

  useEffect(() => {
    (async () => dispatch({ type: ACTION_TYPES.INIT, entries: await getInitEntries() }))();
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
