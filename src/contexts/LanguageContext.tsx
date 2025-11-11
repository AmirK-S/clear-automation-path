import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "fr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check localStorage first
    const saved = localStorage.getItem("preferredLang");
    if (saved === "en" || saved === "fr") return saved;

    // Always default to French on first visit
    // User must explicitly click EN to switch
    return "fr";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("preferredLang", lang);
  };

  const t = (key: string) => {
    const keys = key.split(".");
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  useEffect(() => {
    localStorage.setItem("preferredLang", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations = {
  en: {
    header: {
      name: "Amir KELLOU-SIDHOUM",
      cta: "Get Free Advice"
    },
    hero: {
      title: "More Money. Less Headaches. Better Life.",
      subtitle: "I automate what wastes your time so you can focus on what makes you money. Every automation pays for itself.",
      primaryCta: "Get Free Advice (30 min)",
      secondaryCta: "Show Me What's Possible",
      smallText: "Free call. No pitch. I'll tell you exactly what you can automate and what it'll save you."
    },
    ticker: {
      title: "They Trust Me"
    },
    calendly: {
      title: "Let's Talk",
      subtitle: "30 minutes. Free advice. No obligation. I'll tell you exactly what you can automate and what it'll cost vs. what you'll save.",
      smallText: "No pitch. No sales. Just help."
    },
    process: {
      title: "How It Works",
      step1Title: "Deep Audit",
      step1Text: "I analyze your business. Find what's wasting time. Identify automation opportunities with biggest ROI.",
      step2Title: "Development Phases",
      step2Text: "We build in phases. You test. You give feedback. We iterate.",
      step3Title: "Your Team Owns It",
      step3Text: "Full documentation. Training. You control everything.",
      step4Title: "We Keep Going (If You Want)",
      step4Text: "More automations. More ROI. We grow together.",
      specialNote: "Need ultra-secure on-premise deployment for sensitive data? I can set up a custom server at your location. Cheaper than you think."
    },
    gapScan: {
      title: "Not Ready to Talk? Get a Free Analysis Instead",
      name: "Your Name",
      email: "Email",
      companyName: "Company Name",
      mostTimeQuestion: "What takes the most time in your business?",
      mostTimePlaceholder: "e.g., Following up with leads, processing invoices, scheduling...",
      automateQuestion: "What would you automate if you could?",
      submit: "Send My Free Analysis",
      sending: "Sending...",
      successTitle: "✅",
      successSubtitle: "Check your email in 10 minutes. You'll get specific recommendations for your business."
    },
    about: {
      title: "About Me",
      text: "Amir Kellou-Sidhoum. 24 years old.\n\nI build AI systems and automations for businesses.\n\nI've worked with ENGIE, TotalEnergies, and many others.\n\nI help with prospecting, customer service, operations, administration, and innovative projects.\n\nYour team owns everything after. Full documentation. Full training.\n\nThat's it."
    },
    finalCTA: {
      title: "Let's Talk",
      text: "30 minutes. Free advice. No obligation. I'll tell you exactly what you can automate and what it'll cost vs. what you'll save.",
      button: "Book Now"
    },
    useCases: {
      title: "What I Actually Automate",
      subtitle: "Real projects. Real results. Real ROI.",
      problemLabel: "Problem:",
      solutionLabel: "Solution:",
      resultLabel: "Result:",
      case1Title: "Automate customer service email processing",
      case1Problem: "Manually reading and responding to repetitive requests (tracking, quotes, delivery proof)",
      case1Solution: "AI reads, categorizes, and drafts responses",
      case1Result: "50% less time on repetitive tasks",
      case2Title: "Automate delivery status monitoring",
      case2Problem: "Manually checking 900-1400 lines/day for delivery statuses",
      case2Solution: "Auto-filter delivered orders, detect delays, email partners automatically",
      case2Result: "50% reduction in manual checking time",
      case3Title: "Automate sales outreach and nurturing",
      case3Problem: "Manual follow-ups for prospects from website, events, tenders",
      case3Solution: "Automated personalized follow-ups based on prospect type",
      case3Result: "Never miss a follow-up, more conversions",
      case4Title: "Generate quotes in 2 minutes instead of hours",
      case4Problem: "Clients wait days for quotes, you lose deals",
      case4Solution: "AI analyzes request, pulls data, creates PDF quote",
      case4Result: "Same-day quotes, close more deals",
      case5Title: "Automatically optimize 87,000+ product listings",
      case5Problem: "Outdated listings, wrong prices, SEO opportunities missed",
      case5Solution: "Monthly AI analysis + auto-generated optimization plans",
      case5Result: "Better visibility, better conversions, no manual work",
      case6Title: "Transform messy supplier files into clean data",
      case6Problem: "Manually converting Excel/PDF supplier files to your format",
      case6Solution: "AI extracts and structures heterogeneous data automatically",
      case6Result: "Hours saved per file, ready for import",
      case7Title: "Daily automated price tracking of competitors",
      case7Problem: "Manually checking competitor prices on marketplaces",
      case7Solution: "Daily scraping + Slack/Airtable alerts on price changes",
      case7Result: "Always competitive, react fast",
      case8Title: "Handle 60% of customer service requests automatically",
      case8Problem: "Repetitive questions about order status, returns, delays",
      case8Solution: "AI chatbot connected to your systems, escalates complex cases",
      case8Result: "24/7 support, team focuses on hard problems",
      case9Title: "From intervention to invoice to payment tracking",
      case9Problem: "Manual management via WhatsApp and spreadsheets",
      case9Solution: "Automated pipeline from form submission to PDF invoice to payment reconciliation",
      case9Result: "Zero manual data entry, real-time financial dashboard",
      bottomText: "These aren't examples. These are actual systems I built for actual companies.",
      ctaButton: "Which One Would Help You Most?"
    },
    industries: {
      tech: "Technology & Software",
      consulting: "Consulting & Professional Services",
      ecommerce: "E-commerce & Retail",
      healthcare: "Healthcare & Medical",
      finance: "Finance & Banking",
      manufacturing: "Manufacturing & Supply Chain",
      realestate: "Real Estate & Property",
      education: "Education & Training",
      marketing: "Marketing & Advertising",
      legal: "Legal Services",
      hospitality: "Hospitality & Tourism",
      construction: "Construction & Engineering",
      other: "Other"
    },
    teamSizes: {
      solo: "Just me",
      small: "2-10",
      medium: "11-50",
      large: "50+"
    },
    denemLabs: {
      title: "Very Technical Projects or R&D?",
      description: "I work with DenemLabs, an AI research lab with high-level technical experts. For advanced projects, we collaborate.",
      link: "Learn more about DenemLabs →"
    }
  },
  fr: {
    header: {
      name: "Amir KELLOU-SIDHOUM",
      cta: "Conseils Gratuits"
    },
    hero: {
      title: "Plus d'Argent. Moins de Galères. Vie Meilleure.",
      subtitle: "J'automatise ce qui te fait perdre du temps pour que tu puisses te concentrer sur ce qui te rapporte. Chaque automatisation est rentabilisée.",
      primaryCta: "Conseils Gratuits (30 min)",
      secondaryCta: "Montre-Moi Ce Qui Est Possible",
      smallText: "Appel gratuit. Pas de pitch. Je te dis exactement ce que tu peux automatiser et ce que ça t'économise."
    },
    ticker: {
      title: "Ils Me Font Confiance"
    },
    calendly: {
      title: "Parlons",
      subtitle: "30 minutes. Conseils gratuits. Pas d'obligation. Je te dis exactement ce que tu peux automatiser et ce que ça t'économise.",
      smallText: "Pas de pitch. Pas de vente. Juste de l'aide."
    },
    process: {
      title: "Comment Ça Marche",
      step1Title: "Audit Profond",
      step1Text: "J'analyse ton business. Je trouve ce qui te fait perdre du temps. J'identifie les automatisations avec le plus gros ROI.",
      step2Title: "Phases de Développement",
      step2Text: "On construit en phases. Tu testes. Tu donnes ton feedback. On itère.",
      step3Title: "Ton Équipe Possède Tout",
      step3Text: "Documentation complète. Formation. Tu contrôles tout.",
      step4Title: "On Continue (Si Tu Veux)",
      step4Text: "Plus d'automatisations. Plus de ROI. On grandit ensemble.",
      specialNote: "Besoin d'un déploiement ultra-sécurisé sur site pour données sensibles ? Je peux installer un serveur sur mesure chez toi. Moins cher que tu penses."
    },
    gapScan: {
      title: "Pas Prêt à Parler ? Reçois une Analyse Gratuite",
      name: "Ton Nom",
      email: "Email",
      companyName: "Nom de l'Entreprise",
      mostTimeQuestion: "Qu'est-ce qui prend le plus de temps dans ton business ?",
      mostTimePlaceholder: "ex: Relancer les prospects, traiter les factures, planifier...",
      automateQuestion: "Qu'est-ce que tu automatiserais si tu pouvais ?",
      submit: "Envoie Mon Analyse Gratuite",
      sending: "Envoi en cours...",
      successTitle: "✅",
      successSubtitle: "Checke ton email dans 10 minutes. Tu recevras des recommandations spécifiques pour ton business."
    },
    about: {
      title: "À Propos",
      text: "Amir Kellou-Sidhoum. 24 ans.\n\nJe construis des systèmes IA et des automatisations pour les entreprises.\n\nJ'ai travaillé avec ENGIE, TotalEnergies, et beaucoup d'autres.\n\nJ'aide avec la prospection, le service client, les opérations, l'administratif, et les projets innovants.\n\nTon équipe possède tout après. Documentation complète. Formation complète.\n\nC'est tout."
    },
    finalCTA: {
      title: "Parlons",
      text: "30 minutes. Conseils gratuits. Pas d'obligation. Je te dis exactement ce que tu peux automatiser et ce que ça coûte vs. ce que ça t'économise.",
      button: "Réserve Maintenant"
    },
    useCases: {
      title: "Ce Que J'Automatise Vraiment",
      subtitle: "Vrais projets. Vrais résultats. Vrai ROI.",
      problemLabel: "Problème :",
      solutionLabel: "Solution :",
      resultLabel: "Résultat :",
      case1Title: "Automatiser le traitement des emails service client",
      case1Problem: "Lecture et réponses manuelles aux demandes répétitives (suivi, devis, preuves de livraison)",
      case1Solution: "L'IA lit, catégorise, et rédige les réponses",
      case1Result: "50% moins de temps sur les tâches répétitives",
      case2Title: "Automatiser le suivi des livraisons",
      case2Problem: "Vérification manuelle de 900-1400 lignes/jour pour les statuts de livraison",
      case2Solution: "Filtrage auto, détection retards, emails automatiques aux partenaires",
      case2Result: "50% de réduction du temps de contrôle",
      case3Title: "Automatiser les relances commerciales",
      case3Problem: "Relances manuelles pour prospects site web, salons, appels d'offres",
      case3Solution: "Relances personnalisées automatiques selon le type de prospect",
      case3Result: "Jamais de relance oubliée, plus de conversions",
      case4Title: "Générer des devis en 2 minutes au lieu de heures",
      case4Problem: "Les clients attendent des jours pour les devis, tu perds des deals",
      case4Solution: "L'IA analyse la demande, extrait les données, crée le PDF",
      case4Result: "Devis le jour même, plus de deals fermés",
      case5Title: "Optimiser automatiquement 87 000+ fiches produits",
      case5Problem: "Fiches obsolètes, prix hors marché, opportunités SEO ratées",
      case5Solution: "Analyse IA mensuelle + plans d'optimisation auto-générés",
      case5Result: "Meilleure visibilité, meilleures conversions, zéro travail manuel",
      case6Title: "Transformer des fichiers fournisseurs bordéliques en données propres",
      case6Problem: "Conversion manuelle Excel/PDF des fournisseurs vers ton format",
      case6Solution: "L'IA extrait et structure les données hétérogènes automatiquement",
      case6Result: "Heures économisées par fichier, prêt à importer",
      case7Title: "Veille tarifaire automatisée quotidienne des concurrents",
      case7Problem: "Vérification manuelle des prix concurrents sur marketplaces",
      case7Solution: "Scraping quotidien + alertes Slack/Airtable sur variations",
      case7Result: "Toujours compétitif, réaction rapide",
      case8Title: "Gérer 60% des demandes SAV automatiquement",
      case8Problem: "Questions répétitives sur statut commande, retours, délais",
      case8Solution: "Chatbot IA connecté à tes systèmes, escalade les cas complexes",
      case8Result: "Support 24/7, l'équipe se concentre sur les vrais problèmes",
      case9Title: "De l'intervention à la facture au suivi des paiements",
      case9Problem: "Gestion manuelle via WhatsApp et spreadsheets",
      case9Solution: "Pipeline automatisé du formulaire au PDF facture au rapprochement bancaire",
      case9Result: "Zéro saisie manuelle, dashboard financier temps réel",
      bottomText: "Ce ne sont pas des exemples. Ce sont des vrais systèmes que j'ai construits pour de vraies entreprises.",
      ctaButton: "Lequel T'Aiderait le Plus ?"
    },
    industries: {
      tech: "Technologie & Logiciels",
      consulting: "Conseil & Services Professionnels",
      ecommerce: "E-commerce & Retail",
      healthcare: "Santé & Médical",
      finance: "Finance & Banque",
      manufacturing: "Fabrication & Supply Chain",
      realestate: "Immobilier & Propriété",
      education: "Éducation & Formation",
      marketing: "Marketing & Publicité",
      legal: "Services Juridiques",
      hospitality: "Hôtellerie & Tourisme",
      construction: "Construction & Ingénierie",
      other: "Autre"
    },
    teamSizes: {
      solo: "Juste moi",
      small: "2-10",
      medium: "11-50",
      large: "50+"
    },
    denemLabs: {
      title: "Projets très techniques ou R&D ?",
      description: "Je travaille avec DenemLabs, un lab de recherche en IA avec des experts techniques de haut niveau. Pour les projets avancés, on collabore.",
      link: "En savoir plus sur DenemLabs →"
    }
  }
};
