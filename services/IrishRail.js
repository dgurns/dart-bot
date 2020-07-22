import { parseString } from 'xml2js';
import util from 'util';
import { STATION_LIST } from '../constants';

const LOCAL_PROXY_URL = 'https://thingproxy.freeboard.io/fetch/';
const IRISH_RAIL_API_URL = 'http://api.irishrail.ie/realtime/realtime.asmx';
const API_URL =
  process.env.NODE_ENV === 'development'
    ? `${LOCAL_PROXY_URL}${IRISH_RAIL_API_URL}`
    : IRISH_RAIL_API_URL;

const makeApiRequest = async (endpoint) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`);
    const responseText = await response.text();
    const promisifiedParseString = util.promisify(parseString);
    const parsedXml = await promisifiedParseString(responseText);
    return [parsedXml];
  } catch (error) {
    return [undefined, error];
  }
};

const getStationList = () => STATION_LIST;

const getNextTwoTrainsAtStation = async (stationName) => {
  const [response] = await makeApiRequest(
    `getStationDataByNameXML?StationDesc=${stationName}`
  );
  if (!response) {
    return [];
  }
  const upcomingTrains = response.ArrayOfObjStationData?.objStationData ?? [];
  const sortedUpcomingTrains = upcomingTrains.sort((a, b) => {
    if (a.Expdepart[0] === '00:00') {
      return 1;
    } else if (b.Expdepart[0] === '00:00') {
      return -1;
    } else {
      return a.Expdepart[0] > b.Expdepart[0];
    }
  });
  return sortedUpcomingTrains.slice(0, 2);
};

export default {
  getStationList,
  getNextTwoTrainsAtStation,
};
