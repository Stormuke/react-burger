export interface BurgerConstructorProps {
  activeTab: (value: string) => void;
}
export interface Tabs {
  active: boolean;
  onClick: (value: string) => void;
  title: string;
  value: string;
}
