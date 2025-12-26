export interface Formateur {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    cin: string;
    photo?: string;
    phone: number;
    specialite?: string[];
    cv: string;
}