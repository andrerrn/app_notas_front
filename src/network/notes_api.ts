import { ConflictorError, UnauthorizedError } from "../errors/http.errors";
import {Notes} from "../models/notes";
import { User } from "../models/user";

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch (input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error();

        if (response.status === 401) {
            throw new UnauthorizedError(errorMessage);
        } else if (response.status === 409) {
            throw new ConflictorError(errorMessage);

        } else {
            throw Error ("Request falhou com o status: " + response.status + " mensagem: " + errorMessage);
        }
        
        
        
    }
}

export async function getLoggedInUser(): Promise<User> { 
    const response = await fetchData("https://dulcet-crumble-3edb79.netlify.app/api/users", {method: "GET"});

    return response.json();
}

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string,
}

export async function SignUp(credencials:SignUpCredentials): Promise <User> {
    const response = await fetchData("https://dulcet-crumble-3edb79.netlify.app/api/users/signup",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credencials),
    });
    return response.json();
}

export interface loginCredencials {
    username: string,
    password: string,
}

export async function login(credencials:loginCredencials): Promise <User> {
    const response = await fetchData("https://dulcet-crumble-3edb79.netlify.app/api/users/login",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credencials),
    });
    return response.json();
}

export async function logout() {
    await fetchData("https://dulcet-crumble-3edb79.netlify.app/api/users/logout", {method: "POST"})
}

export async function fetchNotes(): Promise<Notes[]> {
    const response = await fetchData("https://dulcet-crumble-3edb79.netlify.app/api/notes", {method: "GET"});
    return response.json();
}

export interface NoteInput {
    title: string,
    text?: string,

}

export async function createNote (note: NoteInput): Promise<Notes> {
    const response = await fetchData("https://dulcet-crumble-3edb79.netlify.app/api/notes",
        {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(note),
        }
    );
    return response.json();

}

export async function upDateNote(noteId:string, note: NoteInput): Promise<Notes> {
    const response = await fetchData("https://dulcet-crumble-3edb79.netlify.app/api/notes/" + noteId, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(note),
    });

    return response.json();

}

export async function deleteNote (noteId: string) {
    await fetchData("https://dulcet-crumble-3edb79.netlify.app/api/notes/" + noteId, {method: "DELETE"});

}