import { Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";
import { Link } from "react-router-dom";

interface NavBarProps {
    loggedInUser?: User | null,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onLogoutSucessfull: () => void,
}

const NavBar = ({loggedInUser, onSignUpClicked, onLoginClicked, onLogoutSucessfull}: NavBarProps) => {
    return ( 
        <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as ={Link} to={'/'}>
                    App de anotações do Dedé
                </Navbar.Brand>
                <Navbar.Toggle aria-controls ="main-navbar" />
                <Navbar.Collapse id="mais-navbar">
                    <Nav>
                        <Nav.Link as={Link} to="/privacy">
                            Privacidade
                        </Nav.Link>                        
                    </Nav>
                    <Nav className = "ms-auto">
                        { loggedInUser
                        ? <NavBarLoggedInView user={loggedInUser} onLoggoutSucessful={onLogoutSucessfull} />
                        : <NavBarLoggedOutView onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked} />
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
     );
}
 
export default NavBar;