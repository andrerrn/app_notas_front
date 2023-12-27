import { Button, Form, Modal } from "react-bootstrap";
import { NoteInput } from "../network/notes_api";
import { useForm } from "react-hook-form";
import { Notes } from "../models/notes";
import * as NotesApi from "../network/notes_api"
import TextInputField from "./form/TextInputField";


interface AddEditNotesDialogProps {
    noteToEdit?: Notes,
    onDismiss: () => void,
    onNoteSaved: (note:Notes) => void,

}

const AddEditNoteDialog = ({noteToEdit, onDismiss, onNoteSaved}: AddEditNotesDialogProps) => {

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdit?.title || "",
            text: noteToEdit?.text || "",
        }
    });

    async function onSubmit(input:NoteInput) {
        try {
            let noteResponse: Notes;
            if (noteToEdit) {
                noteResponse = await NotesApi.upDateNote(noteToEdit._id, input);
            } else {
                noteResponse = await NotesApi.createNote(input);
            }

            onNoteSaved(noteResponse);
        } catch (error) {
            console.error(error);
            alert("Ocorreu um erro ao criar a nota");
            
        }
    }

    return ( 
        <Modal show onHide ={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {noteToEdit ? "Edite a nota" : "Adicione uma nota"}
                </Modal.Title>

            </Modal.Header>
            <Modal.Body>
                <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                    name="title"
                    label="Título"
                    type="text"
                    placeholder="Título"
                    register={register}
                    registerOptions={{required:"required"}}
                    error = {errors.title}
                    />

                    <TextInputField
                    name="text"
                    label="Texto"
                    as="textarea"
                    rows={5}
                    placeholder="Texto"
                    register={register}
                    />

                    
                    

                    
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}
                >
                    Salvar
                </Button>
            </Modal.Footer>
        </Modal>
     );
}
 
export default AddEditNoteDialog;