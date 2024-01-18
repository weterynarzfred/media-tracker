import { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';

import { useDispatch, useTrackedState } from '@/components/StateProvider';
import selectStyles from '@/clientSide/selectStyles';
import { handleButtonOpen, handleSubmit } from '@/clientSide/entryEditorHandlers';

export default function EntryEditor() {
  const state = useTrackedState();
  const dispatch = useDispatch();

  const editedEntry = [-1, undefined].includes(state.entryEditor?.id) ? undefined : state.entries[state.entryEditor.id];

  const typeOptions = state.types?.map(type => ({ value: type, label: type })) ?? [];

  const [selectedType, setSelectedType] = useState();
  useEffect(() => {
    setSelectedType(editedEntry?.type !== undefined ? { value: editedEntry.type, label: editedEntry.type } : undefined);
  }, [editedEntry?.type]);

  const creatorWindow = state.entryEditor?.isOpen ? <div className="EntryEditor__window">
    <form onSubmit={handleSubmit.bind(null, dispatch, editedEntry, setSelectedType)}>
      <input type="hidden" name="id" value={editedEntry?.id ?? -1} />
      <input type="hidden" name="cover" value={editedEntry?.cover?.split('?')[0] ?? ''} />
      <div className="input-row">
        <label>
          <CreatableSelect
            name="type"
            placeholder="type"
            options={typeOptions}
            value={selectedType}
            onChange={setSelectedType}
            isClearable={true}
            isSearchable={true}
            components={{ DropdownIndicator: null }}
            className='select'
            styles={selectStyles}
          />
        </label>
      </div>
      <div className="input-row">
        <label>
          <input type="text" name="name" placeholder="name" autoComplete="off" defaultValue={editedEntry?.name} />
        </label>
      </div>
      <div className="input-row">
        <label>
          <input type="number" name="seen" placeholder="seen" autoComplete="off" defaultValue={editedEntry?.seen} />
        </label>
      </div>
      <div className="input-row">
        <label>
          <input type="file" name="cover" />
        </label>
      </div>
      <div className="input-row">
        <button type="submit">{editedEntry === undefined ? 'add' : 'save'}</button>
      </div>
    </form>
  </div> : null;

  return <div className="EntryEditor">
    <button
      onClick={handleButtonOpen.bind(null, dispatch, state.entryEditor?.isOpen)}>
      {state.entryEditor?.isOpen ? 'close editor' : 'add entry'}
    </button>
    {creatorWindow}
  </div>;
}
