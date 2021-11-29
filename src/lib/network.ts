import axios, { AxiosError } from "axios";
import { CountryData } from "../types/lib/network";

const instance = axios.create({
  baseURL: "https://restcountries.com/v2",
});

const networkService = {
  async loadAllCountries() {
    try {
      const response = await instance.get<CountryData[]>("/all");
      const countries = response.data;
      return countries.map(({ flags, ...rest }) => ({
        ...rest,
        flagUrl: flags.svg,
      }));
    } catch (error) {
      const typedError = error as AxiosError;
      if (!typedError.request) {
        console.error("No Internet connection");
      } else if (typedError.response) {
        console.error(typedError.response.data);
        console.error(typedError.response.status);
      }
      return [];
    }
  },
};

export default networkService;
