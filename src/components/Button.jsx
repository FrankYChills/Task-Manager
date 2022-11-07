import PropTypes from "prop-types";
const Button = ({ color, text, toggle }) => {
  return (
    <button className="btn" style={{ backgroundColor: color }} onClick={toggle}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  color: "steelblue",
};
Button.propTypes = {
  text: PropTypes.string.isRequired,
};
export default Button;
