import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {faGithub,faLinkedin,faSafari,} from "@fortawesome/free-brands-svg-icons";
//import links from "../assets/links.json";


export default function Footer() {
  return (
    <footer>
      <ol>
        <li>
          <a href= "mailto:sailathatammana1997@gmail.com" target="blank" className="icon">
            <FontAwesomeIcon icon={faEnvelope} className="icon " size="2x" />
          </a>
        </li>

        <li>
          <a href= "https://github.com/sailathatammana" target="blank">
            <FontAwesomeIcon icon={faGithub} className="icon " size="2x" />
          </a>
        </li>

        <li>
          <a href= "https://www.linkedin.com/in/sai-latha-tammana/" target="blank">
            <FontAwesomeIcon icon={faLinkedin} className="icon " size="2x" />
          </a>
        </li>
      </ol>
    </footer>
  );
}