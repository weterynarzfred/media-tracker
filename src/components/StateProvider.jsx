import { produce } from 'immer';
import { useEffect, useReducer } from 'react';
import { createContainer } from 'react-tracked';

import mainReducer from '../clientSide/mainReducer';

async function getInitEntries() {
  const response = await fetch('/api/entry', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error('network error');
  });

  return response.entries;
}

async function saveEntries(entries) {
  await fetch('/api/entry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ entries }),
  }).then((response) => {
    if (!response.ok) throw new Error('network error');
  });
}

function useValue() {
  const [state, dispatch] = useReducer(produce(mainReducer), {});
  useEffect(() => {
    (async () => {
      if (state.isLoaded) {
        await saveEntries(state.entries);
      }
    })();
  }, [state]);
  useEffect(() => {
    (async () => {
      console.log('init');
      dispatch({ type: 'INIT', entries: await getInitEntries() });
    })();
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
