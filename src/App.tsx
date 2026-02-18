/*
 __      _______ _____ ____  _____  ______            _____ ______ _   _  _______     __
 \ \    / /_   _/ ____/ __ \|  __ \|  ____|     /\   / ____|  ____| \ | |/ ____\ \   / /
  \ \  / /  | || |   | |  | | |  | | |__       /  \ | |  __| |__  |  \| | |     \ \_/ /
   \ \/ /   | || |   | |  | | |  | |  __|     / /\ \| | |_ |  __| | . ` | |      \   /
    \  /   _| || |___| |__| | |__| | |____   / ____ \ |__| | |____| |\  | |____   | |
     \/   |_____\_____\____/|_____/|______| /_/    \_\_____|______|_| \_|\_____|  |_|
*/

import './App.css'
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import QRCode from 'react-qr-code'

type Lang = 'fr' | 'en'
type CountryKey = 'us' | 'fr' | 'be' | 'ch' | 'ca'
type EmergencyTypeKey = 'mental' | 'medical' | 'danger'

type Copy = {
  navHome: string
  navResources: string
  navContact: string
  navEmergency: string
  switchLabel: string
  homeTagline: string
  homeTitle: string
  homeCopy: string
  joinDiscord: string
  inviteNote: string
  topics: Array<{ title: string; body: string }>
  resourcesTagline: string
  resourcesTitle: string
  resourcesIntro: string
  resources: Array<{ title: string; body: string }>
  contactTagline: string
  contactTitle: string
  contactIntro: string
  contactTopic: string
  contactTopicPlaceholder: string
  contactMessage: string
  contactMessagePlaceholder: string
  contactReply: string
  contactReplyPlaceholder: string
  contactSubmit: string
  contactFeedback: string
  emergencyTagline: string
  emergencyTitle: string
  emergencyIntro: string
  emergencyCountryLabel: string
  emergencyTypeLabel: string
  emergencyCallNow: string
  emergencyNumberLabel: string
  emergencyQrTitle: string
  emergencyQrHint: string
  emergencyMobileHint: string
  emergencyDisclaimer: string
  emergencyCountries: Record<CountryKey, string>
  emergencyTypes: Record<EmergencyTypeKey, string>
}

const emergencyNumbers: Record<CountryKey, Record<EmergencyTypeKey, string>> = {
  us: {
    mental: '988',
    medical: '911',
    danger: '911',
  },
  fr: {
    mental: '3114',
    medical: '15',
    danger: '17',
  },
  be: {
    mental: '080032123',
    medical: '112',
    danger: '101',
  },
  ch: {
    mental: '143',
    medical: '144',
    danger: '117',
  },
  ca: {
    mental: '988',
    medical: '911',
    danger: '911',
  },
}

const copyByLang: Record<Lang, Copy> = {
  fr: {
    navHome: 'Accueil',
    navResources: 'Ressources',
    navContact: 'Contact anonyme',
    navEmergency: 'Urgences',
    switchLabel: 'Langue',
    homeTagline: 'COMMUNAUTÉ TAKE CARE',
    homeTitle: 'Un espace pour parler de santé mentale, sans jugement.',
    homeCopy:
      'Addictions, TDAH, TDC et autres difficultés du quotidien : ici, on partage des ressources, du soutien et des expériences vécues.',
    joinDiscord: 'Rejoindre le serveur Discord',
    inviteNote: "Espace communautaire d'écoute et d'entraide.",
    topics: [
      {
        title: 'Addiction',
        body: 'Échanger avec des personnes qui comprennent les hauts, les rechutes et les progrès.',
      },
      {
        title: 'TDAH',
        body: 'Trouver des stratégies concrètes pour l\'organisation, la concentration et la fatigue mentale.',
      },
      {
        title: 'TDC',
        body: 'Partager des pistes utiles pour mieux gérer le quotidien et garder confiance en soi.',
      },
    ],
    resourcesTagline: 'RESSOURCES',
    resourcesTitle: 'Des pistes concrètes pour avancer à ton rythme.',
    resourcesIntro:
      'Cette page rassemble des catégories utiles pour orienter les membres du serveur vers un soutien adapté.',
    resources: [
      {
        title: 'Urgence et crise',
        body: "Numéros d'urgence, ligne de prévention du suicide et contacts de proximité.",
      },
      {
        title: 'Suivi professionnel',
        body: 'Psychologues, psychiatres, centres CSAPA, structures de soins en addictologie.',
      },
      {
        title: 'Outils quotidiens',
        body: "Méthodes d'organisation TDAH, routines anti-stress et supports pour prévenir les rechutes.",
      },
      {
        title: 'Groupes de parole',
        body: "Associations, groupes d'entraide locaux et communautés en ligne bienveillantes.",
      },
    ],
    contactTagline: 'CONTACT ANONYME',
    contactTitle: 'Un message confidentiel, sans donner ton identité.',
    contactIntro:
      'Ce formulaire est pensé pour laisser une demande, un témoignage ou un besoin de soutien en restant anonyme.',
    contactTopic: 'Sujet',
    contactTopicPlaceholder: 'Ex. : besoin de soutien après une rechute',
    contactMessage: 'Message',
    contactMessagePlaceholder: 'Écris librement, sans nom ni informations personnelles.',
    contactReply: 'Réponse (optionnel)',
    contactReplyPlaceholder: 'Pseudo Discord ou e-mail si tu veux une réponse',
    contactSubmit: 'Envoyer anonymement',
    contactFeedback: 'Message envoyé. Merci pour ta confiance.',
    emergencyTagline: 'URGENCES',
    emergencyTitle: 'Trouver rapidement le bon numéro selon ta situation.',
    emergencyIntro:
      "Sélectionne ton pays et le type d'urgence. Le bouton lance directement l'appel, et le QR code desktop te permet de transférer l'action sur ton téléphone.",
    emergencyCountryLabel: 'Pays',
    emergencyTypeLabel: "Type d'urgence",
    emergencyCallNow: 'Appeler maintenant',
    emergencyNumberLabel: 'Numéro cible',
    emergencyQrTitle: 'Scanner sur téléphone',
    emergencyQrHint: "Depuis un ordinateur, scanne ce QR code pour ouvrir directement l'appel sur ton mobile.",
    emergencyMobileHint: "Sur mobile, utilise le bouton d'appel ci-dessus.",
    emergencyDisclaimer:
      'Si la situation est immédiate et grave, appelle les secours tout de suite. Les numéros peuvent varier selon les pays.',
    emergencyCountries: {
      us: 'États-Unis',
      fr: 'France',
      be: 'Belgique',
      ch: 'Suisse',
      ca: 'Canada',
    },
    emergencyTypes: {
      mental: 'Crise psychologique ou suicidaire',
      medical: 'Urgence médicale',
      danger: 'Danger immédiat ou violence',
    },
  },
  en: {
    navHome: 'Home',
    navResources: 'Resources',
    navContact: 'Anonymous contact',
    navEmergency: 'Emergency',
    switchLabel: 'Language',
    homeTagline: 'TAKE CARE COMMUNITY',
    homeTitle: 'A safe place to talk about mental health without judgment.',
    homeCopy:
      'Addiction, ADHD, DCD and other daily challenges: here we share resources, peer support, and lived experiences.',
    joinDiscord: 'Join the Discord server',
    inviteNote: 'A community space for listening and mutual support.',
    topics: [
      {
        title: 'Addiction',
        body: 'Connect with people who understand ups, relapses, and progress.',
      },
      {
        title: 'ADHD',
        body: 'Find practical strategies for organization, focus, and mental fatigue.',
      },
      {
        title: 'DCD',
        body: 'Share useful ways to manage daily life and build confidence.',
      },
    ],
    resourcesTagline: 'RESOURCES',
    resourcesTitle: 'Practical paths to move forward at your own pace.',
    resourcesIntro:
      'This page gathers helpful categories to guide members toward suitable support.',
    resources: [
      {
        title: 'Emergency and crisis',
        body: 'Emergency numbers, suicide prevention lines, and nearby contacts.',
      },
      {
        title: 'Professional care',
        body: 'Psychologists, psychiatrists, addiction care centers, and treatment services.',
      },
      {
        title: 'Daily tools',
        body: 'ADHD organization methods, anti-stress routines, and relapse prevention supports.',
      },
      {
        title: 'Peer groups',
        body: 'Associations, local support groups, and caring online communities.',
      },
    ],
    contactTagline: 'ANONYMOUS CONTACT',
    contactTitle: 'A confidential message without sharing your identity.',
    contactIntro:
      'This form is designed to leave a request, testimony, or support need while staying anonymous.',
    contactTopic: 'Subject',
    contactTopicPlaceholder: 'Example: need support after a relapse',
    contactMessage: 'Message',
    contactMessagePlaceholder: 'Write freely, without names or personal details.',
    contactReply: 'Reply (optional)',
    contactReplyPlaceholder: 'Discord handle or email if you want a reply',
    contactSubmit: 'Send anonymously',
    contactFeedback: 'Message sent. Thank you for your trust.',
    emergencyTagline: 'EMERGENCY',
    emergencyTitle: 'Quickly find the right number for your situation.',
    emergencyIntro:
      'Pick your country and emergency type. The call button dials directly, and the desktop QR code lets you move the action to your phone.',
    emergencyCountryLabel: 'Country',
    emergencyTypeLabel: 'Emergency type',
    emergencyCallNow: 'Call now',
    emergencyNumberLabel: 'Target number',
    emergencyQrTitle: 'Scan on phone',
    emergencyQrHint: 'From desktop, scan this QR code to open the call directly on your mobile.',
    emergencyMobileHint: 'On mobile, use the call button above.',
    emergencyDisclaimer:
      'If the situation is immediate and severe, call emergency services right now. Numbers can vary by country.',
    emergencyCountries: {
      us: 'United States',
      fr: 'France',
      be: 'Belgium',
      ch: 'Switzerland',
      ca: 'Canada',
    },
    emergencyTypes: {
      mental: 'Mental health or suicide crisis',
      medical: 'Medical emergency',
      danger: 'Immediate danger or violence',
    },
  },
}

function App() {
  const [lang, setLang] = useState<Lang>(() => {
    const stored = localStorage.getItem('takecare-lang')
    return stored === 'en' ? 'en' : 'fr'
  })

  const t = copyByLang[lang]

  useEffect(() => {
    localStorage.setItem('takecare-lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  return (
    <div className="site-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="topbar">
        <p className="brand">TAKE CARE</p>
        <nav className="nav">
          <NavLink to="/" end className="nav-link">
            {t.navHome}
          </NavLink>
          <NavLink to="/ressources" className="nav-link">
            {t.navResources}
          </NavLink>
          <NavLink to="/urgences" className="nav-link">
            {t.navEmergency}
          </NavLink>
          <NavLink to="/contact-anonyme" className="nav-link">
            {t.navContact}
          </NavLink>
        </nav>

        <div className="lang-switch" aria-label={t.switchLabel}>
          <button
            type="button"
            className={lang === 'fr' ? 'lang-btn active' : 'lang-btn'}
            onClick={() => setLang('fr')}
          >
            FR
          </button>
          <button
            type="button"
            className={lang === 'en' ? 'lang-btn active' : 'lang-btn'}
            onClick={() => setLang('en')}
          >
            EN
          </button>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<HomePage t={t} />} />
        <Route path="/ressources" element={<ResourcesPage t={t} />} />
        <Route path="/urgences" element={<EmergencyPage t={t} />} />
        <Route path="/contact-anonyme" element={<ContactPage t={t} />} />
      </Routes>
    </div>
  )
}

function HomePage({ t }: { t: Copy }) {
  return (
    <>
      <section className="hero">
        <p className="tagline">{t.homeTagline}</p>
        <h1>{t.homeTitle}</h1>
        <p className="hero-copy">{t.homeCopy}</p>

        <div className="hero-actions">
          <a
            href="https://discord.gg/SwUwGGj979"
            target="_blank"
            rel="noreferrer"
            className="cta-discord"
          >
            {t.joinDiscord}
          </a>
          <p className="invite-note">{t.inviteNote}</p>
        </div>
      </section>

      <section className="topics-grid">
        {t.topics.map((topic, index) => (
          <article key={topic.title} className={`topic-card reveal reveal-${index + 1}`}>
            <h2>{topic.title}</h2>
            <p>{topic.body}</p>
          </article>
        ))}
      </section>
    </>
  )
}

function ResourcesPage({ t }: { t: Copy }) {
  return (
    <main className="page-layout">
      <section className="page-intro">
        <p className="tagline">{t.resourcesTagline}</p>
        <h1>{t.resourcesTitle}</h1>
        <p>{t.resourcesIntro}</p>
      </section>

      <section className="resource-grid">
        {t.resources.map((resource, index) => (
          <article key={resource.title} className={`resource-card reveal reveal-${(index % 3) + 1}`}>
            <h2>{resource.title}</h2>
            <p>{resource.body}</p>
          </article>
        ))}
      </section>
    </main>
  )
}

function EmergencyPage({ t }: { t: Copy }) {
  const [country, setCountry] = useState<CountryKey>('us')
  const [emergencyType, setEmergencyType] = useState<EmergencyTypeKey>('mental')

  const number = emergencyNumbers[country][emergencyType]
  const phoneHref = `tel:${number}`

  return (
    <main className="page-layout">
      <section className="page-intro">
        <p className="tagline">{t.emergencyTagline}</p>
        <h1>{t.emergencyTitle}</h1>
        <p>{t.emergencyIntro}</p>
      </section>

      <section className="emergency-grid">
        <article className="emergency-card reveal reveal-1">
          <label htmlFor="country">{t.emergencyCountryLabel}</label>
          <select
            id="country"
            value={country}
            onChange={(event) => setCountry(event.target.value as CountryKey)}
          >
            <option value="us">{t.emergencyCountries.us}</option>
            <option value="fr">{t.emergencyCountries.fr}</option>
            <option value="be">{t.emergencyCountries.be}</option>
            <option value="ch">{t.emergencyCountries.ch}</option>
            <option value="ca">{t.emergencyCountries.ca}</option>
          </select>

          <label htmlFor="emergency-type">{t.emergencyTypeLabel}</label>
          <select
            id="emergency-type"
            value={emergencyType}
            onChange={(event) => setEmergencyType(event.target.value as EmergencyTypeKey)}
          >
            <option value="mental">{t.emergencyTypes.mental}</option>
            <option value="medical">{t.emergencyTypes.medical}</option>
            <option value="danger">{t.emergencyTypes.danger}</option>
          </select>

          <p className="emergency-number">
            <span>{t.emergencyNumberLabel}:</span> <strong>{number}</strong>
          </p>

          <a href={phoneHref} className="cta-emergency">
            {t.emergencyCallNow} {number}
          </a>

          <p className="emergency-mobile-hint">{t.emergencyMobileHint}</p>
        </article>

        <article className="emergency-card emergency-qr-card reveal reveal-2">
          <h2>{t.emergencyQrTitle}</h2>
          <div className="qr-shell" aria-hidden="true">
            <QRCode value={phoneHref} size={180} bgColor="#ffffff" fgColor="#173f3b" />
          </div>
          <p>{t.emergencyQrHint}</p>
        </article>
      </section>

      <p className="emergency-disclaimer">{t.emergencyDisclaimer}</p>
    </main>
  )
}

function ContactPage({ t }: { t: Copy }) {
  const [isSent, setIsSent] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSent(true)
    event.currentTarget.reset()
  }

  return (
    <main className="page-layout">
      <section className="page-intro">
        <p className="tagline">{t.contactTagline}</p>
        <h1>{t.contactTitle}</h1>
        <p>{t.contactIntro}</p>
      </section>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="topic">{t.contactTopic}</label>
        <input
          id="topic"
          name="topic"
          type="text"
          placeholder={t.contactTopicPlaceholder}
          required
        />

        <label htmlFor="message">{t.contactMessage}</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder={t.contactMessagePlaceholder}
          required
        />

        <label htmlFor="reply">{t.contactReply}</label>
        <input
          id="reply"
          name="reply"
          type="text"
          placeholder={t.contactReplyPlaceholder}
        />

        <button type="submit">{t.contactSubmit}</button>
        {isSent ? <p className="form-feedback">{t.contactFeedback}</p> : null}
      </form>
    </main>
  )
}

export default App
