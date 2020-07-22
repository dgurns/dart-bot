import { STATION_LIST } from '../constants';

const getStationList = () => STATION_LIST;

const getNextTwoTrainsAtStation = async (stationName) => {
  try {
    const response = await fetch(
      `/api/upcoming-trains?stationName=${stationName}`
    );
    const responseJson = await response.json();

    const sortedUpcomingTrains = responseJson.sort((a, b) => {
      if (a.Expdepart[0] === '00:00') {
        return 1;
      } else if (b.Expdepart[0] === '00:00') {
        return -1;
      } else {
        return a.Expdepart[0] > b.Expdepart[0];
      }
    });
    return sortedUpcomingTrains.slice(0, 2);
  } catch {
    return [];
  }
};

export default {
  getStationList,
  getNextTwoTrainsAtStation,
};
