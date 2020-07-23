import { STATION_LIST } from '../constants';

const getStationList = () => STATION_LIST;

const getNextTwoTrainsAtStation = async (stationName) => {
  try {
    const response = await fetch(
      `/api/upcoming-trains?stationName=${encodeURIComponent(stationName)}`
    );
    const responseJson = await response.json();

    const sortedUpcomingTrains = responseJson.sort((a, b) => {
      const aTimeStartsWithZero = a.Expdepart[0][0] === '0';
      const bTimeStartsWithZero = b.Expdepart[0][0] === '0';
      if (aTimeStartsWithZero && !bTimeStartsWithZero) {
        return 1;
      } else if (!aTimeStartsWithZero && bTimeStartsWithZero) {
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
