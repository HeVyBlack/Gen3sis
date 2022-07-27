import axios from "axios";

const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common = {
      Authorization: token, // Set token recieved from backend, as a header, for every time, that frontend ask for info
    };
  } else {
    delete axios.defaults.headers.Authorization;
  }
};

export default setAuthHeader;
