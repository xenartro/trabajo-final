import { render } from '@testing-library/react';
import App from './App';

test('Renders the app without errors', () => {
  const { container } = render(<App />);

  expect(container).toMatchSnapshot();
});
