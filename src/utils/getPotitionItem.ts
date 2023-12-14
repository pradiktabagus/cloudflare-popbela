function getPositionItem(page: number, index: number, pagination: number) {
  let position: number = 1;
  position = pagination * page - pagination + index;
  return position;
}
export { getPositionItem };
