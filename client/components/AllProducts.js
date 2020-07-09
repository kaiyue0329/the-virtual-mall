import React from 'react';
import { connect } from 'react-redux';
import { Card, Container, Pagination } from 'semantic-ui-react';
import ProductsCard from './ProductCard';
import AllProductsHeader from './AllProductsHeader';
import { fetchProductsThunk } from '../store';
import queryString from 'query-string';

class DisconnectedAllProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
  }

  componentDidMount() {
    const unparsed = this.props.location.search;
    const query = queryString.parse(unparsed);
    query.page = parseInt(query.page, 10);

    if (query.page) {
      this.setState({ page: query.page });
    }

    this.props.getProducts(
      this.state.page,
      this.state.category,
      this.state.sortBy,
      this.state.searchQuery
    );
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ page: activePage });
    this.callThunk();
  };

  callThunk = async () => {
    await this.props.getProducts(this.state.page);
    window.scrollTo(0, 0);
  };

  render() {
    const products = this.props.products;
    const { page } = this.state;

    if (!products || products.length === 0) {
      return (
        <Container textAlign="center" style={{ marginTop: '1rem' }}>
          <AllProductsHeader props={{ page: page }} />
          <p>No Products Found</p>
        </Container>
      );
    }
    return (
      <Container textAlign="center" style={{ marginTop: '1rem' }}>
        <AllProductsHeader />
        <Card.Group centered stackable>
          {products.map(product => (
            <ProductsCard product={product} key={product.id} />
          ))}
        </Card.Group>
        <Container textAlign="center" style={{ margin: '1rem' }}>
          <Pagination
            activePage={page}
            boundaryRange={0}
            ellipsisItem={null}
            siblingRange={5}
            onPageChange={this.handlePaginationChange}
            totalPages={this.props.pages}
          />
        </Container>
      </Container>
    );
  }
}

const mapState = state => {
  return {
    products: state.products.items,
    pages: state.products.pages
  };
};

const mapDispatch = dispatch => {
  return {
    getProducts: (page, category, sortBy, searchQuery) =>
      dispatch(fetchProductsThunk(page, category, sortBy, searchQuery))
  };
};

export default connect(mapState, mapDispatch)(DisconnectedAllProducts);
