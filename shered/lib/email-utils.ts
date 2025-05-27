import { renderToString } from 'react-dom/server';

export function renderEmailTemplate(component: React.ReactElement): string {
  return renderToString(component);
}
