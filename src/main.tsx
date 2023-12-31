import React from 'react'
import ReactDOM from 'react-dom/client'
import {store} from './redux/store';
import App from './App.tsx'
import './index.css' // Please import this of you want tailwindcss to work
import '@mantine/core/styles.css';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {MantineProvider, createTheme} from '@mantine/core';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import '@mantine/notifications/styles.css';
import {Notifications} from '@mantine/notifications';

const theme = createTheme({
    /** Put your mantine theme override here */
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Redux */}
        <Provider store={store}>
            <BrowserRouter>
                {/* Mantine Component library*/}
                <MantineProvider theme={theme}>
                    {/*Tanstack - react query lib*/}
                    <QueryClientProvider client={queryClient}>
                        <Notifications position="top-right" />
                        <App />
                    </QueryClientProvider>
                </MantineProvider>
            </BrowserRouter>
        </Provider>
  </React.StrictMode>,
)
