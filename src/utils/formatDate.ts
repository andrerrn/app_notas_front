export function formatDate(dataString:string) {

    return new Date(dataString).toLocaleDateString("pt-BR",
    {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });
    
}