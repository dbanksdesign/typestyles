export { getRegisteredCss } from 'typestyles/server';

export interface TypestylesStylesheetProps {
  children?: React.ReactNode;
}

export function TypestylesStylesheet(props: TypestylesStylesheetProps): React.JSX.Element;

export function collectStylesFromComponent(component: React.ReactElement): Promise<string>;

export function createTypestylesLayout<P extends { children?: React.ReactNode }>(
  layout: (props: P) => React.ReactNode,
): (props: P) => React.JSX.Element;
