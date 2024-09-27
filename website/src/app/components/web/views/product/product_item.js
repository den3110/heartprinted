import React from 'react';

const ProductItem = ({ product }) => {
  const { name, price, image } = product;

  return (
    <div className="product-item">
      <div className="product-image">
        <img src={image} alt={name} className="product-img" />
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <span className="product-price">{price}</span>
        <button className="product-button">Add to Cart</button>
      </div>

      <style>
        {`
          .product-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            background-color: #fff;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
          }

          .product-image {
            width: 100%;
            text-align: center;
          }

          .product-img {
            max-width: 100%;
            height: auto;
          }

          .product-info {
            margin-top: 10px;
            text-align: center;
          }

          .product-name {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 5px;
          }

          .product-price {
            font-size: 14px;
            color: #888;
          }

          .product-button {
            margin-top: 10px;
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            background-color: #fdd835;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .product-button:hover {
            background-color: #fbc02d;
          }
        `}
      </style>
    </div>
  );
};

export default ProductItem;