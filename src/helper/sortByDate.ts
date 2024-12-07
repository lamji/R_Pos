export const sortByDate = (objects: any) => {
  objects.sort((a: any, b: any) => a.date - b.date);
};
