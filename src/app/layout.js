import { Provider } from 'react-redux';
import store from '../store/store';
import { CssBaseline } from '@mui/material';

export default function Layout({ children }) {
  return (
    <Provider store={store}>
      <CssBaseline />
      {children}
    </Provider>
  );
}
