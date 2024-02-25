import Hero from "./Hero";

const Heros = ({ heros }) => {
  return (
    <section className="hero-section">
      <h2>Featured Heroes</h2>
      <div className="hero-container-main">
        {heros.map((hero) => (
          <Hero hero={hero} key={hero.id} />
        ))}
      </div>
    </section>
  );
};

export default Heros;
