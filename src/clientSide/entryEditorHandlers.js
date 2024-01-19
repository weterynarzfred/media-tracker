import createEntry from '@/clientSide/createEntry';
import deleteEntry from "@/clientSide/deleteEntry";
import { ACTION_TYPES } from '@/clientSide/mainReducer';

async function handleSubmit(dispatch, editedEntry, event) {
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
    },
  });
};

function handleButtonOpen(dispatch, isOpen) {
  dispatch({
    type: ACTION_TYPES.ENTRY_EDITOR,
    isOpen: !isOpen,
  });
}

function handleButtonClose(dispatch, event) {
  event.preventDefault();
  dispatch({
    type: ACTION_TYPES.ENTRY_EDITOR,
    isOpen: false,
  });
}

function handleWrapClick(dispatch, event) {
  if (event.isFromEntryEditorForm) return;

  dispatch({
    type: ACTION_TYPES.ENTRY_EDITOR,
    isOpen: false,
  });
}

function handleButtonDelete(dispatch, event) {
  event.preventDefault();

  dispatch({
    type: ACTION_TYPES.ENTRY_EDITOR,
    isAskedToDelete: true,
  });
}

function handleButtonDeleteConfirm(dispatch, editedEntry) {
  deleteEntry({
    entry: editedEntry,
    callback: () => {
      dispatch({
        type: ACTION_TYPES.ENTRY_DELETE,
        id: editedEntry.id,
      });
      dispatch({
        type: ACTION_TYPES.ENTRY_EDITOR,
        isOpen: false,
      });
    },
  });
}

function handleButtonDeleteCancel(dispatch) {
  dispatch({
    type: ACTION_TYPES.ENTRY_EDITOR,
    isAskedToDelete: false,
  });
}

function handleKeyUp(dispatch, event) {
  if (event.key === 'Escape') {
    dispatch({
      type: ACTION_TYPES.ENTRY_EDITOR,
      isOpen: false,
    });
  }
}

export {
  handleSubmit,
  handleButtonOpen,
  handleButtonClose,
  handleWrapClick,
  handleButtonDelete,
  handleButtonDeleteConfirm,
  handleButtonDeleteCancel,
  handleKeyUp,
};
