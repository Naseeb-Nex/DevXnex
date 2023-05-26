import React, { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { Navigation } from "../components/Navigation/Navigation";
import useSwr from "swr";
import ReactGa from "react-ga";
import { Frame } from "../components/Frame";

interface indexProps { }

interface Ireply {
  id: number;
  img: string;
  title: string;
  desc: string;
}

const locomotiveScroll =
  typeof window !== `undefined` ? require("locomotive-scroll").default : null;

const hoverEffect =
  typeof window !== `undefined` ? require("hover-effect").default : null;

const transition: { duration: number; ease: number[] } = {
  duration: 1.4,
  ease: [0.6, 0.01, -0.05, 0.9],
};

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const index: React.FC<indexProps> = ({ }) => {
  const [speakerState, setSpeakerState] = useState("muted");
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);
  const { data: features, error } = useSwr("/api/features", fetcher);

  if (error) console.log(error);

  const refScroll = React.useRef(null);
  let lscroll: any;

  React.useEffect(() => {
    ReactGa.initialize("UA-177100391-3");
    ReactGa.pageview(window.location.pathname + window.location.search);

    if (!refScroll.current) return;
    // @ts-ignore
    lscroll = new locomotiveScroll({
      el: refScroll.current,
      smooth: true,
      reloadOnContextChange: true,
      multiplier: 0.75,
      inertia: 0.5,
    });

    // update locomotive scroll
    window.addEventListener("load", () => {
      let image = document.querySelector("img");
      // @ts-ignore
      const isLoaded = image!.complete && image!.naturalHeight !== 0;
      lscroll.update();
    });

    // image hover effect
    Array.from(document.querySelectorAll(".project-card__middle")).forEach(
      (el: any) => {
        const imgs: any = Array.from(el.querySelectorAll("img"));
        new hoverEffect({
          parent: el,
          intensity: 0.2,
          speedIn: el.dataset.speedin || undefined,
          speedOut: el.dataset.speedout || undefined,
          easing: el.dataset.easing || undefined,
          hover: el.dataset.hover || undefined,
          image1: imgs[0].getAttribute("src"),
          image2: imgs[1].getAttribute("src"),
          displacementImage: el.dataset.displacement,
        });
      }
    );

    // header cursor
    const cursor = document.querySelector(".cursor");
    window.onmousemove = (e: any) => {
      cursor!.setAttribute("style", `top: ${e.pageY}px; left: ${e.pageX}px;`);
    };

  }, []);

  const handleSpeaker = () => {
    const audio = document.querySelector("#audioPlayer") as HTMLVideoElement;

    if (speakerState === "muted") {
      setSpeakerState("unmuted");
      audio.pause();
    } else {
      setSpeakerState("muted");
      audio.play();
    }
  };

  function toggleBodyScroll(isToggleOpen: boolean) {
    if (isToggleOpen === false) {
      setIsToggleOpen(true);
    } else if (isToggleOpen === true) {
      setIsToggleOpen(false);
    }
  }

  return (
    <>
      <div id="menu-target" data-scroll-container ref={refScroll}>
        <Head>
          <link rel="icon" href="svg/favicon.svg" />
          <link href="https://adeolaadeoti.xyz/" rel="canonical" />
          <meta name="theme-color" content="#10101A" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="#10101A"
          />
          <title>Adeola Adeoti 🚀 &mdash; Frontend Devloper</title>
          <meta
            name="description"
            content="I'm a self-taught Front End Developer and turning ideas into real life products is my calling."
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Adeola Adeoti 🚀 &mdash; Frontend Devloper"
          />
          <meta property="og:url" content="https://adeolaadeoti.xyz/" />
          <meta property="og:image" content="webp/preview-image.png" />
          <meta
            property="og:description"
            content="I'm a self-taught Front End Developer and turning ideas into real life products is my calling."
          />
          <meta
            name="twitter:title"
            content="Adeola Adeoti 🚀 &mdash; Frontend Devloper"
          />
          <meta
            name="twitter:description"
            content="I'm a self-taught Front End Developer and turning ideas into real life products is my calling."
          />
          <meta name="twitter:image" content="webp/preview-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://adeolaadeoti.xyz/" />
        </Head>
        {/* Todo Audio Disabled */}
        {/* <audio loop id="audioPlayer" autoPlay style={{ display: "none" }}>
          <source src="sound/preloader.mp3" type="audio/mp3" />
        </audio> */}
        <motion.div
          data-scroll
          data-scroll-sticky
          data-scroll-target="#menu-target"
          // TODO : change the speed after debug
          animate={{ top: "-100vh", transition: { ...transition, delay: 1 } }}
          className="preloader"
        >
          <div className="preloader__wrapper">
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { ...transition } }}
              className="preloader__left"
            >
              <img className="preloader__img" src="svg/logo-left.svg" alt="devxnex logo" />
            </motion.div>
            <motion.div
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { ...transition } }}
              className="preloader__right"
            >
              <p className="preloader__text">PLAN</p>
              <p className="preloader__text">DESIGN</p>
              <p className="preloader__text">DEVELOP</p>
              <p className="preloader__text">TEST</p>
              <p className="preloader__text">LAUNCH</p>
            </motion.div>
          </div>
        </motion.div>
        <div className="cursor"></div>
        <Navigation
          isOpen={isToggleOpen}
          toggleOpen={() => toggleBodyScroll(isToggleOpen)}
        />
        <div className="header-wrapper">
          <header className="header">
            <div className="header__hero">
              <div className="header__hero__wrapper">

                <div className="header__hero__wrapper--heading">
                  <span>turning ideas into </span> <br />
                  <span>real life </span>
                  <span className="header__hero__wrapper--heading-gradient">
                    products{" "}
                  </span>
                  <br />
                  <button className="header__hero__wrapper--glow-button" type="button">Try it Out</button>
                </div>
                <div className="header__hero__wrapper--frame">
                  <Frame radius={50} />
                </div>
              </div>
              <a
                data-scroll-to
                className="header__hero--cta"
                href="#sectionProjects"
              >
                <span>View Our Works</span>
              </a>
            </div>
          </header>
          <div className="header__footer">
            <div className="header__footer--left">
              <div className="speaker">
                <div
                  onClick={handleSpeaker}
                  className={`${"speaker__toggle"} ${speakerState === "unmuted"
                    ? `${"speaker__toggle--anim"}`
                    : ``
                    }`}
                >
                  &nbsp;
                </div>
                <div className="speaker__muted">
                  <img src="svg/muted.svg" alt="muted icon" />
                </div>
                <div className="speaker__unmuted">
                  <svg
                    width="14"
                    height="11"
                    viewBox="0 0 15 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.599976"
                      y="1.06665"
                      width="1.4"
                      height="10"
                      fill="#F2F2F2"
                      className="rect1-anim"
                    />
                    <rect
                      x="9"
                      y="1.06665"
                      width="1.4"
                      height="10"
                      fill="#F2F2F2"
                      className="rect2-anim"
                    />
                    <rect
                      x="4.79999"
                      y="1.06665"
                      width="1.4"
                      height="10"
                      fill="#F2F2F2"
                      className="rect3-anim"
                    />
                    {/* <rect
                      x="13.2"
                      y="1.06665"
                      width="1.4"
                      height="10"
                      fill="#F2F2F2"
                      className="rect4-anim"
                    /> */}
                  </svg>
                </div>
              </div>
            </div>
            <div className="header__footer--right">
              <a
                href="https://github.com/Naseeb-Nex"
                rel="noopener"
                target="_blank"
              >
                👾 GH
              </a>
              <a
                href="https://twitter.com/DevXnex"
                rel="noopener"
                target="_blank"
              >
                🐦 TW
              </a>
              <a
                href="https://www.linkedin.com/in/muhammed-naseeb-647176218/"
                rel="noopener"
                target="_blank"
              >
                💼 LD
              </a>
              <a
                href="https://www.instagram.com/devxnex"
                rel="noopener"
                target="_blank"
              >
                {" "}
                📸 IN
              </a>
            </div>
          </div>
        </div>
        <main className="container">
          <section id="AboutUs" className="sectionAboutUs">
            <div className="content">

              <div className="aboutustext ">
                <h1 className="heading-1" style={{ width: "100%" }}  >
                  <span>About Us</span>
                </h1>
                <div className="about-text">
                  <div className="paragraph abouttext">
                    DevXnex is a premier software development company, specializing in crafting innovative mobile and web applications. Our passion for technology, coupled with a commitment to excellence, propels us to create user-friendly, robust solutions across various platforms, including iOS, Android, and web.
                  </div>
                  <br />
                  <div className="paragraph abouttext">
                    Our team, an assembly of seasoned developers, innovative designers, and meticulous testers, is the driving force behind our success. We uphold values of integrity, transparency, and customer satisfaction, allowing us to deliver personalized, future-ready solutions that propel businesses into a digital-centric future.
                  </div>
                </div>
              </div>

              <div className="about-image">
                <img className="aboutimg" src="svg/aboutus.png" alt="About me" />
              </div>

            </div>
          </section>
          <section
            data-scroll
            data-scroll-offset="35%"
            data-scroll-repeat={true}
            data-scroll-class="section-reviews__bg"
            className="section-reviews"
          >
            <div className="section-reviews__top">
              <h1 className="heading-1">
                <span>Feature Fusions</span>
              </h1>
              <p className="paragraph paragraph__sub">
                Igniting Possibilities, Blending Innovations, and Elevating Experiences
              </p>
            </div>
            <div className="section-reviews__bottom">
              <div className="section-reviews__bottom-wrapper feature-card__anim1">
                {features?.data.map((feature: Ireply) => (
                  <div key={feature.id} className="feature-card">
                    <div className="feature-card__top">
                      <div className="feature-card__top">
                        <div className="feature-card__top--left">
                          <img src={feature.img}></img>
                          <h3 className="feature-card__h3">{feature.title}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="feature-card__bottom">
                      <h2 className="feature-card__h2">{feature.desc}</h2>
                    </div>
                  </div>
                ))}
              </div>
              <div className="section-reviews__bottom-wrapper feature-card__anim2">
                {features?.data.sort().map((feature: Ireply) => (
                  <div key={feature.id} className="feature-card">
                    <div className="feature-card__top">
                      <div className="feature-card__top--left">
                        <img src={feature.img}></img>
                        <h3 className="feature-card__h3">{feature.title}</h3>
                      </div>
                    </div>
                    <div className="feature-card__bottom">
                      <h2 className="feature-card__h2">{feature.desc}</h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section id="sectionProjects" className="section-projects">
            <h1 className="heading-1">
              <span>Project Spotlight</span>
            </h1>
            <p className="paragraph">
              Spotlight on our Groundbreaking Projects
            </p>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">
                  Static Website
                </h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="webp/bbright.webp" alt="ima website model" />
                <img src="webp/imaweb2.webp" alt="ima logo" />
              </div>
              <div className="project-card__right" >
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="imaweb-anim"
                  className="heading-2"
                  style={{ marginBottom: '2rem' }}
                >
                  IMA
                  <br /> Website
                </h2>
                <p className="project-card__description">
                  A visually appealing and engaging website was meticulously designed and crafted, captivating users with its stunning visuals and immersive experience.
                </p>

                <a
                  rel="noopener"
                  target="_blank"
                  href="https://naseeb-nex.github.io/Ideal-Marketing-Webstie/"
                  className="project-card__link"
                >
                  VISIT THE WEBSITE
                </a>
                <div className="paragraph">

                </div>
                <div className="project-card__socials">
                  <a
                    rel="noopener"
                    target="_blank"
                    href="https://github.com/Naseeb-Nex/Ideal-Marketing-Webstie"
                  >
                    <img src="svg/github.svg" alt="github icon" />
                  </a>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">IOT based Mobile Application</h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="webp/smarthut.webp" alt="SmartHut" />
                <img src="webp/smarthut-2.webp" alt="SmartHut logo" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="smarthut-anim"
                  className="heading-2"
                  style={{ marginBottom: '2rem' }}
                >
                  SmartHut
                </h2>
                <p className="project-card__description">
                  Devxnex leverages IoT to transform home appliances into smart devices, enabling users to control and monitor them remotely via a user-friendly mobile app, enhancing convenience and efficiency in daily life.
                </p>
                <a
                  rel="noopener"
                  target="_blank"
                  href="https://github.com/Naseeb-Nex/Smarthut"
                  className="project-card__link"
                >
                  Get the Full Picture
                </a>
                <div className="project-card__socials">
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">
                  Technician management System
                </h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="webp/ima-app.webp" alt="Ima App" />
                <img src="webp/imaapp-2.webp" alt="ima App logo" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="idealapp-anim"
                  className="heading-2"
                >
                  Ideal Marketing
                  <br />Technician Management
                  <br />Software
                </h2>
                <a
                  href="https://play.google.com/store/apps/details?id=com.idealassociate.ideal_marketing"
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
                  Discover More
                </a>
                <div className="project-card__socials">
                  <a
                    rel="noopener"
                    target="_blank"
                    href="https://login.idealassociate.com"
                  >
                    <img src="svg/dribble.svg" alt="Website" />
                  </a>
                  <a
                    rel="noopener"
                    target="_blank"
                    href="https://github.com/Naseeb-Nex/Ideal-maketing-app"
                  >
                    <img src="svg/github.svg" alt="github icon" />
                  </a>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">Social Application</h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="webp/vconnect.webp" alt="Vconnect model" />
                <img src="webp/vconnect-2.webp" alt="Vconnect logo" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="vconnect-anim"
                  className="heading-2"
                  style={{ marginBottom: '2rem' }}
                >
                  VConnect
                </h2>
                <p className="project-card__description">
                  Experience seamless social networking with the user-centric application developed by Devxnex. Connect, engage, and explore with features such as sign-up, profile creation, user search, friend management, and mutual friends discovery. Elevate your social interactions with Devxnex's innovative platform.
                </p>
                <a
                  rel="noopener"
                  target="_blank"
                  href="https://github.com/Naseeb-Nex/V-Connect"
                  className="project-card__link"
                >
                  Learn More
                </a>
                <div className="project-card__socials">
                </div>
              </div>
            </div>
          </section>
          <section className="section-contact">
            <h1 className="heading-1">
              <span>Sold Yet? </span> <small>🤙</small>
            </h1>
            <h2 className="section-contact__h2">
              Thanks for stopping by, I’m currently looking to join a new team
              of creative designers and developers. If you think we might be a
              good fit for one another, give me a
              <a href="tel:+2349066383763"> call 🇳🇬 &nbsp;</a>
              or send me an
              <a
                href="mailto:adeolaonigegeara@gmail.com"
                rel="noopener"
                target="_blank"
              >
                &nbsp; email 📧
              </a>
              .
            </h2>
          </section>
          <section className="section-socials">
            <h1 className="heading-1">
              <span>Dont be a stranger!</span> <small>👋</small>
            </h1>
            <p className="paragraph">Connect with me online</p>
            <div className="section-socials--links">
              <a
                href="https://github.com/adeolaadeoti"
                rel="noopener"
                target="_blank"
              >
                👾 GitHub
              </a>
              <a
                href="https://twitter.com/adeolajs"
                rel="noopener"
                target="_blank"
              >
                🐦 Twitter
              </a>
              <a
                href="https://www.linkedin.com/in/adeoladev"
                rel="noopener"
                target="_blank"
              >
                💼 LinkedIn
              </a>
              <a
                href="https://www.instagram.com/adeolaadeoti_"
                rel="noopener"
                target="_blank"
              >
                📸 Instagram
              </a>
            </div>
          </section>
        </main>
        <footer className="footer">
          <img
            src="svg/adeola-logo-footer.svg"
            alt="design and devloped by adeola"
          />
          <div className="footer__socials">
            <a
              href="https://dribbble.com/shots/16100745-Adeola-Adeoti-Personal-Website"
              target="_blank"
              rel="noopener"
            >
              <img src="svg/dribble.svg" alt="dribble logo" />
            </a>
            <a
              href="https://github.com/adeolaadeoti/adeolaadeoti-v2"
              target="_blank"
              rel="noopener"
            >
              <img src="svg/github.svg" alt="github logo" />
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default index;
