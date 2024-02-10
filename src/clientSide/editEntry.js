export default function editEntry({ form, isNew = true, callback }) {
  fetch(isNew ? '/api/entries' : `/api/entries/${form.get('id')}`, {
    method: isNew ? 'POST' : 'PUT',
    body: form,
  }).then(response => {
    if (response.ok) return response.json();
    else throw new Error('server error');
  }).then(data => {
    if (typeof callback === 'function') callback.call(null, data);
  });
}
