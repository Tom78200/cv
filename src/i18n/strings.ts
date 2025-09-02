import type { SupportedLanguage } from '../context/LanguageContext'

export const strings = {
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À propos',
      experience: 'Expériences',
      skills: 'Compétences',
      contact: 'Contact',
      languageFr: 'Français',
      languageEn: 'English',
    },
    hero: {
      title: 'Entrepreneur Web 3.0',
      slogans: [
        'Entrepreneur en Web 3.0 basé à Paris',
        'Smart contracts, dApps et expériences immersives',
        'Full Stack: React, Node.js, Solidity, Solana',
      ],
      statsYears: "Années d'expérience",
      statsTechs: 'Technologies maîtrisées',
      scroll: 'Scroll pour découvrir',
    },
    about: {
      title: 'À propos',
      paragraphs: [
        "Je ne me contente pas de développer des applications : je veux créer un nouveau monde. Un monde où le Web 3.0 n’est pas seulement une évolution technologique, mais une véritable révolution dans notre façon de concevoir, d’échanger et de collaborer.",
        "Entrepreneur passionné, j’aspire à repousser les limites de ce que l’on croit possible dans l’univers numérique. Mon objectif est d’innover en permanence, de proposer des solutions uniques et sur mesure, capables de répondre aux besoins de tout type d’entreprise, de projet ou de professionnel.",
        "Grâce à mon expertise Full Stack et en blockchain (Solidity, Solana, Ethereum), je conçois des outils et plateformes à la fois immersifs, performants et sécurisés. Je souhaite bâtir des infrastructures digitales robustes qui protègent les données, renforcent la confiance et ouvrent de nouvelles opportunités créatives et économiques.",
        "Ce n’est pas qu’un projet professionnel, c’est une mission : participer à la transformation profonde du web, pour en faire un espace plus décentralisé, plus éthique et plus inspirant, au service de toutes les ambitions.",
      ],
      keywords: [
        'React', 'Node.js', 'Solidity', 'Solana', 'Ethereum', 'Express', 'JavaScript', 'Python', 'HTML/CSS', 'SQL', 'MongoDB', 'Docker',
      ],
    },
    xp: {
      title: 'Expériences & Projets',
      experiences: 'Expériences',
      education: 'Formations',
      filters: ['Tous', 'Web3', 'UI', 'Full Stack'],
      experienceEntries: [
        {
          id: 'e-webtris',
          date: '2025 → présent',
          title: 'Fondateur',
          company: 'Webtris',
          description:
            "Entreprise vendant des solutions Web3 (plateformes, dApps, intégrations NFT), accompagnement de marques et artistes pour des expériences immersives. Lancement officiel prévu octobre 2025.",
          tags: ['Web3', 'Solidity', 'Solana', 'React', 'Node.js'],
        },
        {
          id: 'e-prodware',
          date: 'Jan. 2023 → Juin 2023',
          title: 'Développeur Junior',
          company: 'Prodware',
          description:
            "Développement et maintenance d'applications internes. Participation à la conception de solutions web et gestion de bases de données.",
          tags: ['Full Stack', 'SQL', 'React', 'Node.js'],
        },
      ],
      educationEntries: [
        {
          id: 'f-wf3',
          date: '2023 → 2024',
          title: 'Licence Informatique',
          company: 'WebForce3',
          description:
            "Parcours axé développement web et logiciels, avec projets d'application mobile et web. Bonnes pratiques (performance, accessibilité).",
          tags: ['Formation', 'Web', 'Licence'],
        },
        {
          id: 'f-oc',
          date: '2022 → 2023',
          title: 'Bac +2 Full Stack Developer',
          company: 'OpenClassrooms',
          description:
            'Création de sites web, gestion du back-end et mise en place/usage de bases de données.',
          tags: ['Formation', 'React', 'Node.js', 'Express', 'Bases de données'],
        },
        {
          id: 'f-alchemy',
          date: '2025',
          title: 'Formation Web3',
          company: 'Alchemy University',
          description:
            'Blockchain, smart contracts, Solidity, Solana; bonnes pratiques de sécurité et déploiements.',
          tags: ['Formation', 'Web3', 'Solidity', 'Solana'],
        },
        {
          id: 'f-fcc',
          date: '2025',
          title: 'Développement Web',
          company: 'freeCodeCamp',
          description:
            'Création de sites web, gestion du back-end et mise en place/usage de bases de données.',
          tags: ['Formation', 'JavaScript', 'Frontend', 'Backend', 'Base de données'],
        },
      ],
      projects: [
        { id: 'p-webtris', title: 'Webtris', description: 'Plateforme artistique Web3 (art, littérature) avec intégration blockchain.', tag: 'Web3' },
        { id: 'p-dapp', title: 'dApp NFT', description: 'Smart contracts, mint et marketplace légère.', tag: 'Web3' },
        { id: 'p-dashboard', title: 'Dashboard Blockchain', description: 'Visualisation des métriques on-chain.', tag: 'UI' },
        { id: 'p-fullstack', title: 'API + Front', description: 'Stack React/Node avec sécurité et auth.', tag: 'Full Stack' },
      ],
    },
    skills: {
      title: 'Compétences',
      exampleWith: 'Exemple avec',
      close: 'Fermer',
      exampleText:
        'Exemple représentatif: interface animée React + Framer Motion avec transitions de page, composants réutilisables et micro-interactions. Intégration API Node/Express, persistance MongoDB/PostgreSQL et déploiement Docker.',
    },
    contact: {
      title: 'Contact',
      summary: 'Tom Cottu · Paris · 0679506058 · Cottutom@outlook.fr',
      website: 'Site web',
      whatsapp: 'WhatsApp',
      email: 'Email',
      linkedin: 'LinkedIn',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      experience: 'Experience',
      skills: 'Skills',
      contact: 'Contact',
      languageFr: 'Français',
      languageEn: 'English',
    },
    hero: {
      title: 'Web 3.0 Entrepreneur',
      slogans: [
        'Web 3.0 entrepreneur based in Paris',
        'Smart contracts, dApps and immersive experiences',
        'Full Stack: React, Node.js, Solidity, Solana',
      ],
      statsYears: 'Years of experience',
      statsTechs: 'Technologies mastered',
      scroll: 'Scroll to explore',
    },
    about: {
      title: 'About',
      paragraphs: [
        'I don’t just build apps — I want to create a new world. A world where Web 3.0 is not only a technological evolution but a true revolution in how we design, exchange and collaborate.',
        'As a passionate entrepreneur, I push the limits of what’s possible. My goal is to constantly innovate and deliver tailored, unique solutions for any company, project, or professional.',
        'With Full Stack and blockchain expertise (Solidity, Solana, Ethereum), I build immersive, performant and secure platforms. I aim to design robust digital infrastructures that protect data, build trust and open new creative and economic opportunities.',
        'This isn’t just a career— it’s a mission: help transform the web into a more decentralized, ethical and inspiring space for every ambition.',
      ],
      keywords: [
        'React', 'Node.js', 'Solidity', 'Solana', 'Ethereum', 'Express', 'JavaScript', 'Python', 'HTML/CSS', 'SQL', 'MongoDB', 'Docker',
      ],
    },
    xp: {
      title: 'Experience & Projects',
      experiences: 'Experience',
      education: 'Education',
      filters: ['All', 'Web3', 'UI', 'Full Stack'],
      experienceEntries: [
        {
          id: 'e-webtris',
          date: '2025 → present',
          title: 'Founder',
          company: 'Webtris',
          description:
            'Web3 solutions (platforms, dApps, NFT integrations). Partnerships with brands and artists to craft immersive digital experiences. Official launch planned Oct 2025.',
          tags: ['Web3', 'Solidity', 'Solana', 'React', 'Node.js'],
        },
        {
          id: 'e-prodware',
          date: 'Jan. 2023 → Jun 2023',
          title: 'Junior Developer',
          company: 'Prodware',
          description:
            'Developed and maintained internal apps. Contributed to web solutions and database management.',
          tags: ['Full Stack', 'SQL', 'React', 'Node.js'],
        },
      ],
      educationEntries: [
        {
          id: 'f-wf3',
          date: '2023 → 2024',
          title: 'Computer Science (Licence)',
          company: 'WebForce3',
          description:
            'Focus on web/software development. Projects for mobile and web apps. Best practices (performance, accessibility).',
          tags: ['Education', 'Web', 'Licence'],
        },
        {
          id: 'f-oc',
          date: '2022 → 2023',
          title: 'Bac +2 Full Stack Developer',
          company: 'OpenClassrooms',
          description:
            'Website creation, back-end management and database setup/usage.',
          tags: ['Education', 'React', 'Node.js', 'Express', 'Databases'],
        },
        {
          id: 'f-alchemy',
          date: '2025',
          title: 'Web3 Training',
          company: 'Alchemy University',
          description:
            'Blockchain, smart contracts, Solidity, Solana; security best practices and deployments.',
          tags: ['Education', 'Web3', 'Solidity', 'Solana'],
        },
        {
          id: 'f-fcc',
          date: '2025',
          title: 'Web Development',
          company: 'freeCodeCamp',
          description:
            'Website creation, back-end management and database setup/usage.',
          tags: ['Education', 'JavaScript', 'Frontend', 'Backend', 'Database'],
        },
      ],
      projects: [
        { id: 'p-webtris', title: 'Webtris', description: 'Web3 artistic platform (art, literature) with blockchain integration.', tag: 'Web3' },
        { id: 'p-dapp', title: 'NFT dApp', description: 'Smart contracts, minting and lightweight marketplace.', tag: 'Web3' },
        { id: 'p-dashboard', title: 'Blockchain Dashboard', description: 'On-chain metrics visualization.', tag: 'UI' },
        { id: 'p-fullstack', title: 'API + Front', description: 'React/Node stack with auth and security.', tag: 'Full Stack' },
      ],
    },
    skills: {
      title: 'Skills',
      exampleWith: 'Example with',
      close: 'Close',
      exampleText:
        'Representative example: React + Framer Motion animated UI with page transitions, reusable components and micro-interactions. Node/Express API integration, MongoDB/PostgreSQL persistence and Docker deployment.',
    },
    contact: {
      title: 'Contact',
      summary: 'Tom Cottu · Paris · +33 6 79 50 60 58 · Cottutom@outlook.fr',
      website: 'Website',
      whatsapp: 'WhatsApp',
      email: 'Email',
      linkedin: 'LinkedIn',
    },
  },
} as const

export function useT(lang: SupportedLanguage) {
  return function t<K1 extends keyof typeof strings.fr>(ns: K1) {
    return strings[lang][ns]
  }
}


