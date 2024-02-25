const fetchRaces = async ({ queryKey }) => {
  const publisher = queryKey[1];
  if (!publisher) return [];
  const resApi = await fetch(
    `http://localhost:3000/characters/race?publisher=${publisher}`
  );

  if (!resApi.ok) {
    throw new Error(`fetch not ok`);
  }

  return resApi.json();
};

export default fetchRaces;
