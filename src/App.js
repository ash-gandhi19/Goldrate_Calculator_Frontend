import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Goldcalculator from "./components/Goldcalculator";


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Goldcalculator />} />
      
        <Route path="/goldcalc" element={<Goldcalculator />} />
       
      </Routes>
    </Router>
  );
}

export default App;
