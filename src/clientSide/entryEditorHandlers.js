import createEntry from '@/clientSide/createEntry';
import { ACTION_TYPES } from '@/clientSide/mainReducer';

async function handleSubmit(dispatch, editedEntry, setSelectedType, event) {
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
};

function handleButtonOpen(dispatch, isOpen) {
  dispatch({
    type: ACTION_TYPES.ENTRY_EDITOR,
    isOpen: !isOpen,
  });
}

export {
  handleSubmit,
  handleButtonOpen,
};
