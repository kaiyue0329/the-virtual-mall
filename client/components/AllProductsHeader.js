import React from 'react';
import { Container, Dropdown, Form, Header } from 'semantic-ui-react';

const AllProductsHeader = ({
  sortBy,
  selectedCategory,
  searchQuery,
  handleInputChange,
  handleFormSubmit,
  sortProducts,
  updateFilter,
  productCategories
}) => {
  const getCategoriesDropdown = () => {
    const categories = productCategories.map(category => {
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

  return (
    <Container
      textAlign="center"
      style={{ marginTop: '1rem', marginBottom: '2rem' }}
    >
      <Header as="h1">The Virtual Mall</Header>
      <Form
        style={{ display: 'inline', marginRight: '25px' }}
        onSubmit={handleFormSubmit}
      >
        <Form.Input
          icon="search"
          placeholder="Search"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </Form>
      <Dropdown
        style={{ margin: '1rem' }}
        placeholder="Sort By"
        selectOnBlur={false}
        selection
        clearable
        options={[
          { key: 1, text: 'Avg. Rating', value: 'avgRating' },
          { key: 2, text: 'Price', value: 'price' },
          { key: 3, text: 'Name', value: 'name' }
        ]}
        value={sortBy}
        onChange={(e, { value }) => sortProducts(value)}
      />
      <Dropdown
        style={{ margin: '1rem' }}
        placeholder="Filter"
        selectOnBlur={false}
        selection
        clearable
        options={getCategoriesDropdown()}
        value={selectedCategory}
        onChange={event => updateFilter(event.target.innerText)}
      />
    </Container>
  );
};

export default AllProductsHeader;
