import axios, { AxiosError } from "axios";
import { CountryData } from "../types/lib/network";

const instance = axios.create({
  baseURL: "https://restcountries.com/v3.1",
});

const networkService = {
  async loadAllCountries() {
    try {
      const response = await instance.get<CountryData[]>(
        "/all?fields=name,population,region,capital,flags"
      );
      const countries = response.data;
      return countries.map(({ flags, name, ...rest }) => ({
        ...rest,
        flagUrl: flags.svg,
        name: name.common,
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

  async loadByRegion(region: string) {
    try {
      const response = await instance.get<CountryData[]>(
        `region/${region}?fields=name,population,region,capital,flags`
      );
      const countries = response.data;
      return countries.map(({ flags, name, ...rest }) => ({
        ...rest,
        flagUrl: flags.svg,
        name: name.common,
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
