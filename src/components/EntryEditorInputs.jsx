import CreatableSelect from 'react-select/creatable';
import selectStyles from '@/clientSide/selectStyles';
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";

export default function EntryEditorInputs({ editedEntry, types }) {
  const [selectedFile, setSelectedFile] = useState();

  const typeOptions = types?.map(type => ({ value: type, label: type })) ?? [];
  const typeOption = editedEntry?.type === undefined ?
    undefined :
    { value: editedEntry.type, label: editedEntry.type };

  return <div className="EntryEditorInputs">

    <div className="input-row input-row--name">
      <label>
        <TextareaAutosize
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
        <div className="input-label">type</div>
        <CreatableSelect
          key={editedEntry?.id}
          name="type"
          placeholder=""
          options={typeOptions}
          defaultValue={typeOption}
          isClearable={true}
          isSearchable={true}
          className='select'
          styles={selectStyles}
        />
      </label>
    </div>

    <div className="input-group">
      <div className="input-label">seen</div>
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
      /
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
    </div>

    <div className="input-row input-row--cover">
      <label>
        <div className="input-label">cover</div>
        <input
          key={editedEntry?.id}
          type="file"
          name="cover"
          onChange={event => {
            const filename = event.currentTarget.value.split('\\').pop();
            if (filename) setSelectedFile(filename);
          }}
        />
        <div className="input-display">{selectedFile === undefined ? 'select file' : selectedFile}</div>
      </label>
    </div>

  </div>;
}
