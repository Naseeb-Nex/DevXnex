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

  // Form
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [message, setMessage] = useState('');

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

  function handleWhatsAppButtonClick() {

    // Create the WhatsApp link
    const phoneNumber = '918137948323';
    const encodedMessage = encodeURIComponent(
      `Full Name: ${fullName}\nEmail: ${email}\nContact No: ${contactNo}\nMessage: ${message}`
    );
    const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    // Open WhatsApp link in a new window
    window.open(whatsappLink, "_blank");
  }

  function handleEmailButtonClick() {

    // Create the Email link
    const email = 'muhammednaseeb02@gmail.com';
    const subject = 'Contact Form Submission';
    const encodedMessage = encodeURIComponent(
      `Full Name: ${fullName}\nEmail: ${email}\nContact No: ${contactNo}\nMessage: ${message}`
    );
    const emaillink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodedMessage}`;

    // Open Email link in a new window
    window.open(emaillink, "_blank");
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
                  <span className=" ">
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
              <a href="https://github.com/Naseeb-Nex" rel="noopener" target="_blank">
                <img src="svg/github1.svg" alt="GitHub" />
              </a>
              <a href="https://twitter.com/DevXnex" rel="noopener" target="_blank">
                <img src="svg/twitter1.svg" alt="Twitter" />
              </a>
              <a href="https://www.linkedin.com/in/muhammed-naseeb-647176218/" rel="noopener" target="_blank">
                <img src="svg/linkedin.svg" alt="LinkedIn" />
              </a>
              <a href="https://www.instagram.com/devxnex" rel="noopener" target="_blank">
                <img src="svg/instagram.svg" alt="Instagram" />
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
          <section className="section-services">
            <h1 className="heading-1">
              <span>Services We Offer</span>
            </h1>
            <div className="services_cards">
              <div className="nft">
                <div className='main'>
                  <img className='tokenImage' src="webp/mobileapp.webp" alt="mobile app" />
                  <h2 className="heading-2">Mobile App Development</h2>
                  <div className="description">We create high-quality mobile apps for iOS and Android, tailored to your business needs. From design to deployment, our expert team ensures seamless integration, rigorous testing, and ongoing support. Elevate your brand and engage users with our native or cross-platform solutions.</div>
                  <button className="swo-btn">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span> Get a Free Consultation
                  </button>
                </div>
              </div>
              <div className="nft">
                <div className='main'>
                  <img className='tokenImage' src="webp/website.webp" alt="mobile app" />
                  <h2 className="heading-2">Web<br />Development</h2>
                  <div className="description">Our expert team creates dynamic, responsive websites using cutting-edge technologies. From custom web applications to e-commerce platforms, we deliver seamless user experiences with optimized performance and robust security. Maximize your online presence with our professional web development services.</div>
                  <button className="swo-btn">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span> Launch Website
                  </button>
                </div>
              </div>
              <div className="nft">
                <div className='main'>
                  <img className='tokenImage' src="webp/iot-image.webp" alt="mobile app" />
                  <h2 className="heading-2">IOT Development</h2>
                  <div className="description">Our expert team designs and implements smart solutions that connect devices, collect data, and enable intelligent automation. From IoT consulting to prototyping and deployment, we offer end-to-end IoT solutions tailored to your industry needs. Unlock new opportunities, improve operational efficiency, and gain valuable insights with our cutting-edge IoT development.</div>
                  <button className="swo-btn">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span> Get Started
                  </button>
                </div>
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
            <div className="contact-form">
              <div className="screen">
                <div className="screen-header">
                  <div className="screen-header-left">
                    <div className="screen-header-button close"></div>
                    <div className="screen-header-button maximize"></div>
                    <div className="screen-header-button minimize"></div>
                  </div>
                  <div className="screen-header-right">
                    <div className="screen-header-ellipsis"></div>
                    <div className="screen-header-ellipsis"></div>
                    <div className="screen-header-ellipsis"></div>
                  </div>
                </div>
                <div className="screen-body">
                  <div className="screen-body-item left">
                    <div className="app-title">
                      <h1 className="heading-1">
                        <span>Contact Us </span>
                      </h1>
                    </div>
                    <div className="app-contact">Our team would love to hear from you</div>
                  </div>
                  <div className="screen-body-item">
                    <div className="app-form">
                      <div className="app-form-group">
                        <label className="inputfieldlable">Full Name</label>
                        <input
                          className="app-form-control"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                      <div className="app-form-group">
                        <label className="inputfieldlable">Email</label>
                        <input
                          className="app-form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="app-form-group">
                        <label className="inputfieldlable">Contact No</label>
                        <input
                          className="app-form-control"
                          value={contactNo}
                          onChange={(e) => setContactNo(e.target.value)}
                        />
                      </div>
                      <div className="app-form-group message">
                        <label className="inputfieldlable">Your Message</label>
                        <textarea
                          className="app-form-control"
                          rows={4}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                    <div className="app-form-group buttons">
                      <button className="sendbtn" onClick={handleWhatsAppButtonClick}>
                        <img className="whatsapp" src="svg/whatsapp.svg" alt="whatsapp" />
                        Message Us
                        <div className="btnarrow">›</div>
                      </button>
                      <button className="sendbtn" onClick={handleEmailButtonClick}>
                        <img className="whatsapp" src="svg/gmail.svg" alt="Gmail" />
                        Email Us
                        <div className="btnarrow">›</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="msgor">Or</div>
              <div className="schedule-meeting">
                <div className="schedule-meeting__left">
                  <h1 className="heading-2" style={{ marginBottom: "0.8rem" }}>Schedule a meeting</h1>
                  <div className="paragraph">Embark on a seamless journey of connection and collaboration with our client-centric platform. Experience the ease of scheduling meetings at your convenience, fostering meaningful interactions that drive success. Unleash the power of connection </div>
                  <div className="btn-conteiner">
                    <a className="btn-content" href="https://calendly.com/muhammednaseeb/devxnex-lets-build-it">
                      <span className="btn-title">Make Your Move</span>
                      <span className="icon-arrow">
                        <svg width="66px" height="43px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                          <g id="arrow" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <path id="arrow-icon-one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                            <path id="arrow-icon-two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                            <path id="arrow-icon-three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path>
                          </g>
                        </svg>
                      </span>
                    </a>
                  </div>
                </div>
                <div className="schedule-meeting__right">
                  <img className="meeting-img" src="svg/meeting.svg"></img>
                </div>
              </div>

            </div>

          </section>
          <section className="section-socials">
            <h1 className="heading-1">
              <span>Dont be a stranger!</span> <small>👋</small>
            </h1>
            <p className="paragraph">Connect with us online</p>
            <div className="section-socials--links">
              <a href="https://github.com/Naseeb-Nex" rel="noopener" target="_blank">
                <img className="social--icons" src="svg/github1.svg" alt="GitHub" />
                GITHUB
              </a>
              <a href="https://twitter.com/DevXnex" rel="noopener" target="_blank">
                <img className="social--icons" src="svg/twitter1.svg" alt="Twitter" />
                TWITTER
              </a>
              <a href="https://www.linkedin.com/in/muhammed-naseeb-647176218/" rel="noopener" target="_blank">
                <img className="social--icons" src="svg/linkedin.svg" alt="LinkedIn" />
                LINKEDIN
              </a>
              <a href="https://www.instagram.com/devxnex" rel="noopener" target="_blank">
                <img className="social--icons" src="svg/instagram.svg" alt="Instagram" />
                INSTAGRAM
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
    // TODO : Add Linking between section using #
    // TODO : Refine Code and remove ADD
    // TODO : check all links
    // TODO : remove all unwanted images
    // TODO : Host code preparation

    </>
  );
};

export default index;
