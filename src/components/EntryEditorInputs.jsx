import { useState } from "react";
import Select from "react-select";
import CreatableSelect from 'react-select/creatable';
import TextareaAutosize from "react-textarea-autosize";
import classNames from "classnames";
import { isEmpty } from "lodash";

import selectStyles from '@/clientSide/selectStyles';
import { useTrackedState } from "@/components/StateProvider";

export default function EntryEditorInputs({ editedEntry }) {
  const state = useTrackedState();
  const [selectedFile, setSelectedFile] = useState();

  const typeOptions = state.types?.map(value => ({ value, label: value })) ?? [];
  const typeOption = isEmpty(editedEntry?.type) ?
    undefined :
    { value: editedEntry.type, label: editedEntry.type };

  const statusOptions = state.statuses?.map(value => ({ value, label: value })) ?? [];
  const statusOption = isEmpty(editedEntry?.status) ?
    undefined :
    { value: editedEntry.status, label: editedEntry.status };

  const languageOptions = state.languages?.map(value => ({ value, label: value })) ?? [];
  const languageOption = isEmpty(editedEntry?.language) ?
    undefined :
    { value: editedEntry.language, label: editedEntry.language };

  const handlerOptions = state.handlers?.map(value => ({ value, label: value })) ?? [];
  const handlerOption = isEmpty(editedEntry?.handlerKeys) ?
    undefined :
    editedEntry?.handlerKeys.map(value => ({ value, label: value }));

  return <div className="EntryEditorInputs">

    <div className={classNames(
      'input-row',
      'input-row--name',
    )}>
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
          classNamePrefix='select'
          styles={selectStyles}
          noOptionsMessage={() => 'start typing to add a new type'}
        />
      </label>
    </div>

    <div className="input-row">
      <label>
        <div className="input-label">handler</div>
        <Select
          key={editedEntry?.id}
          name="handlerKeys"
          placeholder=""
          options={handlerOptions}
          defaultValue={handlerOption}
          isMulti={true}
          isClearable={true}
          isSearchable={true}
          className='select'
          classNamePrefix='select'
          styles={selectStyles}
        />
      </label>
    </div>

    <div className="input-group">
      <div className="input-row">
        <label>
          <div className="input-label">status</div>
          <CreatableSelect
            key={editedEntry?.id}
            name="status"
            placeholder=""
            options={statusOptions}
            defaultValue={statusOption}
            isClearable={true}
            isSearchable={true}
            className='select'
            classNamePrefix='select'
            styles={selectStyles}
            noOptionsMessage={() => 'start typing to add a new status'}
          />
        </label>
      </div>

      <div className="input-row">
        <label>
          <div className="input-label">score</div>
          <input
            key={editedEntry?.id}
            type="number"
            step="any"
            name="score"
            autoComplete="off"
            defaultValue={editedEntry?.score}
          />
        </label>
      </div>
    </div>

    <div className="input-group">
      <div className="input-label">seen</div>
      <div className="input-row">
        <label>
          <input
            key={editedEntry?.id}
            type="text"
            name="countSeen"
            placeholder="seen"
            autoComplete="off"
            defaultValue={editedEntry?.counts.seen}
          />
        </label>
      </div>
      <div className="input-label" style={{ textAlign: 'center' }}>/</div>
      <div className="input-row">
        <label>
          <input
            key={editedEntry?.id}
            type="text"
            name="countOut"
            placeholder="out"
            autoComplete="off"
            defaultValue={editedEntry?.counts.out}
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

    <hr />

    <div className="input-row">
      <label>
        <div className="input-label">creator</div>
        <input
          key={editedEntry?.id}
          type="text"
          name="creator"
          autoComplete="off"
          defaultValue={editedEntry?.creator}
        />
      </label>
    </div>
    <div className="input-row">
      <label>
        <div className="input-label">language</div>
        <CreatableSelect
          key={editedEntry?.id}
          name="language"
          placeholder=""
          options={languageOptions}
          defaultValue={languageOption}
          isClearable={true}
          isSearchable={true}
          className='select'
          classNamePrefix='select'
          styles={selectStyles}
          noOptionsMessage={() => 'start typing to add a new language'}
        />
      </label>
    </div>

  </div >;
}
