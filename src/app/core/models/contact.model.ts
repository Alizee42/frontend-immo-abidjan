export interface ContactRequest {
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  sujet: string;
  message: string;
  paysResidence: string;
}
