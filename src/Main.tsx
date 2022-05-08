import { ReactElement } from 'react';
import logo512 from './logo512.png';

export default function Main({ children }: { children: ReactElement }) {
  return (
    <div className="main">
      <img className="main-logo" src={logo512} width="512" height="512" />
      {children}
    </div>
  );
}
