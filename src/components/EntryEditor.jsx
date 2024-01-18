import CreatableSelect from 'react-select/creatable';

import { useDispatch, useTrackedState } from './StateProvider';
import { ACTION_TYPES } from '../clientSide/mainReducer';
import createEntry from '../clientSide/createEntry';
import { useEffect, useState } from 'react';

export default function EntryEditor() {
  const state = useTrackedState();
  const dispatch = useDispatch();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    createEntry({
      form: formData,
      isNew: editedEntry === undefined,
      callback: data => {
        dispatch({
          type: ACTION_TYPES.ENTRY_EDIT,
          entry: data.entry,
        });
        dispatch({
          type: ACTION_TYPES.ENTRY_EDITOR,
          isOpen: false,
        });
        setSelectedType(undefined);
      },
    });
  }

  const editedEntry = [-1, undefined].includes(state.entryEditor?.id) ? undefined : state.entries[state.entryEditor.id];

  const typeOptions = state.types?.map(type => ({ value: type, label: type })) ?? [];

  const [selectedType, setSelectedType] = useState();
  useEffect(() => {
    setSelectedType(editedEntry?.type !== undefined ? { value: editedEntry.type, label: editedEntry.type } : undefined);
  }, [editedEntry?.type]);

  const creatorWindow = <div className="EntryEditor__window">
    <form onSubmit={handleSubmit}>
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
            styles={{
              control: base => ({
                ...base,
                borderRadius: 0,
                outline: 'none',
                boxShadow: 'none',
                border: 'none',
                backgroundColor: '#333',
                color: '#eee',
                minHeight: 0,
              }),
              menu: base => ({
                ...base,
                backgroundColor: '#333',
                color: '#eee',
                margin: 0,
              }),
              menuList: base => ({
                ...base,
                padding: '2px',
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? '#555' : '#333',
                color: '#eee',
                minHeight: 0,
                padding: 0,
              }),
              singleValue: base => ({
                ...base,
                backgroundColor: '#333',
                color: '#eee',
              }),
              valueContainer: base => ({
                ...base,
                padding: 0,
                backgroundColor: '#333',
                color: '#eee',
              }),
              dropdownIndicator: base => ({
                ...base,
                padding: 0,
              }),
              clearIndicator: base => ({
                ...base,
                padding: 0,
              }),
              placeholder: base => ({
                ...base,
                color: '#777',
              }),
              input: base => ({
                ...base,
                margin: 0,
                color: '#eee',
              }),
            }}
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
  </div>;

  return <div className="EntryEditor">
    <button onClick={() => {
      dispatch({
        type: ACTION_TYPES.ENTRY_EDITOR,
        isOpen: !state.entryEditor?.isOpen,
        id: -1,
      });
    }}>{state.entryEditor?.isOpen ? 'close editor' : 'add entry'}</button>
    {state.entryEditor?.isOpen ? creatorWindow : null}
  </div>;
}
