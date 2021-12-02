import type { Props as CountryCardProps } from "../../components/CountryCard";
export interface CountryData
  extends Omit<CountryCardProps, "flagUrl" | "name" | "code"> {
  flags: {
    svg: string;
  };
  name: {
    common: string;
  };
  cca3: string;
}
