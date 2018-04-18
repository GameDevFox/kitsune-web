import TicketGroup from './ticket-group';

const Split = (...outputs) => {
  const group = TicketGroup(...outputs);

  const split = (...args) => group().map(output => output(...args));
  split.add = output => group.add(output);

  return split;
};

export default Split;
