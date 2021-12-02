import axios, { AxiosError } from "axios";
import { CountryData } from "../types/lib/network";

const instance = axios.create({
  baseURL: "https://restcountries.com/v3.1",
});

const networkService = {
  async loadAllCountries() {
    try {
      const response = await instance.get<CountryData[]>(
        "/all?fields=name,population,region,capital,flags,cca3"
      );
      const countries = response.data;
      return countries.map(({ flags, name, cca3, ...rest }) => ({
        ...rest,
        flagUrl: flags.svg,
        name: name.common,
        code: cca3,
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
        `region/${region}?fields=name,population,region,capital,flags,cca3`
      );
      const countries = response.data;
      return countries.map(({ flags, name, cca3, ...rest }) => ({
        ...rest,
        flagUrl: flags.svg,
        name: name.common,
        code: cca3,
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

  async loadByName(name: string) {
    try {
      const response = await instance.get<Pick<CountryData, "name" | "cca3">[]>(
        `name/${name}?fields=name,cca3`
      );
      const countries = response.data;
      return countries.map(({ name, cca3 }) => ({
        name: name.common,
        code: cca3,
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
