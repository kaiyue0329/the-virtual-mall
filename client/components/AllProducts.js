import React from 'react';
import { connect } from 'react-redux';
import { Card, Container, Pagination } from 'semantic-ui-react';
import ProductsCard from './ProductCard';
import AllProductsHeader from './AllProductsHeader';
import { fetchProductsThunk, fetchCategoriesThunk } from '../store';

class DisconnectedAllProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      category: null,
      sortBy: null,
      searchQuery: ''
    };
  }

  handlePaginationChange = async (e, { activePage }) => {
    await this.setState({ page: activePage });
    await this.callThunk();
  };

  handleInputChange = event => {
    this.setState({ searchQuery: event.target.value });
  };

  handleFormSubmit = async () => {
    await this.setState({ page: 1 });
    this.callThunk();
  };

  sortProducts = async sortBy => {
    await this.setState({ sortBy });
    await this.setState({ page: 1 });
    this.callThunk();
  };

  updateFilter = async category => {
    await this.setState({ category });
    await this.setState({ page: 1 });
    this.callThunk();
  };

  callThunk = async () => {
    await this.props.getProducts(
      this.state.page,
      this.state.category,
      this.state.sortBy,
      this.state.searchQuery
    );
    window.scrollTo(0, 0);
  };

  render() {
    const products = this.props.products;
    const { page, category, sortBy, searchQuery } = this.state;

    if (!products || products.length === 0) {
      return (
        <Container textAlign="center" style={{ marginTop: '1rem' }}>
          <AllProductsHeader
            props={{
              page: page,
              category: category,
              sortBy: sortBy,
              searchQuery: searchQuery
            }}
            handleInputChange={this.handleInputChange}
            handleFormSubmit={this.handleFormSubmit}
            sortProducts={this.sortProducts}
            updateFilter={this.updateFilter}
            productCategories={this.props.categories}
          />
          <p>No Products Found</p>
        </Container>
      );
    }
    return (
      <Container textAlign="center" style={{ marginTop: '1rem' }}>
        <AllProductsHeader
          props={{
            page: page,
            selectedCategory: category,
            sortBy: sortBy,
            searchQuery: searchQuery
          }}
          handleInputChange={this.handleInputChange}
          handleFormSubmit={this.handleFormSubmit}
          sortProducts={this.sortProducts}
          updateFilter={this.updateFilter}
          productCategories={this.props.categories}
        />
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
    pages: state.products.pages,
    categories: state.categories
  };
};

const mapDispatch = dispatch => {
  return {
    getProducts: (page, category, sortBy, searchQuery) =>
      dispatch(fetchProductsThunk(page, category, sortBy, searchQuery)),
    getCategories: () => dispatch(fetchCategoriesThunk())
  };
};

export default connect(mapState, mapDispatch)(DisconnectedAllProducts);
