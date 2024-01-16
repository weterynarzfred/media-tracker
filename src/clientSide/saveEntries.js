export default async function saveEntries(entries) {
  await fetch('/api/entries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ entries }),
  }).then((response) => {
    if (!response.ok) throw new Error('network error');
  });
}
