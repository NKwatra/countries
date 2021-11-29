import type { Props as CountryCardProps } from "../../components/CountryCard";
export interface CountryData extends Omit<CountryCardProps, "flagUrl"> {
  flags: {
    svg: string;
  };
}
