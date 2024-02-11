export default async function getInit() {
  const entriesResponse = await fetch('/api/entries', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error('server error');
  });

  const typesResponse = await fetch('/api/types', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error('server error');
  });

  const statusesResponse = await fetch('/api/statuses', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error('server error');
  });

  const languagesResponse = await fetch('/api/languages', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error('server error');
  });

  const handlersResponse = await fetch('/api/handlers', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error('server error');
  });

  return {
    data: {
      entries: entriesResponse.entries,
      types: typesResponse.types,
      statuses: statusesResponse.statuses,
      languages: languagesResponse.languages,
      handlers: handlersResponse.handlers,
    },
  };
}
