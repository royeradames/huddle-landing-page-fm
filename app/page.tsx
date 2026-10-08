/* Native images keep the supplied challenge SVGs at their intrinsic proportions. */
/* eslint-disable @next/next/no-img-element */
import { RegisterButton } from "./register-button";
import { siteName } from "./site";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "./social-icons";

const socials = [
  { name: "Facebook", href: "https://www.facebook.com/", Icon: FacebookIcon },
  { name: "Twitter", href: "https://twitter.com/", Icon: TwitterIcon },
  { name: "Instagram", href: "https://www.instagram.com/", Icon: InstagramIcon },
];

export default function Home() {
  return (
    <div className="page">
      <header className="site-header">
        <img className="logo" src="/images/logo.svg" width="198" height="49" alt={siteName} />
      </header>
      <main className="hero">
        <img
          className="mockups"
          src="/images/illustration-mockups.svg"
          width="709"
          height="506"
          alt="Huddle's community feed on a desktop browser and a phone."
          fetchPriority="high"
        />
        <div className="intro">
          <h1>Build The Community Your Fans Will Love</h1>
          <p>
            Huddle re-imagines the way we build communities. You have a voice, but so does your audience. Create connections with your users as you engage in genuine discussion.
          </p>
          <RegisterButton />
        </div>
      </main>
      <footer className="site-footer">
        <ul className="socials" aria-label="Social networks">
          {socials.map(({ name, href, Icon }) => (
            <li key={name}>
              <a href={href} target="_blank" rel="noopener noreferrer">
                <span className="social-ring"><Icon /></span>
                <span className="sr-only">{name} (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="attribution">
          Challenge by <a href="https://www.frontendmentor.io/challenges/huddle-landing-page-with-a-single-introductory-section-B_2Wvxgi0">Frontend Mentor</a>. Built by <a href="https://royeradames.com">Royer Adames</a>.
        </p>
      </footer>
    </div>
  );
}
