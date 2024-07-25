import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SERP from "./SERP"
import App from './App'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)
console.log("main file")
root.render(
  <BrowserRouter >
    <Routes>
      <Route path='/stock/:symbol' element={<SERP />} />
      <Route path='/' element={<App />} />
    </Routes>
  </BrowserRouter>
)
