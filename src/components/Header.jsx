import logo from "../assets/images/logo.png";

export default function Header() {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="logo" />
    </header>
  );
}
