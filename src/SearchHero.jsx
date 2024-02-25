import { useContext, useState } from "react";
import favoriteContext from "./favoriteContext";
import useRaces from "./useRaces";
import Heros from "./Heros";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";

const PUBLISHERS = [
  "Marvel Comics",
  "Dark Horse Comics",
  "DC Comics",
  "NBC - Heroes",
  "Wildstorm",
  "Archangel",
  "Tempest",
  "Giant-Man",
  "Toxin",
  "Angel",
  "Goliath",
  "Oracle",
  "Spoiler",
  "Nightwing",
  "Icon Comics",
  "SyFy",
  "George Lucas",
  "Meltdown",
  "Gemini V",
  "South Park",
  "Binary",
  "ABC Studios",
  "Universal Studios",
  "Star Trek",
  "Evil Deadpool",
  "IDW Publishing",
  "Deadpool",
  "Black Racer",
  "Speed Demon",
  "Impulse",
  "Shueisha",
  "Sony Pictures",
  "J. K. Rowling",
  "Batgirl III",
  "Flash IV",
  "Titan Books",
  "Phoenix",
  "Power Woman",
  "Rebellion",
  "Iron Lad",
  "Power Man",
  "Image Comics",
  "Microsoft",
  "Boom-Boom",
  "Batgirl V",
  "She-Thing",
  "Batman II",
  "Batgirl",
  "Jean Grey",
  "Robin II",
  "Robin III",
  "Red Hood",
  "Red Robin",
  "J. R. R. Tolkien",
  "Spider-Carnage",
  "Venom III",
  "Ms Marvel II",
  "Aztar",
  "Superman Prime One-Million",
  "Angel Salvadore",
  "Rune King Thor",
  "Anti-Venom",
  "Scorpion",
  "Vindicator II",
  "Anti-Vision",
  "Thunderbird II",
  "Ant-Man",
];
const SearchHero = () => {
  // const [heroName, setHeroName] = useState("");
  // const [race, setRace] = useState("");
  const [favorites] = useContext(favoriteContext);
  const [publisher, setPublisher] = useState("");
  const [races] = useRaces(publisher);
  const [herosParams, setHerosParams] = useState({
    heroName: "undefined",
    race: "null",
    publisher: "undefined",
  });

  const heroResult = useQuery(["search", herosParams], fetchSearch);

  const heros = heroResult?.data ?? [];

  console.log(favorites);

  return (
    <>
      <section className="favoerites"></section>
      <section className="hero-section ">
        <h2>Search Heros</h2>
        <p>
          Explore the incredible universe of superheroes and discover their
          extraordinary powers.
        </p>
        <form
          className="hero-search"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);

            const obj = {
              heroName: formData.get("heroName"),
              publisher: formData.get("publisher"),
              race: formData.get("race"),
            };

            setHerosParams(obj);
          }}
        >
          <div className="input-group">
            <label htmlFor="input-label" id="searchName">
              Name
            </label>
            <input type="text" className="input-select" name="heroName" />
          </div>

          <div className="input-group">
            <label htmlFor="input-label" id="searchName">
              Publisher
            </label>
            <select
              className="input-select"
              name="publisher"
              onChange={(e) => {
                setPublisher(e.target.value);
              }}
              onBlur={(e) => {
                setPublisher(e.target.value);
              }}
            >
              <option value="undefined"></option>
              {PUBLISHERS.map((publisher) => (
                <option key={publisher} value={publisher}>
                  {publisher}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="input-label" id="searchName">
              Race
            </label>
            <select
              className="input-select"
              disabled={!races?.length}
              name="race"
            >
              <option value="null"></option>
              {races?.map((race) => (
                <option key={race} value={race}>
                  {race}
                </option>
              ))}
            </select>
          </div>
          <button className="cta-button" type="submit">
            Search
          </button>
        </form>
      </section>
      <Heros heros={heros} />
    </>
  );
};

export default SearchHero;
