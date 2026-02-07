import './App.css'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="site-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="topbar">
        <p className="brand">TAKE CARE</p>
        <nav className="nav">
          <NavLink to="/" end className="nav-link">
            Accueil
          </NavLink>
          <NavLink to="/ressources" className="nav-link">
            Ressources
          </NavLink>
          <NavLink to="/contact-anonyme" className="nav-link">
            Contact anonyme
          </NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ressources" element={<ResourcesPage />} />
        <Route path="/contact-anonyme" element={<ContactPage />} />
      </Routes>
    </div>
  )
}

function HomePage() {
  return (
    <>
      <section className="hero">
        <p className="tagline">COMMUNAUTE TAKE CARE</p>
        <h1>Un espace pour parler sante mentale, sans jugement.</h1>
        <p className="hero-copy">
          Addictions, TDAH, TDC et autres difficultes du quotidien: ici, on
          partage des ressources, du soutien et des experiences vecues.
        </p>

        <div className="hero-actions">
          <a
            href="https://discord.gg/SwUwGGj979"
            target="_blank"
            rel="noreferrer"
            className="cta-discord"
          >
            Rejoindre le serveur Discord
          </a>
          <p className="invite-note">
            Espace communautaire d&apos;ecoute et d&apos;entraide.
          </p>
        </div>
      </section>

      <section className="topics-grid">
        <article className="topic-card reveal reveal-1">
          <h2>Addiction</h2>
          <p>
            Echanger avec des personnes qui comprennent les hauts, les rechutes
            et les progres.
          </p>
        </article>
        <article className="topic-card reveal reveal-2">
          <h2>TDAH</h2>
          <p>
            Trouver des strategies concretes pour l&apos;organisation, la
            concentration et la fatigue mentale.
          </p>
        </article>
        <article className="topic-card reveal reveal-3">
          <h2>TDC</h2>
          <p>
            Partager des pistes utiles pour mieux gerer le quotidien et garder
            confiance en soi.
          </p>
        </article>
      </section>
    </>
  )
}

function ResourcesPage() {
  return (
    <main className="page-layout">
      <section className="page-intro">
        <p className="tagline">RESSOURCES</p>
        <h1>Des pistes concretes pour avancer a ton rythme.</h1>
        <p>
          Cette page rassemble des categories utiles pour orienter les membres
          du serveur vers un soutien adapte.
        </p>
      </section>

      <section className="resource-grid">
        <article className="resource-card reveal reveal-1">
          <h2>Urgence et crise</h2>
          <p>
            Numeros d&apos;urgence, ligne de prevention du suicide, et contacts
            de proximite.
          </p>
        </article>
        <article className="resource-card reveal reveal-2">
          <h2>Suivi professionnel</h2>
          <p>
            Psychologues, psychiatres, centres CSAPA, structures de soins en
            addictologie.
          </p>
        </article>
        <article className="resource-card reveal reveal-3">
          <h2>Outils quotidiens</h2>
          <p>
            Methodes d&apos;organisation TDAH, routines anti-stress, et supports
            pour prevenir les rechutes.
          </p>
        </article>
        <article className="resource-card reveal reveal-1">
          <h2>Groupes de parole</h2>
          <p>
            Associations, groupes d&apos;entraide locaux, et communautes en
            ligne bienveillantes.
          </p>
        </article>
      </section>
    </main>
  )
}

function ContactPage() {
  const [isSent, setIsSent] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSent(true)
    event.currentTarget.reset()
  }

  return (
    <main className="page-layout">
      <section className="page-intro">
        <p className="tagline">CONTACT ANONYME</p>
        <h1>Un message confidentiel, sans donner ton identite.</h1>
        <p>
          Ce formulaire est pense pour laisser une demande, un temoignage ou un
          besoin de soutien en restant anonyme.
        </p>
      </section>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="topic">Sujet</label>
        <input
          id="topic"
          name="topic"
          type="text"
          placeholder="Ex: besoin de soutien apres une rechute"
          required
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Ecris librement, sans nom ni informations personnelles."
          required
        />

        <label htmlFor="reply">Reponse (optionnel)</label>
        <input
          id="reply"
          name="reply"
          type="text"
          placeholder="Pseudo Discord ou email si tu veux une reponse"
        />

        <button type="submit">Envoyer anonymement</button>
        {isSent ? (
          <p className="form-feedback">
            Message envoye. Merci pour ta confiance.
          </p>
        ) : null}
      </form>
    </main>
  )
}

export default App
