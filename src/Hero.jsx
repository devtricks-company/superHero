import { Link } from "react-router-dom";
const Hero = ({ hero }) => {
  return (
    <Link to={`/details/${hero.id}`} className="hero-item">
      <img src={hero.images.lg} alt={hero.name} />
      <h3>{hero.name}</h3>
    </Link>
  );
};

export default Hero;
