import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Landing from "./pages/Landing.jsx"
import Response from "./pages/Response.jsx"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/analyze" element={<Home />} />
      <Route path="/response" element={<Response />} />
    </Routes>
  )
}

export default App
