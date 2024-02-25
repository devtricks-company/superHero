import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  handleIndex = (e) => {
    this.setState({
      active: +e.target.dataset.index,
    });
  };
  render() {
    const { active } = this.state;
    const { hero } = this.props;
    return (
      <>
        <img
          src={hero?.otherImages ? hero?.otherImages[active] : hero.images.lg}
          alt="animal"
        />
        <div className="carousel-smaller">
          {hero?.otherImages?.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              className={index === active ? "active" : ""}
              alt="hero thumbnail"
              onClick={this.handleIndex}
              data-index={index}
            />
          ))}
        </div>
      </>
    );
  }
}

export default Carousel;
