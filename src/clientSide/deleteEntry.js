export default function deleteEntry({ entry, callback }) {
  fetch(`/api/entries/${entry.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: entry.id }),
  }).then(response => {
    if (response.ok) return response.json();
    else throw new Error('server error');
  }).then(() => {
    if (typeof callback === 'function') callback();
  });
}
