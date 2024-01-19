import CreatableSelect from 'react-select/creatable';
import selectStyles from '@/clientSide/selectStyles';

export default function EntryEditorInputs({ editedEntry, types }) {
  const typeOptions = types?.map(type => ({ value: type, label: type })) ?? [];
  const typeOption = editedEntry?.type === undefined ?
    undefined :
    { value: editedEntry.type, label: editedEntry.type };

  return <>
    <div className="input-row">
      <label>
        <input
          key={editedEntry?.id}
          type="text"
          name="name"
          placeholder="name"
          autoComplete="off"
          defaultValue={editedEntry?.name}
        />
      </label>
    </div>
    <div className="input-row">
      <label>
        <CreatableSelect
          key={editedEntry?.id}
          name="type"
          placeholder="type"
          options={typeOptions}
          defaultValue={typeOption}
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
        <input
          key={editedEntry?.id}
          type="number"
          name="countSeen"
          placeholder="seen"
          autoComplete="off"
          defaultValue={editedEntry?.countSeen}
        />
      </label>
    </div>
    <div className="input-row">
      <label>
        <input
          key={editedEntry?.id}
          type="number"
          name="countOut"
          placeholder="out"
          autoComplete="off"
          defaultValue={editedEntry?.countOut}
        />
      </label>
    </div>
    <div className="input-row">
      <label>
        <input key={editedEntry?.id} type="file" name="cover" />
      </label>
    </div>
  </>;
}
