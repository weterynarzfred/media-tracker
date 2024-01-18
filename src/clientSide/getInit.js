export default async function getInit() {
  const entriesResponse = await fetch('/api/entries', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error('network error');
  });

  const typesResponse = await fetch('/api/types', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error('network error');
  });

  return {
    entries: entriesResponse.entries,
    types: typesResponse.types,
  };
}
