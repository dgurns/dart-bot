import util from 'util';
import { parseString } from 'xml2js';

// The proxy is used locally for CORS issues, and in production to
// avoid issues with requesting an insecure HTTP endpoint
const HTTPS_PROXY_URL = 'https://thingproxy.freeboard.io/fetch/';
const IRISH_RAIL_API_URL = 'http://api.irishrail.ie/realtime/realtime.asmx';
const API_URL = `${HTTPS_PROXY_URL}${IRISH_RAIL_API_URL}`;

export default async (req, res) => {
  const stationName = req.query?.stationName;
  const response = await fetch(
    `${API_URL}/getStationDataByNameXML?StationDesc=${stationName}`
  );
  const responseText = await response.text();
  const promisifiedParseString = util.promisify(parseString);
  const parsedXml = await promisifiedParseString(responseText);

  if (!parsedXml) {
    res.send(JSON.stringify([]));
  }

  const upcomingTrains = parsedXml.ArrayOfObjStationData?.objStationData ?? [];
  res.send(JSON.stringify(upcomingTrains));
};
