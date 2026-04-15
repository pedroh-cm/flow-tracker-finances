import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import Home from './page';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ComponentProps<'img'>) => {
    return createElement('img', { ...props, alt: props.alt ?? '' });
  },
}));

describe('Home page', () => {
  it('renders the main heading', () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html).toMatch(/To get started, edit the page\.tsx file\./i);
  });
});
