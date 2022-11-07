import PropTypes from "prop-types";
import Button from "./Button.jsx";
import { useLocation } from "react-router-dom";
const Header = ({ title, show, toggle }) => {
  const location = useLocation();
  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname == "/" ? (
        <Button
          color={show ? "red" : "green"}
          text={show ? "Hide" : "Add"}
          toggle={toggle}
        />
      ) : (
        ""
      )}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

/* CSS using JS
const headingStyle = { color: "red", backgroundColor: "black" };
*/
export default Header;
