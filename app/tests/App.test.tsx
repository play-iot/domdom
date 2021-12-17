import { render } from '@testing-library/react';
import App from 'src/App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Ant Design/i);
  expect(linkElement).toBeInTheDocument();
});
