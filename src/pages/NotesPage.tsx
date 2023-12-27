import { Container } from "react-bootstrap";
import NotesPageLoggedInView from "../components/NotesPageLoggedInView";
import NotesPageLoggedOutView from "../components/NotesPageLoggedOutView";
import stylesPage from '../styles/utils.modules.css';
import stylo from '../styles/Note.Page.css'
import { User } from "../models/user";

interface NotesPageProps {
    loggedInUser: User | null,
}

const NotesPage = ({loggedInUser}: NotesPageProps) => {
    return ( 
        <Container className= {stylo.notesPage}>
      
      <>
      {loggedInUser
      ? <NotesPageLoggedInView />
      : <NotesPageLoggedOutView />
      }
      </>

      
    </Container>

     );
}
 
export default NotesPage;