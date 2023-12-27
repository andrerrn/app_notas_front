import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { loginCredencials } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import stylesUtils from "../styles/utils.modules.css";
import { useState } from "react";
import { UnauthorizedError } from "../errors/http.errors";

interface LoginModelProps {
    onDismiss: ( ) => void,
    onLoginSucessful: (user: User) => void,
}

const LoginModel = ({onDismiss, onLoginSucessful}: LoginModelProps) => {

    const [errorText, setErrorText] = useState<string | null>(null);
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<loginCredencials>();

    async function onSubmit(credentials:loginCredencials) {
        try {
            const user = await NotesApi.login(credentials);
            onLoginSucessful(user)
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                setErrorText(error.message);
            } else {
                alert(error);
                
            }
            
            console.error(error);
        }
    
    }

    return ( 
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Acessar
                </Modal.Title>
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
                    label="Usuario"
                    type="text"
                    placeholder="Usuário"
                    register={register}
                    registerOptions={{required:"Obrigatorio"}}
                    error={errors.username}
                    
                    />

                    <TextInputField
                    name="password"
                    label="Senha"
                    type="password"
                    placeholder="Senha"
                    register={register}
                    registerOptions={{required:"Obrigatório"}}
                    error={errors.password}
                    
                    />

                    <Button
                    type="submit"
                    disabled= {isSubmitting}
                    className="width100"
                    >
                        Acessar
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
     );
}
 
export default LoginModel;