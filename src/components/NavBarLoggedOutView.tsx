import { Button } from "react-bootstrap";

interface NavBarLoggedOutViewProps {
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
}

const NavBarLoggedOutView = ({onSignUpClicked, onLoginClicked}: NavBarLoggedOutViewProps) => {
    return ( 
        <>
        <Button onClick={onSignUpClicked}>Cadastrar</Button>
        <Button onClick={onLoginClicked}>Acessar</Button>
        </>
     );
}
 
export default NavBarLoggedOutView;