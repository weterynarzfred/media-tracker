export default function createEntry({ entry, isNew = true, callback }) {
  fetch('/api/entries', {
    method: isNew ? 'POST' : 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ entry }),
  }).then(response => {
    if (response.ok) return response.json();
    else throw new Error('network error');
  }).then(data => {
    if (typeof callback === 'function') callback.call(null, data);
  });
}
