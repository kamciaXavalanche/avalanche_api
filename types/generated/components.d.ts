import type { Schema, Attribute } from '@strapi/strapi';

export interface AttributesAttributes extends Schema.Component {
  collectionName: 'components_attributes_attributes';
  info: {
    displayName: 'attributes';
    icon: '';
    description: '';
  };
  attributes: {
    color: Attribute.String & Attribute.Required;
    images: Attribute.Media & Attribute.Required;
    stock: Attribute.Integer;
    availability: Attribute.Component<'stock.stock', true>;
  };
}

export interface AttributesProductAttributes extends Schema.Component {
  collectionName: 'components_attributes_product_attributes';
  info: {
    displayName: 'productAttributes';
    description: '';
  };
  attributes: {
    color: Attribute.String & Attribute.Required;
    images: Attribute.Media & Attribute.Required;
    availability: Attribute.Component<'stock.stock', true>;
    price: Attribute.Decimal;
    discount: Attribute.Integer;
  };
}

export interface StockStock extends Schema.Component {
  collectionName: 'components_stock_stocks';
  info: {
    displayName: 'stock';
    icon: 'cube';
    description: '';
  };
  attributes: {
    size: Attribute.Enumeration<['XS', 'S', 'M', 'L', 'XL']>;
    quantity: Attribute.Integer;
  };
}

declare module '@strapi/strapi' {
  export module Shared {
    export interface Components {
      'attributes.attributes': AttributesAttributes;
      'attributes.product-attributes': AttributesProductAttributes;
      'stock.stock': StockStock;
    }
  }
}
