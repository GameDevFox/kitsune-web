const TicketGroup = (...initialItems) => {
  let idCounter = 0;
  const items = {};

  const result = () => Object.values(items);

  result.add = item => {
    const id = ++idCounter;
    items[id] = item;

    const remove = () => delete items[id];
    remove.id = id;
    return remove;
  };

  initialItems.forEach(result.add);

  return result;
};

export default TicketGroup;
