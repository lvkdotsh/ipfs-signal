import { BrowserRouter } from 'react-router-dom';

import { App } from './App';

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the get rickrolled by the{' '}
    <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
      Terms of Service
    </Link>{' '}
    and acknowledge you have lost{' '}
    <Link href="https://edgeserver.io/">The Game</Link>
  </Text>
);

export const Document = () => {
  return (
    <BrowserRouter>
      <div className="dark:bg-black-800 dark:text-white text-black-800 bg-neutral-100 w-full min-h-screen">
        <App />
      </div>
    </BrowserRouter>
  );
};
