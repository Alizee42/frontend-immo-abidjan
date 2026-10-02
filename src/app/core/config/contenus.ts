// Contenus des pages modifiables depuis l'admin (rubrique « Pages du site »).
// DEFAUTS : textes affichés tant que rien n'a été enregistré.
// SCHEMAS : description des formulaires de l'éditeur générique.

// ===== Description des champs de l'éditeur =====
export type TypeChamp = 'texte' | 'zone' | 'image' | 'liste-images' | 'liste-textes' | 'liste' | 'etape' | 'case';

export interface Champ {
  cle: string;
  label: string;
  type: TypeChamp;
  aide?: string;
  // Pour type « liste » : champs de chaque élément
  champs?: Champ[];
  // Pour type « liste » : nombre d'éléments fixe (pas d'ajout ni de suppression)
  fixe?: boolean;
  // Pour type « liste » : élément créé par le bouton « Ajouter »
  nouveau?: Record<string, unknown>;
}

export interface SectionEditeur {
  titre: string;
  champs: Champ[];
}

export interface PageEditable {
  cle: 'accueil' | 'vision' | 'a-propos';
  nom: string;
  description: string;
  lien: string;
  sections: SectionEditeur[];
}

// ===== ACCUEIL =====
export const DEFAUT_ACCUEIL = {
  heroLieu: "Songon Agban · Côte d'Ivoire",
  heroTitre: 'Un domaine familial.',
  heroTitreItalique: 'Une vision pour Abidjan.',
  heroAccroche:
    'Sur son domaine familial de Songon Agban, la SCI-AGD développe un programme résidentiel de plus de 400 logements — pensé pour durer, ouvert à l\'achat comme à la location.',
  slides: ['/images/defaut/hero-1.jpg', '/images/defaut/hero-2.jpg', '/images/defaut/hero-3.jpg'],
  chiffres: [
    { valeur: '124', unite: 'ha', label: 'Domaine de Songon', detail: 'couvert par un ACD' },
    { valeur: '20', unite: 'ha', label: 'Programme immobilier', detail: 'dont 12 ha résidentiels' },
    { valeur: '400', unite: '+', label: 'Logements prévus', detail: 'sur SOBE 1, 2 et 3' },
    { valeur: '3', unite: '', label: 'Frères fondateurs', detail: 'famille Atchan' },
  ],
  domaineTitre: 'Un héritage foncier, engagé avec mesure',
  domaineTexte1:
    'Le domaine de Songon appartient à la famille Atchan, originaire de Songon Agban. Sur les 124 hectares couverts par un ACD, la SCI-AGD n\'a mobilisé que 20 hectares pour son programme immobilier actuel.',
  domaineTexte2:
    'Les 104 hectares restants sont volontairement laissés en réserve foncière, préservés juridiquement — une décision qui protège l\'avenir de la famille plutôt que de financer un projet limité.',
  domaineImage: '/images/defaut/domaine.jpg',
  domaineLegende: '124 ha · ACD au nom de la famille Atchan',
  sobeTitre: 'Trois quartiers, un même cœur résidentiel',
  sobeTexte:
    'SOBE 1, 2 et 3 forment le programme résidentiel du domaine : plus de 400 logements sur 12 hectares, entre terrains viabilisés et maisons clés en main.',
  sobePoints: [
    'Vente, location et location-vente',
    'Domaine couvert par un ACD au nom de la famille Atchan',
    'Réponses à distance pour la diaspora',
  ],
  sobeImage: '/images/defaut/sobe-2.jpg',
  sobeLegende: '12 ha · 400+ logements',
  mission: [
    {
      titre: 'Préserver',
      texte: 'Sécuriser juridiquement le foncier familial. 104 des 124 hectares restent en réserve, volontairement non engagés dans le programme immobilier.',
    },
    {
      titre: 'Construire',
      texte: 'Développer un programme immobilier maîtrisé — les quartiers SOBE — sur les 20 hectares mobilisés, avec des maisons pensées pour durer.',
    },
    {
      titre: 'Loger',
      texte: 'Offrir des solutions accessibles à l\'achat comme à la location, pour les familles d\'Abidjan comme pour la diaspora.',
    },
  ],
  projetsAVenir: [
    {
      nom: 'Centre commercial familial',
      surface: '3 ha',
      statut: 'Projet à l\'étude',
      texte: 'Un retail park de proximité : supermarché, boutiques, restauration et loisirs familiaux, développé progressivement.',
    },
    {
      nom: 'Projet hôtelier de Songon',
      surface: '3 000 m²',
      statut: 'Concept à préciser',
      texte: 'Une emprise réservée pour un futur hôtel. Positionnement, capacité et calendrier restent à définir.',
    },
  ],
  finalTitre: 'Où que vous soyez,',
  finalTitreItalique: 'votre place vous attend à Songon.',
  finalTexte: 'Vous vivez en France, au Canada ou ailleurs ? Contactez-nous : nous répondons à toutes vos questions à distance.',
};
export type ContenuAccueil = typeof DEFAUT_ACCUEIL;

// ===== VISION =====
export const DEFAUT_VISION = {
  introTexte: 'Préserver, Construire, Loger : la vision foncière et immobilière portée par la SCI-AGD sur le domaine de Songon.',
  foncierTitre: 'Une vision immobilière familiale',
  foncierTexte1:
    'La SCI-AGD, fondée par trois frères Atchan originaires de Songon Agban, porte une vision immobilière familiale autour d\'une mission : Préserver, Construire, Loger.',
  foncierTexte2:
    'Le domaine de Songon représente 124 hectares couverts par un ACD. Sur cette surface, 20 hectares sont aujourd\'hui mobilisés pour le programme immobilier, tandis que 104 hectares restent en réserve foncière, préservée juridiquement et distincte du programme engagé.',
  foncierImage: '/images/defaut/terrain.jpg',
  sobe: [
    { num: '01', nom: 'SOBE 1', quartier: 'QUARTIER_1', couleur: '#2E8B57', image: '/images/defaut/sobe-1.jpg', description: 'Premier quartier résidentiel du programme.', statut: 'Surface, typologies et calendrier : précisés prochainement.' },
    { num: '02', nom: 'SOBE 2', quartier: 'QUARTIER_2', couleur: '#1A3C6E', image: '/images/defaut/sobe-2.jpg', description: 'Second quartier résidentiel, pensé en continuité avec SOBE 1.', statut: 'Surface, typologies et calendrier : précisés prochainement.' },
    { num: '03', nom: 'SOBE 3', quartier: 'QUARTIER_3', couleur: '#B8860B', image: '/images/defaut/sobe-3.jpg', description: 'Troisième quartier résidentiel du domaine.', statut: 'Surface, typologies et calendrier : précisés prochainement.' },
  ],
  atouts: [
    { icone: 'bouclier', titre: 'Foncier sécurisé juridiquement', texte: 'Le domaine de 124 hectares est couvert par un ACD au nom de la famille Atchan. La réserve foncière est préservée et distincte du programme immobilier engagé.' },
    { icone: 'famille', titre: 'Vision familiale', texte: 'La SCI-AGD est portée par trois frères originaires de Songon Agban, autour d\'une mission commune : Préserver, Construire, Loger.' },
    { icone: 'formules', titre: 'Vente et location', texte: 'Que vous souhaitiez acheter pour habiter, louer ou investir, les quartiers SOBE proposent plusieurs formules.' },
    { icone: 'monde', titre: 'Accessibilité internationale', texte: 'Vous vivez à l\'étranger ? Nous répondons à toutes vos questions à distance.' },
  ],
  projetsFuturs: [
    {
      nom: 'Centre commercial familial',
      surface: '3 ha',
      image: '/images/defaut/projet-commerce.jpg',
      etape: 1,
      intro: 'Un retail park de proximité, développé progressivement pour servir les habitants des quartiers SOBE et des environs.',
      envisage: ['Supermarché', 'Boutiques et services', 'Restauration', 'Loisirs familiaux', 'Stationnements', 'Réserve d\'extension'],
      aDefinir: ['Plan et délimitation des 3 ha', 'Accès et façade routière', 'Financement', 'Calendrier'],
    },
    {
      nom: 'Projet hôtelier de Songon',
      surface: '3 000 m²',
      image: '/images/defaut/projet-hotel.jpg',
      etape: 0,
      intro: 'Une emprise réservée pour un futur hôtel à Songon. Le concept reste entièrement à construire.',
      envisage: ['Emplacement réservé de 3 000 m²'],
      aDefinir: ['Positionnement', 'Capacité', 'Prestations', 'Budget', 'Calendrier'],
    },
  ],
};
export type ContenuVision = typeof DEFAUT_VISION;

// ===== À PROPOS =====
export const DEFAUT_A_PROPOS = {
  histoireTexte1:
    'La SCI-AGD (Société Civile Immobilière) a été fondée par trois frères de la famille Atchan, originaires de Songon Agban, en Côte d\'Ivoire.',
  citation: 'Transformer un héritage foncier familial en un projet immobilier structuré, transparent et durable.',
  histoireTexte2:
    'Le domaine de Songon couvre 124 hectares, sous ACD au nom de la famille Atchan. Plutôt que de tout engager, la famille a choisi de mobiliser progressivement une partie du domaine — 20 hectares à ce jour — pour un programme immobilier maîtrisé, en préservant juridiquement le reste pour l\'avenir.',
  histoireImage: '/images/defaut/domaine.jpg',
  histoireLegende: 'Songon Agban · Côte d\'Ivoire',
  etapes: [
    { repere: 'L\'héritage', titre: 'Le domaine de Songon', texte: '124 hectares à Songon Agban, couverts par un ACD au nom de la famille Atchan.', avenir: false },
    { repere: 'La création', titre: 'Naissance de la SCI-AGD', texte: 'Trois frères de la famille Atchan décident de structurer ensemble l\'avenir du domaine.', avenir: false },
    { repere: 'Le choix', titre: 'Préserver avant de construire', texte: '104 hectares restent en réserve foncière. Seuls 20 hectares sont mobilisés pour le programme immobilier.', avenir: false },
    { repere: 'Aujourd\'hui', titre: 'Les quartiers SOBE 1, 2 et 3', texte: 'Le programme résidentiel prend forme sur 12 hectares, avec un potentiel de plus de 400 logements.', avenir: false },
    { repere: 'Demain', titre: 'La suite du domaine', texte: 'Un centre commercial familial et un projet hôtelier sont à l\'étude pour compléter le programme.', avenir: true },
  ],
};
export type ContenuAPropos = typeof DEFAUT_A_PROPOS;

export const ETAPES_PROJET = ['Idée', 'Étude', 'Financement', 'Construction', 'Ouverture'];

// ===== Formulaires de l'éditeur =====
export const PAGES_EDITABLES: PageEditable[] = [
  {
    cle: 'accueil',
    nom: 'Accueil',
    description: 'Carrousel, chiffres clés, domaine, quartiers SOBE, mission et projets à venir.',
    lien: '/',
    sections: [
      {
        titre: 'En-tête',
        champs: [
          { cle: 'slides', label: 'Photos du carrousel', type: 'liste-images', aide: "Les photos défilent dans l'ordre affiché." },
          { cle: 'heroLieu', label: 'Surtitre', type: 'texte' },
          { cle: 'heroTitre', label: 'Titre (1re ligne)', type: 'texte' },
          { cle: 'heroTitreItalique', label: 'Titre (2e ligne, en italique)', type: 'texte' },
          { cle: 'heroAccroche', label: 'Accroche', type: 'zone' },
        ],
      },
      {
        titre: 'Chiffres clés',
        champs: [
          {
            cle: 'chiffres', label: 'Chiffres', type: 'liste', nouveau: { valeur: '', unite: '', label: '', detail: '' },
            champs: [
              { cle: 'valeur', label: 'Valeur', type: 'texte' },
              { cle: 'unite', label: 'Unité', type: 'texte' },
              { cle: 'label', label: 'Libellé', type: 'texte' },
              { cle: 'detail', label: 'Détail', type: 'texte' },
            ],
          },
        ],
      },
      {
        titre: 'Le domaine',
        champs: [
          { cle: 'domaineTitre', label: 'Titre', type: 'texte' },
          { cle: 'domaineTexte1', label: 'Premier paragraphe', type: 'zone' },
          { cle: 'domaineTexte2', label: 'Second paragraphe', type: 'zone' },
          { cle: 'domaineImage', label: 'Photo', type: 'image' },
          { cle: 'domaineLegende', label: 'Légende de la photo', type: 'texte' },
        ],
      },
      {
        titre: 'Quartiers SOBE',
        champs: [
          { cle: 'sobeTitre', label: 'Titre', type: 'texte' },
          { cle: 'sobeTexte', label: 'Texte', type: 'zone' },
          { cle: 'sobePoints', label: 'Points forts', type: 'liste-textes' },
          { cle: 'sobeImage', label: 'Photo', type: 'image' },
          { cle: 'sobeLegende', label: 'Légende de la photo', type: 'texte' },
        ],
      },
      {
        titre: 'Mission',
        champs: [
          {
            cle: 'mission', label: 'Piliers de la mission', type: 'liste', fixe: true,
            champs: [
              { cle: 'titre', label: 'Titre', type: 'texte' },
              { cle: 'texte', label: 'Texte', type: 'zone' },
            ],
          },
        ],
      },
      {
        titre: 'À venir sur le domaine',
        champs: [
          {
            cle: 'projetsAVenir', label: 'Projets', type: 'liste', nouveau: { nom: '', surface: '', statut: 'Projet à l\'étude', texte: '' },
            champs: [
              { cle: 'nom', label: 'Nom', type: 'texte' },
              { cle: 'surface', label: 'Surface', type: 'texte' },
              { cle: 'statut', label: 'Statut', type: 'texte' },
              { cle: 'texte', label: 'Description', type: 'zone' },
            ],
          },
        ],
      },
      {
        titre: 'Appel final',
        champs: [
          { cle: 'finalTitre', label: 'Titre (1re ligne)', type: 'texte' },
          { cle: 'finalTitreItalique', label: 'Titre (2e ligne, en italique)', type: 'texte' },
          { cle: 'finalTexte', label: 'Texte', type: 'zone' },
        ],
      },
    ],
  },
  {
    cle: 'vision',
    nom: 'Vision',
    description: 'Présentation du foncier, fiches SOBE, atouts et projets à venir.',
    lien: '/vision',
    sections: [
      {
        titre: 'En-tête et foncier',
        champs: [
          { cle: 'introTexte', label: "Texte d'introduction", type: 'zone' },
          { cle: 'foncierTitre', label: 'Titre de la section foncier', type: 'texte' },
          { cle: 'foncierTexte1', label: 'Premier paragraphe', type: 'zone' },
          { cle: 'foncierTexte2', label: 'Second paragraphe', type: 'zone' },
          { cle: 'foncierImage', label: 'Photo', type: 'image' },
        ],
      },
      {
        titre: 'Quartiers SOBE',
        champs: [
          {
            cle: 'sobe', label: 'Fiches des quartiers', type: 'liste', fixe: true,
            champs: [
              { cle: 'nom', label: 'Nom', type: 'texte' },
              { cle: 'description', label: 'Description', type: 'zone' },
              { cle: 'statut', label: 'Avancement / précisions', type: 'texte' },
              { cle: 'image', label: 'Photo', type: 'image' },
            ],
          },
        ],
      },
      {
        titre: 'Pourquoi la SCI-AGD',
        champs: [
          {
            cle: 'atouts', label: 'Atouts', type: 'liste', fixe: true,
            champs: [
              { cle: 'titre', label: 'Titre', type: 'texte' },
              { cle: 'texte', label: 'Texte', type: 'zone' },
            ],
          },
        ],
      },
      {
        titre: 'Projets à venir',
        champs: [
          {
            cle: 'projetsFuturs', label: 'Projets', type: 'liste',
            nouveau: { nom: '', surface: '', image: '/images/defaut/terrain.jpg', etape: 0, intro: '', envisage: [], aDefinir: [] },
            champs: [
              { cle: 'nom', label: 'Nom', type: 'texte' },
              { cle: 'surface', label: 'Surface', type: 'texte' },
              { cle: 'etape', label: 'Étape actuelle', type: 'etape' },
              { cle: 'intro', label: 'Présentation', type: 'zone' },
              { cle: 'envisage', label: 'Envisagé', type: 'liste-textes' },
              { cle: 'aDefinir', label: 'Reste à définir', type: 'liste-textes' },
              { cle: 'image', label: "Image d'illustration", type: 'image' },
            ],
          },
        ],
      },
    ],
  },
  {
    cle: 'a-propos',
    nom: 'À propos',
    description: "Histoire de la SCI-AGD et frise du parcours.",
    lien: '/a-propos',
    sections: [
      {
        titre: 'Histoire',
        champs: [
          { cle: 'histoireTexte1', label: 'Premier paragraphe', type: 'zone' },
          { cle: 'citation', label: 'Citation', type: 'zone' },
          { cle: 'histoireTexte2', label: 'Second paragraphe', type: 'zone' },
          { cle: 'histoireImage', label: 'Photo', type: 'image' },
          { cle: 'histoireLegende', label: 'Légende de la photo', type: 'texte' },
        ],
      },
      {
        titre: 'Notre parcours',
        champs: [
          {
            cle: 'etapes', label: 'Étapes', type: 'liste', nouveau: { repere: '', titre: '', texte: '', avenir: false },
            champs: [
              { cle: 'repere', label: 'Repère (ou année)', type: 'texte' },
              { cle: 'titre', label: 'Titre', type: 'texte' },
              { cle: 'texte', label: 'Texte', type: 'zone' },
              { cle: 'avenir', label: 'Étape à venir (affichée en pointillés)', type: 'case' },
            ],
          },
        ],
      },
    ],
  },
];

export const DEFAUTS_PAGES = {
  accueil: DEFAUT_ACCUEIL,
  vision: DEFAUT_VISION,
  'a-propos': DEFAUT_A_PROPOS,
};
