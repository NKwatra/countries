import axios from "axios";
import type { CountryData, CountryDetail } from "../types/lib/network";
import type { useQueryResponse } from "./hooks";
import { Props as CountryCardProps } from "../components/CountryCard";
import type { Props as CountryDetailProps } from "../routes/Country";
import { Suggestion } from "../components/Searchbar";

const instance = axios.create({
  baseURL: "https://restcountries.com/v3.1",
});

async function loadCountrySummary(
  path: string
): Promise<useQueryResponse<CountryCardProps[]>> {
  try {
    const response = await instance.get<CountryData[]>(
      `${path}?fields=name,population,region,capital,flags,cca3`
    );
    const countries = response.data;
    return {
      status: "success",
      data: countries.map(({ flags, name, cca3, capital, ...rest }) => ({
        ...rest,
        flagUrl: flags.svg,
        name: name.common,
        code: cca3,
        capital: capital.length > 0 ? capital[0] : "Not Available",
      })),
    };
  } catch (error) {
    return {
      status: "error",
    };
  }
}

const networkService = {
  async loadAllCountries(): Promise<useQueryResponse<CountryCardProps[]>> {
    return await loadCountrySummary("/all");
  },

  async loadByRegion({
    region,
  }: {
    region: string;
  }): Promise<useQueryResponse<CountryCardProps[]>> {
    return await loadCountrySummary(`/region/${region}`);
  },

  async loadByName({
    name,
  }: {
    name: string;
  }): Promise<useQueryResponse<Suggestion[]>> {
    try {
      const response = await instance.get<Pick<CountryData, "name" | "cca3">[]>(
        `name/${name}?fields=name,cca3`
      );
      const countries = response.data;
      return {
        status: "success",
        data: countries.map(({ name, cca3 }) => ({
          name: name.common,
          code: cca3,
        })),
      };
    } catch (error) {
      return {
        status: "error",
      };
    }
  },

  async loadByCode({
    code,
  }: {
    code: string;
  }): Promise<useQueryResponse<CountryDetailProps>> {
    try {
      const response = await instance.get<CountryDetail>(
        `alpha/${code}?fields=name,population,region,capital,subregion,languages,flags,currencies,tld`
      );
      const country = response.data;
      const { flags, name, currencies, languages, tld, capital, ...rest } =
        country;

      const nativeNames = Object.entries(name.nativeName);
      const nativeName =
        nativeNames.length > 0 ? nativeNames[0][1].common : "Not Available";
      const cap = capital.length > 0 ? capital[0] : "Not Available";
      return {
        status: "success",
        data: {
          ...rest,
          flagUrl: flags.svg,
          name: name.common,
          nativeName,
          tld: tld.join(", "),
          currencies: Object.values(currencies).join(","),
          languages: Object.values(languages).join(","),
          capital: cap,
        },
      };
    } catch (error) {
      return { status: "error" };
    }
  },
};

export default networkService;
