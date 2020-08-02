import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Container,
  Header,
  Segment,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import { fetchProductsThunk } from '../store';
import { NavLink as Link } from 'react-router-dom';

class DisconnectedHomepage extends React.Component {
  render() {
    // const { products, recommendedProducts, categories } = this.props;
    const { products, categories } = this.props;

    if (!products || products.length === 0) {
      return (
        <Container>
          <Dimmer active inverted>
            <Loader size="large">Loading</Loader>
          </Dimmer>
        </Container>
      );
    }
    return (
      <Container textAlign="center" style={{ marginTop: '1rem' }}>
        <Header as="h1">The Virtual Mall</Header>
        <Container textAlign="center" style={{ marginTop: '5rem' }}>
          <Segment inverted>
            <Header as="h4">Shop by Category</Header>
          </Segment>
          <Card.Group centered stackable>
            {categories.map(category => (
              <Card
                className="centered"
                raised
                key={category.id}
                style={{ margin: '1rem' }}
              >
                <Card.Content>
                  <Card.Header
                    as={Link}
                    to={`/products?category=${category.name}`}
                  >
                    {category.name}
                  </Card.Header>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
          <Segment inverted />
        </Container>
      </Container>
    );
  }
}

const mapState = state => {
  return {
    products: state.products.items,
    categories: state.categories
  };
};

const mapDispatch = dispatch => {
  return {
    applyFilter: (page, category, sortBy, searchQuery) =>
      dispatch(fetchProductsThunk(page, category, sortBy, searchQuery))
  };
};

export default connect(mapState, mapDispatch)(DisconnectedHomepage);
