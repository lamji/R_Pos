export type QuantityHistoryType = {
  _id: string;
  quantity: number;
  date: string;
};

export type dataTypeP = {
  _id: string;
  id: string;
  name: string;
  price: number;
  barcode: string;
  quantity: number;
  regularPrice: number;
  date: string;
  quantityHistory: QuantityHistoryType[];
  images?: string;
  stocks?: number;
};

export const productsData: dataTypeP[] = [
  {
    _id: '66a87cda43773717cbdc19c8',
    id: '4800361413480-816',
    name: 'Nestle Milo 24g',
    price: 10,
    barcode: '4800361413480',
    quantity: 1,
    regularPrice: 9,
    date: '2024-07-30T05:40:42.350+00:00',
    images:
      'https://melcom.com/media/catalog/product/cache/d0e1b0d5c74d14bfa9f7dd43ec52d082/1/5/15211_1_1.jpg',
    quantityHistory: [
      { _id: '66a87cda43773717cbdc19c9', quantity: 1, date: '2024-07-30T05:40:42.350+00:00' },
    ],
  },
  {
    _id: '77b88cda43773717cbdc19c8',
    id: '4800361413480-817',
    name: 'Nescafe Classic 2g',
    price: 6,
    barcode: '4800361413481',
    quantity: 5,
    regularPrice: 5,
    date: '2024-07-30T06:20:42.350+00:00',
    quantityHistory: [
      { _id: '77b88cda43773717cbdc19c9', quantity: 3, date: '2024-07-29T04:40:42.350+00:00' },
      { _id: '88c99cda43773717cbdc19c9', quantity: 2, date: '2024-07-28T03:40:42.350+00:00' },
    ],
  },
  {
    _id: '99d10cda43773717cbdc19c8',
    id: '4800361413480-818',
    name: 'Lucky Me Pancit Canton',
    price: 12,
    barcode: '4800361413482',
    quantity: 10,
    regularPrice: 11,
    date: '2024-07-30T07:10:42.350+00:00',
    quantityHistory: [
      { _id: '99d10cda43773717cbdc19c9', quantity: 5, date: '2024-07-29T06:40:42.350+00:00' },
      { _id: '00e11cda43773717cbdc19c9', quantity: 5, date: '2024-07-28T05:40:42.350+00:00' },
    ],
  },
  {
    _id: '11f12cda43773717cbdc19c8',
    id: '4800361413480-819',
    name: 'Coca-Cola 1.5L',
    price: 50,
    barcode: '4800361413483',
    quantity: 3,
    regularPrice: 48,
    date: '2024-07-30T08:00:42.350+00:00',
    quantityHistory: [
      { _id: '11f12cda43773717cbdc19c9', quantity: 2, date: '2024-07-29T07:40:42.350+00:00' },
      { _id: '22g13cda43773717cbdc19c9', quantity: 1, date: '2024-07-28T06:40:42.350+00:00' },
    ],
  },
];
