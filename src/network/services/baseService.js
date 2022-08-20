import axios from "axios";

export const baseService = {};

baseService.get = async (url, endpoint) => {
  let response;

  try {
    response = await axios.get(url + endpoint);
    return response;
  } catch (error) {
    console.log(`\nbaseService.get: ${url + endpoint}\nerror: ${error}\nresponse: ${response}`);
  }
};
