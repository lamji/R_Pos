type Item = {
  itemName: string;
  quantity: number;
  price: number;
};

export type dataType = {
  id: number;
  name: string;
  total: number;
  items: Item[];
};
