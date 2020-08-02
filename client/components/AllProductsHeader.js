import React from 'react';
import { connect } from 'react-redux';
import { Container, Dropdown, Form, Header } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { fetchProductsThunk, fetchCategoriesThunk } from '../store';

class DisconnectedAllProductsHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: props.page,
      category: null,
      sortBy: null,
      searchQuery: ''
    };
  }

  componentDidMount() {
    this.props.getProducts(
      this.state.page,
      this.state.category,
      this.state.sortBy,
      this.state.searchQuery
    );
  }

  setCategoriesDropdown = () => {
    const categories = this.props.categories.map(category => {
      return category.name;
    });
    let options = [];
    let i = 0;
    categories.map(category => {
      i++;
      let obj = {
        key: category + i,
        value: category,
        text: category
      };
      options.push(obj);
    });
    return options;
  };

  handleChange = event => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSubmit = () => {
    this.callThunk();
  };

  sort = async sortBy => {
    await this.setState({ sortBy });
    this.callThunk();
  };

  updateFilter = async category => {
    await this.setState({ category });
    this.callThunk();
  };

  callThunk = () => {
    this.props.getProducts(
      this.state.page,
      this.state.category,
      this.state.sortBy,
      this.state.searchQuery
    );
  };

  render() {
    const { sortBy, category, searchQuery } = this.state;

    return (
      <Container textAlign="center" style={{ marginTop: '1rem' }}>
        <Header as="h1">The Virtual Mall</Header>
        <Container textAlign="center" style={{ marginBottom: '2rem' }} />
        <Form
          style={{ display: 'inline', marginRight: '25px' }}
          onSubmit={this.handleSubmit}
        >
          <Form.Input
            icon="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={this.handleChange}
          />
        </Form>
        <Dropdown
          style={{ margin: '1rem' }}
          placeholder="Sort By"
          selectOnBlur={false}
          selection
          clearable
          options={[
            { key: 1, text: 'Name', value: 'name' },
            { key: 2, text: 'Price', value: 'price' },
            { key: 3, text: 'Rating', value: 'rating' }
          ]}
          value={sortBy}
          onChange={(e, { value }) => this.sort(value)}
        />
        <Dropdown
          style={{ margin: '1rem' }}
          placeholder="Filter"
          selectOnBlur={false}
          selection
          clearable
          options={this.setCategoriesDropdown()}
          value={category}
          onChange={event => this.updateFilter(event.target.innerText)}
        />
      </Container>
    );
  }
}

const mapState = state => {
  return {
    products: state.products,
    categories: state.categories
  };
};

const mapDispatch = dispatch => {
  return {
    getCategories: () => dispatch(fetchCategoriesThunk()),
    getProducts: (page, category, sortBy, searchQuery) =>
      dispatch(fetchProductsThunk(page, category, sortBy, searchQuery))
  };
};

export default withRouter(
  connect(mapState, mapDispatch)(DisconnectedAllProductsHeader)
);
