import { useState } from 'react';
import { useDispatch } from './StateProvider';
import { ACTION_TYPES } from '../clientSide/mainReducer';

export default function EntryCreator() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const entry = {
      type: formElement.querySelector('[name=type]').value,
      name: formElement.querySelector('[name=name]').value,
    };

    fetch('/api/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ entry }),
    }).then(response => {
      if (response.ok) return response.json();
      else throw new Error('network error');
    }).then(data => {
      dispatch({
        type: ACTION_TYPES.ENTRY_CREATE,
        entry: data.entry,
      });
      setIsOpen(false);
    });

  }

  const creatorWindow = <div className="EntryCreator__window">
    <form onSubmit={handleSubmit}>
      <div>
        <label><input type="text" name="type" placeholder="type" autoComplete="off" /></label>
      </div>
      <div>
        <label><input type="text" name="name" placeholder="name" autoComplete="off" /></label>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </div>;

  return <div className="EntryCreator">
    <button onClick={() => { setIsOpen(!isOpen); }}>add entry</button>
    {isOpen ? creatorWindow : null}
  </div>;
}
