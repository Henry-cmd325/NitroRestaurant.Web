import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/Login/LoginPage'
import SalesPage from './pages/Sales/SalesPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import ProductsPage from './pages/Products/ProductsPage'
import EmployeePage from './pages/Employees/EmployeePage'
import CreateEmployeePage from './pages/CreateEmployees/CreateEmployeePage'
import CreateProductPage from './pages/CreateProduct/CreateProductPage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <SalesPage/>
            </ProtectedRoute>}
          />
          <Route path="/sales" element={
            <ProtectedRoute>
              <SalesPage/>
            </ProtectedRoute>}
          />
          <Route path="/products" element={
            <ProtectedRoute>
              <ProductsPage/>
            </ProtectedRoute>}
          />
          <Route path="/employees" element={
            <ProtectedRoute>
              <EmployeePage/>
            </ProtectedRoute>
          }/>
          <Route path="/create-employee" element={
            <ProtectedRoute>
              <CreateEmployeePage/>
            </ProtectedRoute>
          }/>
          <Route path="/create-product" element={
            <ProtectedRoute>
              <CreateProductPage/>
            </ProtectedRoute>
          }/>

          <Route path="/login" element={<LoginPage/>} />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
