const fetchHero = async ({ queryKey }) => {
  const id = queryKey[1];
  const resApi = await fetch(`http://localhost:3000/characters/${id}`);
  if (!resApi.ok) {
    throw new Error(`details/${id} fetch not ok`);
  }

  return resApi.json();
};

export default fetchHero;
