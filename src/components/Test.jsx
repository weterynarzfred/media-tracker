import _ from 'lodash';

import { useDispatch, useTrackedState } from './StateProvider';

export default function Test() {
  const dispatch = useDispatch();
  const state = useTrackedState();

  function handleClick() {
    dispatch({ type: 'TEST' });
  }

  // console.log(_.cloneDeep(state.entries));

  return <div className='Test'>
    <button onClick={handleClick}>{state.test ?? 'test'}</button>
    <div>length: {state.entries?.length}</div>
  </div>;
}
