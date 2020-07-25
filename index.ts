import { config } from "dotenv";
import axios from "axios";

const url = (path: string): string => `https://api.productive.io/api/v2${path}`;
const headers = { "Content-Type": "application/vnd.api+json" };

const client = {
  get: (url: string) => axios(url, { headers }),
};

config();

(async () => {
  try {
    const res = await client.get(url("/time_entries"));
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
})();
