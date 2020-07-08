import React from 'react';
import { Icon } from 'semantic-ui-react';

const Stars = props => {
  const numStars = props.starsInt;
  let stars = [];

  for (let i = 1; i <= 5; i++) {
    let currentStar = <Icon disabled color="yellow" name="star" key={i} />;
    if (i > numStars) {
      currentStar = (
        <Icon disabled color="yellow" name="star outline" key={i} />
      );
    }
    stars.push(currentStar);
  }
  return stars;
};

export default Stars;
