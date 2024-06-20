import women from "./../../assets/images/women.jpeg";
import classes from "./navbar.module.css";
const Navbar: React.FunctionComponent = () => {
  return (
    <div className={classes.parent}>
      <h2 className={classes.heading}>Find a coffee shop anywhere</h2>
      <img className={classes.profile} src={women} alt="" />
    </div>
  );
};

export default Navbar;
