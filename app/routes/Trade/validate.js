export default ({ quantity, price, orderTypeName }) => {
  // validate quantity
  const parsedQuantity = Number(quantity);
  let errorMessage = '';
  let errorPresent = false;
  if (isNaN(parsedQuantity)) {
    errorPresent = true;
    errorMessage = 'Quantity must be greater than zero';
  }
  if (parsedQuantity <= 0) {
    errorPresent = true;
    errorMessage = 'Quantity must be greater than zero';
  }

  if (orderTypeName === 'market') {
    return { errorMessage, errorPresent };
  }

  // if not market order then validate price
  // validate price
  const parsedPrice = Number(price);
  if (isNaN(parsedPrice) || parsedPrice === 0) {
    errorPresent = true;
    errorMessage = 'Enter your own price for the limit order';
    return { errorMessage, errorPresent };
  }

  if (parsedPrice <= 0) {
    errorPresent = true;
    errorMessage = 'Price must be greater than zero';
  }

  return { errorMessage, errorPresent };
};