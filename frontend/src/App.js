// Import CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Index from "./components/Index";

function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
