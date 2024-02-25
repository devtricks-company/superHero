async function fetchSearch({ queryKey }) {
  const { heroName, publisher, race } = queryKey[1];
  const resHeros = await fetch(
    `http://localhost:3000/characters/search?name=${heroName}&publisher=${publisher}&race=${race}`
  );

  if (!resHeros.ok) {
    throw new Error(`fetch not ok`);
  }

  return resHeros.json();
}

export default fetchSearch;
