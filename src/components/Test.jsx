import _ from 'lodash';

import { useDispatch, useTrackedState } from './StateProvider';
import { ACTION_TYPES } from '../clientSide/mainReducer';

export default function Test() {
  const dispatch = useDispatch();
  const state = useTrackedState();

  function handleClick() {
    dispatch({ type: ACTION_TYPES.TEST });
  }

  // console.log(_.cloneDeep(state.entries));

  return <div className='Test'>
    <button onClick={handleClick}>{state.test ?? 'test'}</button>
    <div>length: {state.entries?.length}</div>
  </div>;
}
