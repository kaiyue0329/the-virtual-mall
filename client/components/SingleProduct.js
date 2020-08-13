import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getOneProduct } from '../store/oneProduct.js';
import {
  Container,
  Button,
  Rating,
  Grid,
  Image,
  Segment,
  Dropdown
} from 'semantic-ui-react';
import AddToCart from './AddToCart.js';
import { updateCartThunk } from '../store/cart';

export class JustOneProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 1
    };
    this.backtoProductPage = this.backtoProductPage.bind(this);
    this.reviewButton = this.reviewButton.bind(this);
  }

  componentDidMount() {
    this.props.fetchOneProduct(this.props.match.params.id);
    this.setState(this.props.match.params);
  }

  reviewButton(event) {
    this.props.history.push(`/review/${event.target.value}`);
  }

  backtoProductPage(event) {
    event.preventDefault();
    this.props.history.push('/products');
  }

  handleChange = (e, { value }) => {
    this.setState({ quantity: value });
  };

  createDropdown = () => {
    let options = [];
    for (let i = 1; i < 11; i++) {
      options.push({
        text: i,
        value: i,
        onClick: this.handleChange,
        key: i
      });
    }
    return options;
  };

  render() {
    let p = this.props.oneProduct;

    const orderProducts = {
      quantity: this.state.quantity,
      productId: p.id,
      event: 'addProduct'
    };

    const main = (
      <Container>
        <Segment>
          <Grid columns={2} relaxed="very">
            <Grid.Column>
              <h1>{p.name}</h1>
              <div className="fontBold">Price $ {p.price / 100.0}</div>
              <div>
                {p.inventoryQuantity} items left in stock. Product is
                {p.isAvailable
                  ? ' available to order.'
                  : ' not available at this time.'}
              </div>
              <br />
              <div>Item Description: {p.description}</div>
              <br />
              {p.categories && p.categories.length ? (
                <div className="fontItalics">
                  This product belongs to the following category:
                  <ul>
                    {p.categories.map(category => (
                      <li key={category.id}>{category.name}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="fontItalics">
                  This product does not belong to any category.
                  <br />
                </div>
              )}
              Quantity:{' '}
              <Dropdown
                text={`${this.state.quantity}`}
                selection
                options={this.createDropdown()}
                style={{ marginRight: '8px' }}
              />
              <AddToCart orderProducts={orderProducts} />
            </Grid.Column>
            <Grid.Column>
              <Image src={p.picture} />
            </Grid.Column>
          </Grid>
        </Segment>

        <h1>Reviews: </h1>
        {p.reviews && p.reviews.length ? (
          <div>
            {p.reviews.map(review => (
              <div key={review.id}>
                <Rating
                  icon="star"
                  defaultRating={review.star}
                  maxRating={5}
                  disabled
                >
                  Star given: {review.star}
                </Rating>
                <br />
                <div>{review.text}</div>
                <br />
              </div>
            ))}
          </div>
        ) : (
          <div>No review available for this product.</div>
        )}
        <Button type="Submit" onClick={this.backtoProductPage}>
          Back to Product Page
        </Button>
      </Container>
    );
    return this.state.oneProduct ? 'Just a sec...' : main;
  }
}

const mapStateToProps = state => ({
  oneProduct: state.oneProduct
});

const mapDispatchToProps = dispatch => {
  return {
    fetchOneProduct: id => dispatch(getOneProduct(id)),
    update: cart => dispatch(updateCartThunk(cart))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(JustOneProduct)
);
