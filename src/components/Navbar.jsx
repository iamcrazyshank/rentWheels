import { Link } from "react-router-dom";
import Logo from "../images/logo/logo.png";

function Navbar() {

  return (
    <>
      <nav>

        <div className="navbar">
          <div className="navbar__img">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <img src={Logo} alt="logo-img" className="rotating-logo" />
            </Link>
          </div>
          <div className="navbar__title"> 
          <h2 style={{ fontSize: "4.5em", color: "#ec7063", textDecoration:"underline wavy #ec7063 5px" }}>Wheels2Rent</h2>
          </div>
          
          <div className="navbar__buttons">
            <Link className="navbar__buttons__sign-in" to="/">
              Customer Login
            </Link>
            <Link className="navbar__buttons__admin" to="/admin">
              Admin
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
