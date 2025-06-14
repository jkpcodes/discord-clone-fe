import MuiThemeProvider from './context/MuiThemeProvider';
import { Provider } from 'react-redux';
import store from './store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import router from './router';
import { RouterProvider } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
