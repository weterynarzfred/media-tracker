export default function patchEntry({ entry, path, value, callback }) {
  fetch(`/api/entries/${entry.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      op: 'replace',
      path,
      value,
    }),
  }).then(response => {
    if (response.ok) return response.json();
    else throw new Error('server error');
  }).then(data => {
    if (typeof callback === 'function') callback.call(null, data);
  });
}
