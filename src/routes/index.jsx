import { BrowserRouter } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
    const { user } = useAuth();
    return( // Se tem conteúdo dentro de user vai mostrar o AppRoutes senão vai mostrar o AuthRoutes.
        <BrowserRouter>
            { user ? <AppRoutes /> : <AuthRoutes />}
        </BrowserRouter>
    );
}