import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Stars from './Stars';
import AddToCart from './AddToCart';

const ProductCard = props => {
  const product = props.product;
  const productCategory = product.categories[0].name;

  const orderProducts = {
    quantity: 1,
    productId: product.id,
    event: 'addProduct'
  };

  const categoryColors = [
    'red',
    'orange',
    'brown',
    'teal',
    'blue',
    'violet',
    'yellow',
    'green'
  ];

  const category = [
    'Beauty',
    'Computers',
    'Outdoors',
    'Games',
    'Health',
    'Home',
    'Baby',
    'Tools'
  ];

  const tagColor = categoryColors[category.indexOf(productCategory)];

  const findReviewAvg = () => {
    let total = 0;
    product.reviews.map(review => {
      total += review.star;
    });
    const avg = Math.floor(total / product.reviews.length);
    return avg;
  };

  return (
    <Card centered raised key={product.id} style={{ margin: '1rem' }}>
      <Link to={`/products/${product.id}`} key={product.id}>
        <Image
          centered
          size="medium"
          label={{
            color: tagColor,
            content: productCategory,
            ribbon: true,
            size: 'medium',
            className: 'productCategory'
          }}
          src={product.picture}
        />
      </Link>
      <Card.Content>
        <Link to={`/products/${product.id}`} key={product.id}>
          <Card.Header>{product.name}</Card.Header>$
          {(product.price / 100).toFixed(2)}
          <br />
          {product.reviews.length !== 0 && <Stars starsInt={findReviewAvg()} />}
        </Link>
        <br />
        <AddToCart orderProducts={orderProducts} />
      </Card.Content>
    </Card>
  );
};

export default ProductCard;
