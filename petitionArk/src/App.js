import './App.css';
import Page1 from './Components/Page1';
import Page2 from './Components/Page2';
import {
  BrowserRouter as Router,
  Routes,
  Route, Redirect,Navigate
} from "react-router-dom";
function App() {
  return (



    <Router>
      <Routes>
        <Route path="/join" element={<Page2/>}/>
        <Route path="/" element={<Page1/>}></Route>
      </Routes>
    </Router>

  );
}

export default App;
