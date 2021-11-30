import type { Props as CountryCardProps } from "../../components/CountryCard";
export interface CountryData
  extends Omit<CountryCardProps, "flagUrl" | "name"> {
  flags: {
    svg: string;
  };
  name: {
    common: string;
  };
}
