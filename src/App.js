import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/homeContainer/home';
import Login from './components/loginContainer/login';
import PublicRoute from './components/routeElement/publicRoute';
import PrivateRoute from './components/routeElement/privateRoute';
import Register from './components/registerContainer/register';

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute><Login/></PrivateRoute>}/>
          <Route path="home/*" element={<PublicRoute><Home/></PublicRoute>}/>
          <Route path="register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    );
}

export default App;
