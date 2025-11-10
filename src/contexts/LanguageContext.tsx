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
    
    // Detect browser language
    const userLang = navigator.language || (navigator as any).userLanguage;
    return userLang.startsWith("fr") ? "fr" : "en";
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
      cta: "Get Free Report"
    },
    hero: {
      title: "Make More Money. Save Time. Keep Your Team Happy.",
      subtitle: "I build AI systems and automations that work. Your business runs smoother, faster, and more profitable.",
      primaryCta: "See What's Possible (Free)",
      secondaryCta: "Book a Call",
      explainerBold: "Not sure if AI can help your business?",
      explainerText: "I'll show you exactly where it can - for free. No commitment, just clarity."
    },
    ticker: {
      title: "Trusted by Leading Organizations"
    },
    benefits: {
      card1Title: "Make More Revenue",
      card1Point1: "Automate sales follow-ups",
      card1Point2: "Faster customer responses",
      card1Point3: "Find opportunities you're missing",
      card2Title: "Save Time & Money",
      card2Point1: "Eliminate repetitive work",
      card2Point2: "Reduce manual errors",
      card2Point3: "Your team focuses on what matters",
      card3Title: "Happier Team",
      card3Point1: "No more boring tasks",
      card3Point2: "Systems they actually understand",
      card3Point3: "Full training included"
    },
    painPoints: {
      title: "I Hear You. These Keep You Up at Night.",
      subtitle: "Every single one of these? I can fix it. Let me show you how.",
      card1Title: "I have no idea what's actually making money",
      card1Pain: "You're busy. Sales are happening. But which products are profitable? Which clients cost more than they're worth? You're flying blind.",
      card1Build: "Dashboard that shows real profitability in 5 seconds",
      card1Impact: "Finally know where to focus. Cut the losers. Double down on winners.",
      card2Title: "My team wastes hours asking me questions",
      card2Pain: "'How do I do X?' 'Where's the template for Y?' 'What's our policy on Z?' You're the human Google for your own company.",
      card2Build: "AI knowledge base that answers everything",
      card2Impact: "They get answers instantly. You get your day back. Everyone's happier.",
      card3Title: "Sending quotes takes forever and I lose deals",
      card3Pain: "Client asks for a quote Monday. You finally send it Thursday. They went with someone faster. Every. Single. Time.",
      card3Build: "Quote generator that goes from request → PDF in 2 minutes",
      card3Impact: "Quotes out same-day. Close more deals. Look professional.",
      card4Title: "Good people leave because processes are chaos",
      card4Pain: "Your best employee quits. They say 'everything's disorganized, nothing's documented, I'm tired of firefighting.' And they're right.",
      card4Build: "Systems that work without you + documentation that makes sense",
      card4Impact: "Processes that last. Training in hours not weeks. People stay.",
      card5Title: "I can't afford good people but can't do it all myself",
      card5Pain: "Hiring someone costs $40K+. You don't have $40K. But you're drowning in work and something has to give.",
      card5Build: "Automation that replaces a $40K/year person",
      card5Impact: "ROI in 4 months. Work gets done. You don't burn out.",
      card6Title: "I'm stuck - can't grow without hiring, can't hire without growing",
      card6Pain: "More clients = need more people. More people = need more clients to pay them. You're trapped in the middle, working 70-hour weeks.",
      card6Build: "Systems that scale without headcount",
      card6Impact: "2x revenue without 2x people. Break the ceiling. Actually grow.",
      bottomTitle: "I've Seen All of This. I've Fixed All of This.",
      bottomText: "You don't need more advice or another consultant report collecting dust. You need someone to actually build the thing that solves the problem. That's what I do.",
      whatIBuild: "What I build:",
      impact: "Impact:"
    },
    gapScan: {
      title: "Not Sure Where to Start?",
      subtitle: "Tell me about your business and challenges. I'll analyze your situation and send you a personalized report showing exactly where AI can help - specific to YOUR business, not generic advice.",
      step1Title: "About You",
      step2Title: "Your Challenges",
      step3Title: "What You Want",
      name: "Your Name",
      email: "Email",
      companyName: "Company Name",
      industry: "Industry/Sector",
      teamSize: "Team Size",
      industryPlaceholder: "Select your industry",
      teamSizePlaceholder: "Select team size",
      next: "Next",
      back: "Back",
      step2Intro: "Help me understand what's slowing you down",
      challenge1: "Too much manual data entry",
      challenge2: "Repetitive admin tasks",
      challenge3: "Slow customer response times",
      challenge4: "Missing sales opportunities",
      challenge5: "Team spending time on boring work",
      challenge6: "Inconsistent processes",
      challenge7: "Information scattered everywhere",
      challenge8: "Other",
      mostTimeQuestion: "What takes the MOST time in your business?",
      mostTimePlaceholder: "e.g., Following up with leads, processing invoices, scheduling...",
      step3Intro: "What would success look like?",
      automateQuestion: "If you could automate ONE thing tomorrow, what would it be?",
      timelineQuestion: "What's your timeline?",
      timelineExploring: "Exploring ideas",
      timeline3Months: "Next 3 months",
      timelineUrgent: "Urgent need",
      anythingElse: "Anything else I should know?",
      submit: "Send Me My Personalized Report",
      successTitle: "Got it! Analyzing your business...",
      successSubtitle: "Check your email in the next 10 minutes for your personalized AI Gap Scan",
      reportIncludes: "Your report will include:",
      reportPoint1: "Specific automations for",
      reportPoint2: "Time savings estimates for",
      reportPoint3: "Quick wins you can implement first",
      reportPoint4: "Strategic opportunities for growth",
      discussTitle: "Want to discuss your report?",
      discussSubtitle: "Book a call now and we'll walk through your personalized findings together",
      bookCallCta: "Book a Call Now"
    },
    process: {
      title: "How We Work Together",
      step1Title: "Talk",
      step1Text: "30min call, understand your needs",
      step2Title: "Test",
      step2Text: "Quick proof (1-2 weeks) to show it works",
      step3Title: "Build",
      step3Text: "Production system + train your team",
      trustStatement: "You own everything. Your team masters it. No vendor lock-in."
    },
    calendly: {
      title: "Ready to Talk?",
      subtitle: "Book a 30-minute call. We'll discuss what's possible for your business."
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
    }
  },
  fr: {
    header: {
      name: "Amir KELLOU-SIDHOUM",
      cta: "Obtenir le Rapport Gratuit"
    },
    hero: {
      title: "Gagner Plus. Économiser du Temps. Équipe Plus Heureuse.",
      subtitle: "Je construis des systèmes IA et des automatisations qui marchent. Ton business tourne mieux, plus vite, plus rentable.",
      primaryCta: "Voir Ce Qui Est Possible (Gratuit)",
      secondaryCta: "Réserver un Appel",
      explainerBold: "Pas sûr si l'IA peut aider ton business ?",
      explainerText: "Je vais te montrer exactement où elle peut aider - gratuit. Pas d'engagement, juste de la clarté."
    },
    ticker: {
      title: "Ils Me Font Confiance"
    },
    benefits: {
      card1Title: "Faire Plus de Revenu",
      card1Point1: "Automatiser les relances commerciales",
      card1Point2: "Réponses clients plus rapides",
      card1Point3: "Trouver les opportunités manquées",
      card2Title: "Économiser Temps & Argent",
      card2Point1: "Éliminer le travail répétitif",
      card2Point2: "Réduire les erreurs manuelles",
      card2Point3: "Ton équipe se concentre sur l'important",
      card3Title: "Équipe Plus Heureuse",
      card3Point1: "Fini les tâches chiantes",
      card3Point2: "Systèmes qu'ils comprennent vraiment",
      card3Point3: "Formation complète incluse"
    },
    painPoints: {
      title: "Je T'Entends. Ça Te Bouffe la Nuit.",
      subtitle: "Chacun de ces problèmes ? Je peux le régler. Laisse-moi te montrer comment.",
      card1Title: "Je ne sais pas ce qui est vraiment rentable",
      card1Pain: "Tu es occupé. Les ventes arrivent. Mais quels produits sont rentables ? Quels clients te coûtent plus qu'ils ne rapportent ? Tu voles à l'aveugle.",
      card1Build: "Tableau de bord qui montre la rentabilité réelle en 5 secondes",
      card1Impact: "Enfin savoir où te concentrer. Couper les perdants. Doubler sur les gagnants.",
      card2Title: "Mon équipe passe des heures à me poser des questions",
      card2Pain: "'Comment faire X ?' 'Où est le template pour Y ?' 'C'est quoi notre politique sur Z ?' Tu es le Google humain de ta propre boîte.",
      card2Build: "Base de connaissances IA qui répond à tout",
      card2Impact: "Ils ont leurs réponses instantanément. Tu récupères ta journée. Tout le monde est plus heureux.",
      card3Title: "Envoyer des devis prend une éternité et je perds des deals",
      card3Pain: "Le client demande un devis lundi. Tu l'envoies enfin jeudi. Il est parti chez quelqu'un de plus rapide. À chaque fois.",
      card3Build: "Générateur de devis qui passe de demande → PDF en 2 minutes",
      card3Impact: "Devis envoyés le jour même. Plus de deals fermés. L'air pro.",
      card4Title: "Les bons partent parce que les process sont le chaos",
      card4Pain: "Ton meilleur employé démissionne. Il dit 'tout est désorganisé, rien n'est documenté, j'en ai marre des pompiers.' Et il a raison.",
      card4Build: "Systèmes qui fonctionnent sans toi + documentation claire",
      card4Impact: "Process qui durent. Formation en heures, pas en semaines. Les gens restent.",
      card5Title: "Je ne peux pas me payer des bons mais je ne peux pas tout faire seul",
      card5Pain: "Embaucher quelqu'un coûte 40K€+. Tu n'as pas 40K€. Mais tu croules sous le boulot et quelque chose doit lâcher.",
      card5Build: "Automatisation qui remplace une personne à 40K€/an",
      card5Impact: "ROI en 4 mois. Le travail est fait. Tu ne te crames pas.",
      card6Title: "Je suis coincé - impossible de grandir sans embaucher, impossible d'embaucher sans grandir",
      card6Pain: "Plus de clients = besoin de plus de gens. Plus de gens = besoin de plus de clients pour les payer. Tu es piégé au milieu, à bosser 70h/semaine.",
      card6Build: "Systèmes qui scalent sans headcount",
      card6Impact: "2x le revenu sans 2x les gens. Casser le plafond. Vraiment grandir.",
      bottomTitle: "J'ai Tout Vu. J'ai Tout Réglé.",
      bottomText: "Tu n'as pas besoin de conseils ou d'un énième rapport de consultant qui prend la poussière. Tu as besoin de quelqu'un qui construit vraiment le truc qui règle le problème. C'est ce que je fais.",
      whatIBuild: "Ce que je construis :",
      impact: "Impact :"
    },
    gapScan: {
      title: "Pas Sûr Par Où Commencer ?",
      subtitle: "Parle-moi de ton business et de tes challenges. Je vais analyser ta situation et t'envoyer un rapport personnalisé qui montre exactement où l'IA peut aider - spécifique à TON business, pas des conseils génériques.",
      step1Title: "À Propos de Toi",
      step2Title: "Tes Challenges",
      step3Title: "Ce Que Tu Veux",
      name: "Ton Nom",
      email: "Email",
      companyName: "Nom de l'Entreprise",
      industry: "Industrie/Secteur",
      teamSize: "Taille de l'Équipe",
      industryPlaceholder: "Sélectionne ton industrie",
      teamSizePlaceholder: "Sélectionne la taille",
      next: "Suivant",
      back: "Retour",
      step2Intro: "Aide-moi à comprendre ce qui te ralentit",
      challenge1: "Trop de saisie manuelle",
      challenge2: "Tâches admin répétitives",
      challenge3: "Réponses clients lentes",
      challenge4: "Opportunités commerciales manquées",
      challenge5: "Équipe qui perd du temps sur du boring",
      challenge6: "Process incohérents",
      challenge7: "Infos éparpillées partout",
      challenge8: "Autre",
      mostTimeQuestion: "Qu'est-ce qui prend le PLUS de temps dans ton business ?",
      mostTimePlaceholder: "ex: Relancer les prospects, traiter les factures, planifier...",
      step3Intro: "Ça ressemblerait à quoi, le succès ?",
      automateQuestion: "Si tu pouvais automatiser UN truc demain, ce serait quoi ?",
      timelineQuestion: "C'est quoi ton timing ?",
      timelineExploring: "J'explore des idées",
      timeline3Months: "3 prochains mois",
      timelineUrgent: "Besoin urgent",
      anythingElse: "Autre chose que je devrais savoir ?",
      submit: "Envoie-Moi Mon Rapport Personnalisé",
      successTitle: "Reçu ! J'analyse ton business...",
      successSubtitle: "Check ton email dans les 10 prochaines minutes pour ton AI Gap Scan personnalisé",
      reportIncludes: "Ton rapport va inclure :",
      reportPoint1: "Automatisations spécifiques pour",
      reportPoint2: "Estimations d'économie de temps pour",
      reportPoint3: "Quick wins que tu peux implémenter en premier",
      reportPoint4: "Opportunités stratégiques de croissance",
      discussTitle: "Tu veux discuter de ton rapport ?",
      discussSubtitle: "Réserve un appel maintenant et on passera en revue tes résultats personnalisés ensemble",
      bookCallCta: "Réserver un Appel Maintenant"
    },
    process: {
      title: "Comment On Travaille Ensemble",
      step1Title: "Parler",
      step1Text: "Appel 30min, comprendre tes besoins",
      step2Title: "Tester",
      step2Text: "Preuve rapide (1-2 semaines) pour montrer que ça marche",
      step3Title: "Construire",
      step3Text: "Système en production + former ton équipe",
      trustStatement: "Tu possèdes tout. Ton équipe maîtrise. Pas de vendor lock-in."
    },
    calendly: {
      title: "Prêt à Parler ?",
      subtitle: "Réserve un appel de 30 minutes. On discute de ce qui est possible pour ton business."
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
    }
  }
};
