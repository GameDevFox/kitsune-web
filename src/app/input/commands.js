import toastr from 'toastr';

import { forEachView } from '../view-tree/config';

const findCommand = name => {
  let command;

  forEachView(viewConfig => {
    const { commands = {} } = viewConfig;

    command = commands[name];
    if(command !== undefined)
      return false;
  });

  return command;
};

const command = cmdStr => {
  const args = cmdStr.split(/\s+/);
  const commandName = args.shift();

  const command = findCommand(commandName);

  if(command)
    command.apply(null, args);
  else
    toastr.error(`No such command: ${commandName}`);
};

export default command;
