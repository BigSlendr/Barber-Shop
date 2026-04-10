import clsx from "clsx";

export const cn = (...inputs: Array<string | false | null | undefined>) => clsx(inputs);

export const currency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
