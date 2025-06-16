import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PublicRouter from './public/PublicRouter'
import HomePage from '../components/HomePage'
import AboutPage from '../components/AboutPage'
import LoginPage from '../components/LoginPage'
import AdminPage from '../components/AdminPage'
import CategoriaPage from '../components/CategoriaPage'
import ProductoPage from '../components/ProductoPage'
import PrivateRouter from './private/PrivateRouter'
import PageNotFound from '../components/PageNotFound'

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PublicRouter />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<PrivateRouter />}>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/categoria" element={<CategoriaPage />} />
        <Route path="/producto" element={<ProductoPage />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />

    </Routes>
  )
}

export default AppRouter