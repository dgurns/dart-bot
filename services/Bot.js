import IrishRail from 'services/IrishRail';

const TRIGGERS = {
  stationList: ['station list', 'stations', 'list', 'list of stations'],
  nextTwoTrains: IrishRail.getStationList(),
};

const checkForTrigger = (messageText, triggers) => {
  let triggerLocation = null;
  triggers.forEach((trigger) => {
    const sanitizedMessageText = messageText.toLowerCase();
    const sanitizedTrigger = trigger.toLowerCase();
    const indexOfTrigger = sanitizedMessageText.indexOf(sanitizedTrigger);
    if (indexOfTrigger > -1) {
      triggerLocation = {
        index: indexOfTrigger,
        length: trigger.length,
      };
      return;
    }
  });
  return triggerLocation;
};

const respondToUserMessage = (messageText) => {
  return new Promise(async (resolve) => {
    if (checkForTrigger(messageText, TRIGGERS.stationList)) {
      const formattedStationList = IrishRail.getStationList().join(', ');
      return resolve(formattedStationList);
    } else if (checkForTrigger(messageText, TRIGGERS.nextTwoTrains)) {
      const { index, length } = checkForTrigger(
        messageText,
        TRIGGERS.nextTwoTrains
      );
      const stationName = messageText.substr(index, length);
      const nextTwoTrains = await IrishRail.getNextTrainsAtStation(stationName);
      if (nextTwoTrains.length === 0) {
        return resolve(`No trains departing soon from ${stationName}`);
      }
      const formattedTrainDetails = nextTwoTrains
        .map((train) => `To ${train.Destination[0]} at ${train.Expdepart[0]}`)
        .join(', ');
      const formattedMessage = `Next trains departing from ${stationName}: ${formattedTrainDetails}`;
      return resolve(formattedMessage);
    } else {
      return resolve("Sorry, I don't know how to answer that");
    }
  });
};

export default {
  respondToUserMessage,
};
