const generateRandomDate = () => {
  const start = new Date(2020, 0, 1); // Start date: Jan 1, 2020
  const end = new Date(); // End date: current date
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const mockReports = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d8',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-545571e29d8',
    title: 'Third Item',
  },
  {
    id: '68694a0f-3da1-471f-bd96-545571e29d8',
    title: 'Third Item',
  },
  {
    id: '28694a0f-3da1-471f-bd96-545571e29d8',
    title: 'Third Item',
  },
];
