import { useEffect, useState } from 'react';
import LoginModel from './components/LoginModel';
import NavBar from './components/NavBar';
import SignUpModal from './components/SignUpModal';
import { User } from './models/user';
import * as NotesApi from "./network/notes_api";
import './styles/Note.Page.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NotesPage from './pages/NotesPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';
import stylo from './styles/App.module.css';

function App() {

  const [loggedInUser, setLoggedInUser] = useState<User|null> (null);

  const [showSignModal, setShowSignUpModal] = useState (false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fecthLoggedInUser() {
      try {
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fecthLoggedInUser();
  }, []);
  

  return (
    <BrowserRouter>
    
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={()=> setShowLoginModal(true)}
        onSignUpClicked={()=> setShowSignUpModal(true)}
        onLogoutSucessfull={()=> setLoggedInUser(null)}
      />
    
    <Container className={stylo.pageContainer}>
      <Routes>
        <Route
          path='/'
          element={<NotesPage loggedInUser = {loggedInUser}/>}

        />

        <Route
          path = '/privacy'
          element = {<PrivacyPage />}
        />

        <Route
          path = '/*'
          element = {<NotFoundPage/>}
        />
      </Routes>
    </Container>
    {showSignModal &&
      <SignUpModal
        onDismiss={() => setShowSignUpModal(false)}
        onSignUpSucessful={(user) => {
          setLoggedInUser(user);
          setShowSignUpModal(false);
        }}
        />
      }

      {showLoginModal &&
      <LoginModel
        onDismiss={()=> setShowLoginModal(false)}
        onLoginSucessful={(user) => {
          setLoggedInUser(user);
          setShowLoginModal(false);
        }}
        />
      }
    </div>
    </BrowserRouter>
  );
}

export default App;
