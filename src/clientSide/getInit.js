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

  const statusesResponse = await fetch('/api/statuses', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error('network error');
  });

  const languagesResponse = await fetch('/api/languages', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error('network error');
  });

  const handlersResponse = await fetch('/api/handlers', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error('network error');
  });

  return {
    data: {
      entries: entriesResponse.entries,
      types: typesResponse.types,
      statuses: statusesResponse.types,
      languages: languagesResponse.types,
      handlers: handlersResponse.handlers,
    },
  };
}
