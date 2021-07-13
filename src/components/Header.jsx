// project files
import logo from "../assets/images/logo.svg"

export default function Header(){
    return(
        <header className="header">
      <img
        className="logo"
        src={logo}
        alt="Logo of the company"
      />
      </header>
    )
}