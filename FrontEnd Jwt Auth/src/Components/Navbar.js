import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogoutUser from "./Pages/Auth/LogoutUser";

function Navbar() {
  const isLoggedIn =  JSON.parse(window.localStorage.getItem('isLoggedIn'))
  const navi = useNavigate()

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <NavLink className="navbar-brand" to="#">Navbar</NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-link" to="#">Pricing</NavLink>
          <NavLink className="nav-link disabled" to="#" tabindex="-1" aria-disabled="true">Disabled</NavLink>
          {isLoggedIn ? <span><NavLink className="nav-link active "  aria-current="page" to="/home/">Home</NavLink>  </span>
                         
          : <NavLink to='/login/' className="nav-link active "  aria-current="page">Home</NavLink>}

          {isLoggedIn ? <NavLink className="nav-link active "  aria-current="page" to="/profile/">Profile</NavLink> : null }

          {isLoggedIn ? null : <NavLink className="nav-link" to="/registeruser/" style={{'padding-left':'770px'}}>SIGNUP</NavLink>}

          {isLoggedIn ?  <NavLink className="nav-link active " style={{'margin-left':'600px'}}  aria-current="page" to='/change/password/'>ChangePassword</NavLink> : 
                          null }

          {isLoggedIn ?  <NavLink className="nav-link active " to = '/logout/' aria-current="page" >LOGOUT</NavLink> : 
                          <NavLink className="nav-link" to="/login/" >LOGIN</NavLink> }
          </div>
      </div>
    </div>
  </nav>
  )
}

export default Navbar;