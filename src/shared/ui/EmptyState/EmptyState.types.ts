export interface IEmptyStateProps {
  title: string;
  subtitle: string;
  action?: {
    handler: () => void;
    buttonName: string;
  };
}
