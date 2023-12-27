import '../styles/Note.modules.css';
import '../styles/utils.modules.css';
import { Notes as NoteModel} from "../models/notes";
import {Card} from "react-bootstrap";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";

interface NoteProps {
    note: NoteModel,
    onNoteClicked: (note: NoteModel) => void,
    onDeleteNoteClicked: (note: NoteModel) => void,
    className?: string,
}

const Note = ({ note,onNoteClicked,onDeleteNoteClicked, className } : NoteProps) => {
    const {
        title,
        text,
        createdAt,
        updateAt
    } = note;

    let createdUpdateText: string;
    if (updateAt>createdAt) {
        createdUpdateText = "Atualizado: " + formatDate(updateAt);
    } else {
        createdUpdateText = "Criado: " + formatDate (createdAt);
    }


    return (
       <Card className={`noteCard ${className}`} 
       onClick={() => onNoteClicked(note)}
       >
            <Card.Body className='cardBody'>
                <Card.Title className='flexCenter'>
                    {note.title}
                    <MdDelete 
                    className='text muted ms-auto'
                    onClick={(e) => {
                        onDeleteNoteClicked(note);
                        e.stopPropagation();
                    }}
                    />
                </Card.Title>
                <Card.Text className='cardText'>
                    {text}
                </Card.Text>
                <Card.Footer className="text-muted">
                    {createdUpdateText}
                </Card.Footer>
            </Card.Body>
       </Card>
    )
}

export default Note;