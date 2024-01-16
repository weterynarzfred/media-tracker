import { produce } from 'immer';
import { useEffect, useReducer } from 'react';
import { createContainer } from 'react-tracked';

import mainReducer from '../clientSide/mainReducer';
import getInitEntries from '../clientSide/getInitEntries';
import saveEntries from '../clientSide/saveEntries';

function useValue() {
  const [state, dispatch] = useReducer(produce(mainReducer), {});

  useEffect(() => {
    (async () => state.isLoaded ? await saveEntries(state.entries) : null)();
  }, [state]);

  useEffect(() => {
    (async () => dispatch({ type: 'INIT', entries: await getInitEntries() }))();
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
