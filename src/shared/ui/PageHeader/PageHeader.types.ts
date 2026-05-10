import { BreadcrumbsRouteName, NavigationRoute } from '@/shared/config/routes';

interface IPageHeaderBaseProps {
  children: React.ReactNode;
  pageName: BreadcrumbsRouteName | null;
  title: React.ReactNode;
}

interface IPageHeaderOuterProps extends IPageHeaderBaseProps {
  mode: 'outer';
}

interface IPageHeaderInnerProps extends IPageHeaderBaseProps {
  mode: 'inner';
  to: NavigationRoute;
}

export type IPageHeader = IPageHeaderOuterProps | IPageHeaderInnerProps;
