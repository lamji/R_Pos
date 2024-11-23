import { dataType } from '../types/utang';

export const sampleData: dataType[] = [
  {
    id: 1,
    name: 'John Doe',
    total: 1500,
    items: [
      { itemName: 'Rice', quantity: 2, price: 500 },
      { itemName: 'Oil', quantity: 1, price: 500 },
      { itemName: 'Sugar', quantity: 1, price: 500 },
    ],
  },
  {
    id: 2,
    name: 'Jane Smith',
    total: 2000,
    items: [
      { itemName: 'Bread', quantity: 4, price: 500 },
      { itemName: 'Butter', quantity: 2, price: 1000 },
    ],
  },
  {
    id: 3,
    name: 'Alice Johnson',
    total: 3000,
    items: [{ itemName: 'Milk', quantity: 3, price: 1000 }],
  },
  {
    id: 4,
    name: 'Bob Brown',
    total: 1000,
    items: [{ itemName: 'Cheese', quantity: 2, price: 500 }],
  },
  {
    id: 5,
    name: 'Emily Davis',
    total: 2500,
    items: [{ itemName: 'Chicken', quantity: 2, price: 1250 }],
  },
  {
    id: 6,
    name: 'Michael Wilson',
    total: 4000,
    items: [{ itemName: 'Beef', quantity: 2, price: 2000 }],
  },
  {
    id: 7,
    name: 'Sophia Martinez',
    total: 1800,
    items: [{ itemName: 'Vegetables', quantity: 6, price: 300 }],
  },
];
