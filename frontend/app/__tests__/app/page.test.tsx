import { render, screen, cleanup } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Page', () => {
  beforeAll(() => {
    cleanup();
  });

  it('renders Hello World', () => {
    render(<Home />);
    expect(
      screen.getByRole('heading', { name: /hello world/i }),
    ).toBeInTheDocument();
  });

  it('snapshot test', () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
