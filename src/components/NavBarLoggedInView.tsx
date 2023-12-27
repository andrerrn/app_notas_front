import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as NotesApi from "../network/notes_api";

interface NavBarLoggedInViewProps {
    user: User,
    onLoggoutSucessful: () => void,
}

const NavBarLoggedInView = ({user, onLoggoutSucessful}: NavBarLoggedInViewProps) => {

    async function logout() {
        try {
            await NotesApi.logout();
            onLoggoutSucessful();
        } catch (error) {
            alert(error);
            console.error(error)
        }
    }

    return ( 
        <>
        <Navbar.Text className="me-2">
            Logado como: {user.username}
        </Navbar.Text>
        <Button onClick={logout}>
        Desconectar
        </Button>
        </>
     );
}


export default NavBarLoggedInView;