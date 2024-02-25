import { useContext, useState, lazy } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Carousel from "./Carousel ";
import ErrorBoundary from "./ErrorBoundary";
import fetchHero from "./fetchHero";

import favoriteContext from "./favoriteContext";
const Modal = lazy(() => import("./Modal"));
const Details = () => {
  const { id } = useParams();
  const navigation = useNavigate();
  const result = useQuery(["details", id], fetchHero);
  const [showModal, setShowModal] = useState(false);
  const [favorite, setFavorite] = useContext(favoriteContext);
  if (result.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }
  const hero = result.data;

  return (
    <section className="hero-section">
      <seciotn className="hero-container">
        <section className="container-image">
          <Carousel hero={hero} />
        </section>
        <section className="box">
          <h2 className="hero-name boxitem">
            {hero.name}{" "}
            <button onClick={() => setShowModal(true)}>Favarite </button>
          </h2>
          <div className="biography boxitem">
            <h2>biography</h2>
            <div>
              {" "}
              <h3>FullName: {hero.biography.fullName}</h3>{" "}
            </div>
            <div>
              <h3>AlterEgos : {hero.biography.alterEgos}</h3>{" "}
            </div>
            <ul>
              <li>
                <h3>aliases</h3>
                <ul className="aliases">
                  {hero.biography.aliases.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
              <li>placeOfBirth : {hero.biography.placeOfBirth}</li>
              <li>firstAppearance: {hero.biography.firstAppearance}</li>
              <li>Publisher: {hero.biography.publisher} </li>
              <li>alignment: {hero.biography.alignment}</li>
            </ul>
          </div>
          <div className="powerState boxitem">
            <h2>PowerState</h2>
            <ul>
              <li>
                intelligence
                <div className="bar-container">
                  <div
                    className="bar-progress"
                    style={{ width: hero.powerstats.intelligence + "%" }}
                  ></div>
                </div>
              </li>
              <li>
                strength{" "}
                <div className="bar-container">
                  <div
                    className="bar-progress"
                    style={{ width: hero.powerstats.strength + "%" }}
                  ></div>
                </div>
              </li>
              <li>
                speed{" "}
                <div className="bar-container">
                  <div
                    className="bar-progress"
                    style={{ width: hero.powerstats.speed + "%" }}
                  ></div>
                </div>
              </li>
              <li>
                durability{" "}
                <div className="bar-container">
                  <div
                    className="bar-progress"
                    style={{ width: hero.powerstats.durability + "%" }}
                  ></div>
                </div>
              </li>
              <li>
                power{" "}
                <div className="bar-container">
                  <div
                    className="bar-progress"
                    style={{ width: hero.powerstats.power + "%" }}
                  ></div>
                </div>
              </li>
              <li>
                combat{" "}
                <div className="bar-container">
                  <div
                    className="bar-progress"
                    style={{ width: hero.powerstats.combat + "%" }}
                  ></div>
                </div>
              </li>
            </ul>
          </div>

          <div className="appreance boxitem">
            <h2>Appreance</h2>
            <ul>
              <li>gender: {hero.appearance.gender}</li>
              <li>race: {hero.appearance.race}</li>
              <li>height: {hero.appearance.height}</li>
              <li>weight: {hero.appearance.weight}</li>
              <li>eyeColor:{hero.appearance.eyeColor}</li>
              <li>hairColor:{hero.appearance.hairColor}</li>
            </ul>
          </div>
          <div className="work boxitem">
            <h2>work</h2>
            <p> occupation: {hero.work.occupation}</p>
            <p> base: {hero.work.base}</p>
          </div>
          <div className="connection boxitem">
            <h2>connections</h2>

            <p> groupAffiliation : {hero.connections.groupAffiliation},</p>
            <p> relatives: {hero.connections.relatives}</p>
          </div>
        </section>
      </seciotn>
      {
        showModal ? (
          <Modal>
            <div>
              <h1>Would you like to set {hero.name} to favarite?</h1>
              <div className="buttons">
                <button
                  className="confirm"
                  onClick={() => {
                    setFavorite([
                      ...favorite,
                      {
                        ...hero,
                      },
                    ]);
                    navigation("/");
                  }}
                >
                  {" "}
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null // you have to remove this semi-colon, my auto-formatter adds it back if I delete it
      }
    </section>
  );
};

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
