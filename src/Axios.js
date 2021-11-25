// https://zcctapticket.zendesk.com/api/v2/tickets.json

//Get Tickets
// https://zcctapticket.zendesk.com/api/v2/tickets.json

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

export default instance;
