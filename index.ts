import { config } from "dotenv";
import axios from "axios";

config();

const url = (path: string): string => `https://api.productive.io/api/v2${path}`;
const headers = {
  "Content-Type": "application/vnd.api+json",
  "X-Auth-Token": process.env.TOKEN,
  "X-Organization-Id": process.env.ORG_ID,
};

const client = {
  get: (url: string) => axios.get(url, { headers }),
};

(async () => {
  try {
    const res = await client.get(url("/time_entries"));
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
})();
