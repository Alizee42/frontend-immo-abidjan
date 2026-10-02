// Coordonnées par défaut du site. Les valeurs enregistrées dans l'admin
// (Paramètres) les remplacent ; un champ vide n'est pas affiché.
export interface Coordonnees {
  localisation: string;
  email: string;
  telephone: string;
  whatsapp: string;
}

export const COORDONNEES: Coordonnees = {
  localisation: "Songon Agban, Côte d'Ivoire",
  email: '',
  telephone: '',
  whatsapp: '',
};
