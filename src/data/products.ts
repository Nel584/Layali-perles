import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // Parures Féminines
  {
    id: 'baya-elegance-1',
    name: 'Baya Élégance Royale',
    subtitle: 'Perles de rocaille dorées & cristaux d’ambre',
    category: 'femme',
    categoryLabel: 'Parures Féminines',
    price: 8000,
    originalPrice: 10000,
    image: '/catalog/femme-1.jpg',
    secondaryImage: '/catalog/femme-2.jpg',
    description: 'Baya traditionnel raffiné confectionné avec des perles de rocaille de haute précision et des touches dorées étincelantes. Conçu pour rehausser la cambrure naturelle et sublimer la féminité.',
    materials: 'Perles de rocaille tchèques, fil ultra-résistant ciré, fermoir laiton doré',
    sizes: ['70 cm (XS/S)', '80 cm (M)', '90 cm (L)', '100 cm (XL)', 'Sur-mesure'],
    isTopSeller: true,
    stock: 14,
    meaning: 'Symbole de grâce, de fertilité et d’affirmation de la féminité ancestrale.'
  },
  {
    id: 'baya-rose-cristal',
    name: 'Baya Rose Cristal Envoûtant',
    subtitle: 'Cristaux roses scintillants & perles nacrées',
    category: 'femme',
    categoryLabel: 'Parures Féminines',
    price: 8000,
    image: '/catalog/femme-2.jpg',
    secondaryImage: '/catalog/femme-3.jpg',
    description: 'Une parure de taille délicate aux teintes pastel et reflets irisés. Légère et douce sur la peau, parfaite pour le quotidien comme pour les occasions intimes.',
    materials: 'Cristaux taillés, perles d’eau nacrées, fil tressé indéchirable',
    sizes: ['70 cm (XS/S)', '80 cm (M)', '90 cm (L)', '100 cm (XL)', 'Sur-mesure'],
    isTopSeller: true,
    stock: 9,
    meaning: 'Incarne la douceur, l’amour bienveillant et l’harmonie des énergies.'
  },
  {
    id: 'baya-floral-trio',
    name: 'Trio Floral Sensuel',
    subtitle: 'Ensemble de 3 bayas multicolores assortis',
    category: 'femme',
    categoryLabel: 'Parures Féminines',
    price: 15000,
    originalPrice: 18000,
    image: '/catalog/femme-3.jpg',
    secondaryImage: '/catalog/femme-4.webp',
    description: 'Ensemble de trois bayas fins et harmonieux pouvant être portés superposés ou séparément. Le jeu des couleurs fait scintiller chaque mouvement de hanches.',
    materials: 'Perles de verre soufflé, perles fines à reflets, fil élastique renforcé',
    sizes: ['75 cm (S/M)', '85 cm (M/L)', '95 cm (L/XL)', 'Sur-mesure'],
    isNew: true,
    stock: 8,
    meaning: 'La trilogie sacrée de la beauté, de la séduction subtile et du magnétisme.'
  },
  {
    id: 'baya-black-magic',
    name: 'Baya Black Magic Obsidienne',
    subtitle: 'Perles noires ébène & accents dorés 18K',
    category: 'femme',
    categoryLabel: 'Parures Féminines',
    price: 9500,
    image: '/catalog/femme-5.jpg',
    secondaryImage: '/catalog/femme-6.jpg',
    description: 'Un contraste saisissant entre le noir profond et la brillance de l’or. Une pièce maîtresse pour mettre en valeur les teints d’ébène et les courbes sculptées.',
    materials: 'Perles de verre noir mat & brillant, intercalaires dorés',
    sizes: ['70 cm (XS/S)', '80 cm (M)', '90 cm (L)', '100 cm (XL)', 'Sur-mesure'],
    isTopSeller: true,
    stock: 12,
    meaning: 'Force, protection contre les mauvaises ondes et assurance royale.'
  },
  {
    id: 'baya-ocean-soul',
    name: 'Baya Ocean Soul Caoris',
    subtitle: 'Perles turquoise lagune & coquillages sacrés',
    category: 'femme',
    categoryLabel: 'Parures Féminines',
    price: 8500,
    image: '/catalog/femme-9.jpg',
    secondaryImage: '/catalog/femme-10.webp',
    description: 'Inspiré par les côtes de Ouidah et Grand-Popo, ce baya allie des nuances d’azur marin à des caoris symbolisant prospérité et sagesse.',
    materials: 'Perles turquoise synthétiques, caoris naturels polis, fil marin',
    sizes: ['70 cm (XS/S)', '80 cm (M)', '90 cm (L)', '100 cm (XL)', 'Sur-mesure'],
    stock: 11,
    meaning: 'Paix intérieure, bénédiction de l’océan et prospérité continue.'
  },
  {
    id: 'baya-sensual-gold',
    name: 'Baya Divine Sensualité',
    subtitle: 'Perles de verre ambré & perles traditionnelles',
    category: 'femme',
    categoryLabel: 'Parures Féminines',
    price: 8000,
    image: '/catalog/femme-10.webp',
    secondaryImage: '/catalog/femme-11.webp',
    description: 'Une alliance de perles au tintement discret et suave qui accompagne la démarche avec une sensualité raffinée.',
    materials: 'Perles de verre ambré artisanales, finitions satinées',
    sizes: ['70 cm (XS/S)', '80 cm (M)', '90 cm (L)', '100 cm (XL)', 'Sur-mesure'],
    stock: 16,
    meaning: 'Éveil des sens, confidence corporelle et charme irrésistible.'
  },

  // Prestige Masculin
  {
    id: 'homme-couronne-alex',
    name: 'Bracelet Alex Couronne Impériale',
    subtitle: 'Pierres de lave volcanique & couronne d’onyx',
    category: 'homme',
    categoryLabel: 'Prestige Masculin',
    price: 10000,
    originalPrice: 12500,
    image: '/catalog/homme-1.jpg',
    secondaryImage: '/catalog/homme-2.jpg',
    description: 'Bracelet masculin d’une stature imposante et sobre. Les billes de pierre volcanique poreuse peuvent absorber quelques gouttes d’huile essentielle pour un sillage subtil.',
    materials: 'Pierre de lave naturelle 8mm, couronne alliage zingué vieilli, cordon élastique haute densité',
    sizes: ['18 cm (Poignet fin)', '20 cm (Poignet standard)', '22 cm (Poignet fort)'],
    isTopSeller: true,
    stock: 15,
    meaning: 'Souveraineté personnelle, ancrage à la terre et sang-froid.'
  },
  {
    id: 'homme-hematite-prestige',
    name: 'Bracelet Hématite Miroir Noir',
    subtitle: 'Hématite facettée & perles d’obsidienne',
    category: 'homme',
    categoryLabel: 'Prestige Masculin',
    price: 9000,
    image: '/catalog/homme-2.jpg',
    secondaryImage: '/catalog/homme-3.jpg',
    description: 'Reflets métalliques sombres et poids noble au poignet. Se porte idéalement avec une montre ou en solitaire.',
    materials: 'Hématite magnétique polie, perles d’obsidienne noire',
    sizes: ['18 cm (Poignet fin)', '20 cm (Poignet standard)', '22 cm (Poignet fort)'],
    stock: 10,
    meaning: 'Clarté d’esprit, protection mentale et équilibre énergétique.'
  },
  {
    id: 'homme-tigre-royal',
    name: 'Bracelet Œil de Tigre Protecteur',
    subtitle: 'Gemmes œil de tigre doré & perles mates',
    category: 'homme',
    categoryLabel: 'Prestige Masculin',
    price: 10000,
    image: '/catalog/homme-3.jpg',
    secondaryImage: '/catalog/homme-4.jpg',
    description: 'Les chatoyances dorées et brunes de l’œil de tigre créent une aura de prestance naturelle et de confiance inébranlable.',
    materials: 'Œil de tigre grade A, perles d’onyx mat 10mm',
    sizes: ['18 cm (Poignet fin)', '20 cm (Poignet standard)', '22 cm (Poignet fort)'],
    isNew: true,
    stock: 7,
    meaning: 'Courage, détermination dans les affaires et barrière contre les doutes.'
  },
  {
    id: 'homme-duo-monarque',
    name: 'Duo Monarque Africain',
    subtitle: 'Double rangée de perles nobles & motifs géométriques',
    category: 'homme',
    categoryLabel: 'Prestige Masculin',
    price: 12000,
    image: '/catalog/homme-5.png',
    secondaryImage: '/catalog/homme-6.jpg',
    description: 'Un double bracelet pensé pour l’homme contemporain fier de son héritage. L’association de textures mates et brillantes offre une prestance immédiate.',
    materials: 'Pierres semi-précieuses, perles tribales gravées',
    sizes: ['19 cm (Standard)', '21 cm (Large)'],
    stock: 8,
    meaning: 'Honneur, respect des anciens et modernité assumée.'
  },

  // Alliances et Harmonie (Bracelets Couple)
  {
    id: 'couple-yin-yang',
    name: 'Duo Complice Yin & Yang',
    subtitle: 'Paire de bracelets assortis homme & femme',
    category: 'couple',
    categoryLabel: 'Alliances & Harmonie',
    price: 12000,
    originalPrice: 15000,
    image: '/catalog/couple-1.jpg',
    secondaryImage: '/catalog/couple-2.webp',
    description: 'Un set composé de deux bracelets complémentaires : un blanc marbré howlita et un noir mat volcanique, chacun portant une bille de la couleur de l’autre.',
    materials: 'Howlite blanche marbrée, pierre de lave noire, élastique japonais ultra-durable',
    sizes: ['Femme 16cm + Homme 19cm', 'Femme 17cm + Homme 20cm', 'Sur-mesure'],
    isTopSeller: true,
    stock: 18,
    meaning: 'Le lien invisible mais indéfectible qui unit deux cœurs complémentaires.'
  },
  {
    id: 'couple-aimant-eternel',
    name: 'Parure Duo Aimant Éternel',
    subtitle: 'Bracelets avec pendentifs magnétiques qui s’attirent',
    category: 'couple',
    categoryLabel: 'Alliances & Harmonie',
    price: 14000,
    image: '/catalog/couple-3.jpg',
    secondaryImage: '/catalog/couple-4.webp',
    description: 'Lorsque les mains se rapprochent, les deux demi-sphères magnétiques s’unissent pour former un cœur parfait. Le cadeau d’amour par excellence.',
    materials: 'Perles mates anti-rayures, aimants néodyme scellés inoxydable',
    sizes: ['Taille ajustable pour les deux poignets'],
    isNew: true,
    stock: 13,
    meaning: 'Deux âmes faites pour se rencontrer et ne plus jamais se perdre.'
  },
  {
    id: 'couple-infini-or',
    name: 'Alliances Infini Or & Perles',
    subtitle: 'Bracelets précieux avec symbole infini doré',
    category: 'couple',
    categoryLabel: 'Alliances & Harmonie',
    price: 13500,
    image: '/catalog/couple-5.webp',
    secondaryImage: '/catalog/couple-6.jpg',
    description: 'Finition soignée avec breloques dorées résistantes à l’eau et au temps. Confortables à porter 24h/24 sans irritation.',
    materials: 'Perles calibrées, breloques dorure longue durée sans nickel',
    sizes: ['Ajustable duo standard'],
    stock: 10,
    meaning: 'Promesse de fidélité, complicité sincère et longévité.'
  },

  // Modèles avec motifs & créations exclusives
  {
    id: 'motif-ange-soleil',
    name: 'Chaîne de Ventre Ange Solaire',
    subtitle: 'Motifs sculptés & perles dorées d’Afrique',
    category: 'motifs',
    categoryLabel: 'Créations & Motifs',
    price: 11000,
    image: '/catalog/motif-4.webp',
    secondaryImage: '/catalog/motif-1.jpg',
    description: 'Une création sur chaîne travaillée ornée de perles traditionnelles béninoises. Épouse la taille avec une sensualité divine sous une robe ou un crop top.',
    materials: 'Chaîne hypoallergénique dorée, perles de taille travaillées',
    sizes: ['70 cm + chaînette 10cm', '80 cm + chaînette 10cm', '90 cm + chaînette 10cm'],
    isTopSeller: true,
    stock: 6,
    meaning: 'Rayonnement intérieur, éclat solaire et confiance reine.'
  },
  {
    id: 'motif-waist-rouge-or',
    name: 'Baya Rubis Passion & Ivoire',
    subtitle: 'Perles de verre rouge carmin & perles crème',
    category: 'motifs',
    categoryLabel: 'Créations & Motifs',
    price: 9000,
    image: '/catalog/motif-5.jpg',
    secondaryImage: '/catalog/motif-6.jpg',
    description: 'La passion du rouge entremêlée à la pureté des perles d’ivoire végétal. Une signature visuelle captivante pour la lingerie et les moments intimes.',
    materials: 'Perles de verre tchèque carmin, perles de rocaille ivoire',
    sizes: ['75 cm', '85 cm', '95 cm', '105 cm', 'Sur-mesure'],
    stock: 12,
    meaning: 'Passion ardente, désir partagé et affirmation de soi.'
  },
  {
    id: 'motif-tradition-ancestrale',
    name: 'Parure Héritage du Danxomè',
    subtitle: 'Perles anciennes en terre cuite et verre patiné',
    category: 'motifs',
    categoryLabel: 'Créations & Motifs',
    price: 13000,
    image: '/catalog/motif-2.jpg',
    secondaryImage: '/catalog/motif-3.jpg',
    description: 'Conçue selon les méthodes de montage traditionnelles des cours royales d’Abomey. Chaque perle raconte un dicton fon transmis de mère en fille.',
    materials: 'Perles de verre moulées à la main, fil de coton ciré fort',
    sizes: ['80 cm', '90 cm', '100 cm', 'Sur-mesure'],
    stock: 5,
    meaning: 'Héritage des reines amazones, puissance royale et transmission.'
  }
];

export const HERO_SLIDES = [
  {
    image: '/catalog/hero-1.png',
    title: 'Affirmez votre essence à votre taille',
    tagline: 'Artisanat & Tradition d’Afrique',
    desc: 'Des bijoux et bayas faits main qui célèbrent vos courbes, votre assurance et l’élégance intemporelle.'
  },
  {
    image: '/catalog/hero-2.png',
    title: 'Alliances complices & harmonie',
    tagline: 'Sets de couple exclusifs',
    desc: 'Des créations pensées pour lier deux destins avec des pierres nobles et une finition irréprochable.'
  },
  {
    image: '/catalog/hero-3.png',
    title: 'Perles de séduction & confiance',
    tagline: 'Fait main à Cotonou, Bénin',
    desc: 'Chaque pièce est assemblée à la main avec passion pour sublimer toutes les silhouettes.'
  },
  {
    image: '/catalog/hero-5.webp',
    title: 'Rayonnez au quotidien',
    tagline: 'Matières d’exception',
    desc: 'Des cristaux scintillants et des perles de rocaille sélectionnées pour un éclat inaltérable.'
  }
];

export const SIZE_GUIDE_DATA = [
  {
    range: '65 - 75 cm',
    label: 'Taille XS / S',
    tips: 'Idéal pour port au creux de la taille (au-dessus du nombril) ou hanches très fines.'
  },
  {
    range: '75 - 85 cm',
    label: 'Taille M',
    tips: 'Taille standard la plus demandée. Convient pour port autour du nombril ou hanches moyennes.'
  },
  {
    range: '85 - 95 cm',
    label: 'Taille L',
    tips: 'Parfait pour un port sur les hanches basses ou silhouette pulpeuse.'
  },
  {
    range: '95 - 110 cm',
    label: 'Taille XL / XXL',
    tips: 'Sublime les hanches généreuses et silhouettes aux courbes voluptueuses.'
  },
  {
    range: '110+ cm ou Spécifique',
    label: 'Sur-Mesure Offert',
    tips: 'Indiquez simplement votre tour en cm lors de votre commande, nous ajustons gratuitement au millimètre.'
  }
];
