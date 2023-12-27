import { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Notes as NotesModel } from '../models/notes';
import * as NotesApi from "../network/notes_api";
import stylePage from '../styles/Note.Page.css';
import AddEditNoteDialog from "./AddEditNotesDialog";
import Note from "./Note";
import stylesUtil from '../styles/utils.modules.css';

const NotesPageLoggedInView = () => {
    const [notes, setNotes] = useState<NotesModel[]>([]);

    const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  
    const [noteToEdit, setNoteToEdit] = useState<NotesModel|null>(null);
    const [notesLoading, setNootesLoading] = useState(true);
    const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

    useEffect(() => {
        async function loadNotes() {
            try {
              setShowNotesLoadingError(false);
              setNootesLoading(true);
              const notes = await NotesApi.fetchNotes();
              setNotes(notes);
            } catch (error) {
              console.error(error);
              setShowNotesLoadingError(true);
            } finally {
              setNootesLoading(false);
            }
          }
          loadNotes();
        }, []);
      
        async function deleteNote(note:NotesModel) {
          try {
            await NotesApi.deleteNote(note._id);
            setNotes(notes.filter(existingNote => existingNote._id !== note._id));
          } catch (error) {
            console.error(error);
            alert(error);
          }
        }
      
        const notesGrid = 
          <Row xs={1} md= {2} xl={3} className={`'g-4' ${stylePage.notesGrid}`}>
              {notes.map(note => (
                <Col key={note._id}>
                  <Note note = {note}
                  className= {stylePage.note}
                  onNoteClicked={setNoteToEdit}
                  onDeleteNoteClicked={deleteNote}
                  />
                </Col>
                
              ))}
      
            </Row>
    
    return ( 
        <>
        <Button 
      className={`'mb-4' blockCenter flexCenter`}
      onClick={() => setShowAddNoteDialog(true)}>
        <FaPlus/>
        Adicionar nova nota
      </Button>
      {notesLoading && <Spinner animation = 'border' variant='primary' />}
      {showNotesLoadingError && <p>Algo aconteceu de errado, por favor atualize a página.</p>}
      {!notesLoading && !showNotesLoadingError && 
      <>
      {notes.length > 0
        ? notesGrid
        : <p>Você não tem nenhuma nota ainda.</p>


      }
      
      </>
      
      }

      {showAddNoteDialog &&
      <AddEditNoteDialog 
      onDismiss={() => setShowAddNoteDialog(false)}
      onNoteSaved={(newNote) => {
        setNotes([...notes, newNote]);
        setShowAddNoteDialog(false)
      }}
      />
        
      }
      {
        noteToEdit &&
        <AddEditNoteDialog
        noteToEdit={noteToEdit}
        onDismiss={() => setNoteToEdit(null)}
        onNoteSaved={(upDateNote) =>{
          setNotes(notes.map(existingNote=> existingNote._id === upDateNote._id ? upDateNote : existingNote));
          setNoteToEdit(null);
        }}/>
      }
        
        </>


     );
}
 
export default NotesPageLoggedInView;