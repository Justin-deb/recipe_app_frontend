import { BrowserRouter, Route, Routes } from 'react-router';
import Home from '../pages/home';
import MainLayout from '../layouts/main-layout';
import { PrivateLayout, PublicOnlyLayout } from '../layouts/auth-layout';
import { LoginPage } from '../pages/login';
import RecipesPage from '../pages/recipes';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout de diseno principal */}
        <Route element={<MainLayout />}>
          {/* Rutas exclusivamente publicas */}
          <Route element={<PublicOnlyLayout />}>
            <Route
              path='/login'
              element={<LoginPage />}
            />
            <Route
              path='/register'
              element={<h1>Página de Registro</h1>}
            />
          </Route>

          {/* rutas publicas (cualquiera las puede ver) */}
          <Route
            index
            element={<Home />}
          />
          <Route
            path='/recetas'
            element={<RecipesPage />}
          />

          {/* RUTAS PRIVADAS (ocupan login y estan adentro de MainLayout) */}
          <Route element={<PrivateLayout />}>
            {/* Ruta base de cuenta */}
            <Route
              path='/crear'
              element={<Home />}
            />
            <Route
              path='/favoritos'
              element={<Home />}
            />
            <Route
              path='/cuenta'
              element={<h1>Tu Perfil Principal</h1>}
            />
            <Route
              path='/cuenta/mis-recetas'
              element={<h1>Configuración de Cuenta</h1>}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
