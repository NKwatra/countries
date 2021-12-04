import type { Props as CountryCardProps } from "../../components/CountryCard";
export interface CountryData
  extends Omit<CountryCardProps, "flagUrl" | "name" | "code" | "capital"> {
  capital: string[];
  flags: {
    svg: string;
  };
  name: {
    common: string;
    nativeName: { [key: string]: { common: string } };
  };
  cca3: string;
}

export interface CountryDetail extends Omit<CountryData, "cca3"> {
  subregion: string;
  currencies: { [key: string]: { name: string } };
  languages: { [key: string]: string };
  tld: string[];
  borders: string[];
}

export interface CountryName {
  name: string;
  code: string;
}
