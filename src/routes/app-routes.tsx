import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router';
import Home from '../pages/home';
import MainLayout from '../layouts/main-layout';
import { PrivateLayout, PublicOnlyLayout } from '../layouts/auth-layout';
import { LoginPage } from '../pages/login';
import RecipesPage from '../pages/recipes';
import ProfilePage from '../pages/profile';
import RegisterPage from '../pages/register';
import RecipeDetailPage from '../pages/recipe-detail';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route element={<PublicOnlyLayout />}>
        <Route
          path='/login'
          element={<LoginPage />}
        />
        <Route
          path='/register'
          element={<RegisterPage />}
        />
      </Route>

      <Route
        index
        element={<Home />}
      />
      <Route
        path='/recetas'
        element={<RecipesPage />}
      />
      <Route
        path='/recetas/:id'
        element={<RecipeDetailPage />}
      />

      <Route element={<PrivateLayout />}>
        <Route
          path='/crear'
          element={<h1>Crear</h1>}
        />
        <Route
          path='/favoritos'
          element={<h1>favoritos</h1>}
        />
        <Route
          path='/cuenta'
          element={<ProfilePage />}
        />
        <Route
          path='/cuenta/mis-recetas'
          element={<h1>Configuración de Cuenta</h1>}
        />
      </Route>
    </Route>
  )
);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
