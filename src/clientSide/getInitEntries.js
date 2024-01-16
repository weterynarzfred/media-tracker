export default async function getInitEntries() {
  const response = await fetch('/api/entries', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error('network error');
  });

  return response.entries;
}
