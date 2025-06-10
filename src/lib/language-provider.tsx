import { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "es" | "fr";

type LanguageProviderProps = {
  children: React.ReactNode;
  defaultLanguage?: Language;
  storageKey?: string;
};

type LanguageProviderState = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const translations = {
  en: {
    "app.name": "Food Bridge",
    "app.tagline": "Connecting Food Donors with Recipients",
    "app.description": "Join our mission to reduce food waste and help those in need",
    "nav.login": "Login",
    "nav.signup": "Sign Up",
    "nav.dashboard": "Dashboard",
    "nav.logFood": "Log Food",
    "nav.schedule": "Schedule",
    "nav.impact": "Impact",
    "nav.search": "Search",
    "nav.logout": "Logout",
    "hero.title": "Make a Difference Today",
    "hero.subtitle": "Connect with local food donors and recipients",
    "features.title": "How It Works",
    "features.donor.title": "For Donors",
    "features.donor.description": "Easily donate surplus food and track your impact",
    "features.recipient.title": "For Recipients",
    "features.recipient.description": "Find available food donations in your area",
    "cta.title": "Ready to Make a Difference?",
    "cta.description": "Join our community of food donors and recipients",
    "cta.donor": "Become a Donor",
    "cta.recipient": "Become a Recipient",
  },
  es: {
    "app.name": "Food Bridge",
    "app.tagline": "Conectando Donantes de Alimentos con Receptores",
    "app.description": "Únete a nuestra misión para reducir el desperdicio de alimentos y ayudar a los necesitados",
    "nav.login": "Iniciar Sesión",
    "nav.signup": "Registrarse",
    "nav.dashboard": "Panel",
    "nav.logFood": "Registrar Alimentos",
    "nav.schedule": "Programación",
    "nav.impact": "Impacto",
    "nav.search": "Buscar",
    "nav.logout": "Cerrar Sesión",
    "hero.title": "Haz la Diferencia Hoy",
    "hero.subtitle": "Conéctate con donantes y receptores locales de alimentos",
    "features.title": "Cómo Funciona",
    "features.donor.title": "Para Donantes",
    "features.donor.description": "Dona fácilmente alimentos excedentes y sigue tu impacto",
    "features.recipient.title": "Para Receptores",
    "features.recipient.description": "Encuentra donaciones de alimentos disponibles en tu área",
    "cta.title": "¿Listo para Hacer la Diferencia?",
    "cta.description": "Únete a nuestra comunidad de donantes y receptores de alimentos",
    "cta.donor": "Conviértete en Donante",
    "cta.recipient": "Conviértete en Receptor",
  },
  fr: {
    "app.name": "Food Bridge",
    "app.tagline": "Connecter les Donateurs de Nourriture aux Bénéficiaires",
    "app.description": "Rejoignez notre mission pour réduire le gaspillage alimentaire et aider les nécessiteux",
    "nav.login": "Connexion",
    "nav.signup": "S'inscrire",
    "nav.dashboard": "Tableau de Bord",
    "nav.logFood": "Enregistrer la Nourriture",
    "nav.schedule": "Programme",
    "nav.impact": "Impact",
    "nav.search": "Rechercher",
    "nav.logout": "Déconnexion",
    "hero.title": "Faites la Différence Aujourd'hui",
    "hero.subtitle": "Connectez-vous avec les donateurs et bénéficiaires locaux",
    "features.title": "Comment Ça Marche",
    "features.donor.title": "Pour les Donateurs",
    "features.donor.description": "Donnez facilement vos surplus alimentaires et suivez votre impact",
    "features.recipient.title": "Pour les Bénéficiaires",
    "features.recipient.description": "Trouvez des dons alimentaires disponibles dans votre région",
    "cta.title": "Prêt à Faire la Différence ?",
    "cta.description": "Rejoignez notre communauté de donateurs et bénéficiaires",
    "cta.donor": "Devenir Donateur",
    "cta.recipient": "Devenir Bénéficiaire",
  },
};

const initialState: LanguageProviderState = {
  language: "en",
  setLanguage: () => null,
  t: (key: string) => key,
};

const LanguageProviderContext = createContext<LanguageProviderState>(initialState);

export function LanguageProvider({
  children,
  defaultLanguage = "en",
  storageKey = "vite-ui-language",
  ...props
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem(storageKey) as Language) || defaultLanguage
  );

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const value = {
    language,
    setLanguage: (language: Language) => {
      localStorage.setItem(storageKey, language);
      setLanguage(language);
    },
    t,
  };

  return (
    <LanguageProviderContext.Provider {...props} value={value}>
      {children}
    </LanguageProviderContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext);

  if (context === undefined)
    throw new Error("useLanguage must be used within a LanguageProvider");

  return context;
}; 