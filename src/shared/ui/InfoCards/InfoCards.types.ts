export interface IInfoCardsProps {
  items: {
    label: string;
    value: number | null | undefined;
  }[];
  isLoading: boolean;
}
