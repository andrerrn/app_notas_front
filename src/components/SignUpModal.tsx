import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { SignUpCredentials } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import stylesUtils from "../styles/utils.modules.css";
import { useState } from "react";
import { ConflictorError } from "../errors/http.errors";


interface SignUpModalProps {
    onDismiss: () => void,
    onSignUpSucessful: (user: User) => void,

}

const SignUpModal = ({onDismiss, onSignUpSucessful}: SignUpModalProps) => {

    const [errorText, setErrorText] = useState<string|null> (null);


    const { register, handleSubmit, formState: {errors, isSubmitting}} = useForm<SignUpCredentials>();

    async function onSubmit(credentials: SignUpCredentials) {
        try {
            const newUser = await NotesApi.SignUp(credentials);
            onSignUpSucessful(newUser);
        } catch (error) {
            if (error instanceof ConflictorError) {
                setErrorText (error.message);

            } else{
                alert(error);
            }
            
            console.error(error);
        }
    }

    return ( 
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                Cadastrar
            </Modal.Header>
            <Modal.Body>
                {errorText &&
                <Alert variant="danger">
                    {errorText}
                </Alert>
                }

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                    name="username"
                    label="Usuário"
                    type="text"
                    placeholder="Usuário"
                    register={register}
                    registerOptions={{required:"Obrigatório"}}
                    error= {errors.username}
                    />

                    <TextInputField
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Email"
                    register={register}
                    registerOptions={{required:"Obrigatório"}}
                    error= {errors.email}
                    />
                    
                    <TextInputField
                    name="password"
                    label="Senha"
                    type="password"
                    placeholder="Senha"
                    register={register}
                    registerOptions={{required:"Obrigatório"}}
                    error= {errors.password}
                    />
                    
                    <Button
                    type="submit"
                    disabled= {isSubmitting}
                    className="width100"
                    >
                        Cadastrar
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
     );
}
 
export default SignUpModal;