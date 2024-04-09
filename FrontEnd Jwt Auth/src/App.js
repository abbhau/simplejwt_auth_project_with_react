import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LoginUser from "./Components/Pages/Auth/LoginUser";
import Navbar from './Components/Navbar';
import UsercreationForm from './Components/Pages/Auth/UsercreationForm';
import UserProfile from './Components/Pages/Auth/UserProfile';
import ResetPassword from './Components/Pages/Auth/ResetPassword';
import ForgotPassword from './Components/Pages/Auth/ForgotPassword';
import Profile from './Components/Pages/Profie';
import ChangePassword from './Components/Pages/Auth/ChangePassword';
import LoginRequired from './Components/Pages/Auth/LoginRequired';
import LogoutUser from './Components/Pages/Auth/LogoutUser';

function App() {
  return (
    <div>
      <BrowserRouter>
          <Navbar/>
        <Routes>
            <Route path='/registeruser/' element={<UsercreationForm/>}/>
            <Route path='/change/password/' element={<LoginRequired Component={ChangePassword}/>} />
            <Route path='/login/' element={<LoginUser/>}/>
            <Route path='/UserProfile/' element={<UserProfile/>}/>
            <Route path='/profile/' element={<LoginRequired Component={Profile}/>} />
            <Route path='/User/forget/' element={<ForgotPassword/>}/>
            <Route path='/api/user/reset/:uid/:token' element={<ResetPassword/>}/>
            <Route path='/logout/' element={<LogoutUser/>}/>
          </Routes>
      </BrowserRouter>
    </div>
);
}

export default App;