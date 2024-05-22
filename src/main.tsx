
import './index.css';

import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import { NodeProvider } from './contexts/NodeContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <NodeProvider>
    <App />
  </NodeProvider>
);
