export interface Demande {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string | null;
  sujet: string;
  message: string;
  paysResidence: string | null;
  traite: boolean;
  createdAt: string;
}
