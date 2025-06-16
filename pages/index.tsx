import React, { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { Navigation } from "../components/Navigation/Navigation";
import useSwr from "swr";
import ReactGa from "react-ga";
import { Frame } from "../components/Frame";

interface indexProps {}

interface Ireply {
  id: number;
  img: string;
  title: string;
  desc: string;
}

const hoverEffect =
  typeof window !== `undefined` ? require("hover-effect").default : null;

const transition: { duration: number; ease: number[] } = {
  duration: 1.4,
  ease: [0.6, 0.01, -0.05, 0.9],
};

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const index: React.FC<indexProps> = ({}) => {
  const [speakerState, setSpeakerState] = useState("muted");
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);
  const { data: features, error } = useSwr("/api/features", fetcher);

  // Form
  const [loanData, setLoanData] = useState({
    age: "",
    sex: "male",
    job: "2",
    housing: "own",
    saving_accounts: "little", // Default to 'little'
    checking_account: "little", // Default to 'little'
    credit_amount: "",
    duration: "",
    purpose: "radio/TV",
  });
// ADD THESE NEW STATE DECLARATIONS
const [isModalOpen, setIsModalOpen] = useState(false);
// This state will hold the API result object or an error object
const [predictionResult, setPredictionResult] = useState<{
  risk: string;
  probability: number;
  errorMessage?: string; // Optional field for detailed errors
} | null>(null);

// ADD THIS NEW MODAL COMPONENT AND HELPER FUNCTION

const closeModal = () => {
  setIsModalOpen(false);
  setPredictionResult(null); // Reset the result on close
};

// The new, aesthetic, and dynamic modal component
const ResultModal = ({
  result,
  onClose,
}: {
  result: { risk: string; probability: number; errorMessage?: string } | null;
  onClose: () => void;
}) => {
  if (!result) return null;

  let borderColor, icon, title, message;

  switch (result.risk) {
    case "Good credit":
      borderColor = "#4CAF50"; // Green
      icon = "✅";
      title = "Congratulations!";
      message = "Your chances of getting the credit are high.";
      break;
    case "Bad credit":
      borderColor = "#F44336"; // Red
      icon = "❌";
      title = "High Risk Detected";
      message = "Your application is likely to be considered high-risk.";
      break;
    default: // This will handle the 'Error' case
      borderColor = "#FFC107"; // Amber
      icon = "⚠️";
      title = "An Error Occurred";
      message = result.errorMessage || "Could not get a prediction. Please try again.";
      break;
  }

  const probabilityPercent = (result.probability * 100).toFixed(2);

  return (
    <div
      style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.7)", display: "flex",
        justifyContent: "center", alignItems: "center", zIndex: 10000,
        backdropFilter: 'blur(5px)'
      }}
    >
      <div
        style={{
          background: "#1d1e29", padding: "30px 40px", borderRadius: "15px",
          textAlign: "center", color: "white", maxWidth: "400px",
          fontFamily: "'Circular Std Book', sans-serif",
          border: `2px solid ${borderColor}`,
          boxShadow: `0 0 20px ${borderColor}40`,
          transform: 'scale(1)',
          animation: 'scaleIn 0.3s ease-out'
        }}
      >
        <style>{`@keyframes scaleIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
        <span style={{ fontSize: '3.5rem', display: 'block', marginBottom: '10px' }}>{icon}</span>
        <h2 style={{ fontFamily: "'Mark Pro', sans-serif", margin: "0 0 15px 0", fontSize: '2.4rem' }}>
          {title}
        </h2>
        <p style={{ fontSize: "1.6rem", lineHeight: "1.5", margin: "0 0 20px 0", color: '#c4c4c4' }}>
          {message}
        </p>
        {result.risk !== 'Error' && (
           <p style={{ fontSize: "1.4rem", fontWeight: 'bold', margin: "0 0 25px 0" }}>
            Confidence: {probabilityPercent}%
          </p>
        )}
        <button
          onClick={onClose}
          className="header__hero__wrapper--glow-button"
          style={{ fontFamily: "'Circular Std Book', sans-serif", fontSize: "1.8rem" }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

  if (error) console.log(error);

  const refScroll = React.useRef(null);

  React.useEffect(() => {
    ReactGa.initialize("UA-177100391-3");
    ReactGa.pageview(window.location.pathname + window.location.search);

    // update locomotive scroll
    window.addEventListener("load", () => {
      let image = document.querySelector("img");
      // @ts-ignore
      const isLoaded = image!.complete && image!.naturalHeight !== 0;
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

  // ADD THESE FUNCTIONS
  const handleLoanDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLoanData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // REPLACE the old handlePredictionSubmit function with this one

// REPLACE THE OLD FUNCTION WITH THIS ONE
const handlePredictionSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const apiPayload = {
    Age: parseInt(loanData.age, 10),
    Sex: loanData.sex,
    Job: parseInt(loanData.job, 10),
    Housing: loanData.housing,
    Saving_accounts: loanData.saving_accounts || null,
    Checking_account: loanData.checking_account || null,
    Credit_amount: parseInt(loanData.credit_amount, 10),
    Duration: parseInt(loanData.duration, 10),
    Purpose: loanData.purpose,
  };

  console.log(apiPayload);

  try {
    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apiPayload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: "Unknown API error" }));
      throw new Error(`API request failed: ${response.status}. ${errorData.detail}`);
    }

    const result = await response.json();
    setPredictionResult(result); // Store the entire result object

  } catch (error) {
    console.error("API call failed:", error);
    // Set a specific error state for the modal to display
    setPredictionResult({
      risk: 'Error',
      probability: 0,
      errorMessage: error instanceof Error ? error.message : String(error)
    });
  } finally {
    setIsModalOpen(true); // Open the modal in all cases
  }
};

  return (
    <>
      <div id="menu-target" data-scroll-container ref={refScroll}>
        <Head>
          <link rel="icon" href="svg/favicon.svg" />
          <link href="https://devxnex.live/" rel="canonical" />
          <meta name="theme-color" content="#10101A" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="#10101A"
          />
          <title>DevXnex</title>
          <meta
            name="description"
            content="Software development startup that turning ideas into real life products"
          />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="DevXnex" />
          <meta property="og:url" content="https://devxnex.live/" />
          <meta
            property="og:image"
            content="https://devxnex.live/webp/preview-image.png"
          />
          <meta
            property="og:description"
            content="Software development startup that turns ideas into real life products"
          />

          <meta name="twitter:title" content="DevXnex" />
          <meta
            name="twitter:description"
            content="Software development startup that turning ideas into real life products"
          />

          <meta name="twitter:image" content="webp/preview-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://devxnex.live/" />
        </Head>
        <audio loop id="audioPlayer" autoPlay style={{ display: "none" }}>
          <source src="sound/preloader.mp3" type="audio/mp3" />
        </audio>
        <motion.div
          data-scroll
          data-scroll-sticky
          data-scroll-target="#menu-target"
          animate={{ top: "-100vh", transition: { ...transition, delay: 8 } }}
          className="preloader"
        >
          <div className="preloader__wrapper">
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { ...transition } }}
              className="preloader__left"
            >
              <img
                className="preloader__img"
                src="svg/logo.png"
                alt="devxnex logo"
              />
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
                  <span>Know your loan</span>
                  <span>before they </span>
                  <span className="header__hero__wrapper--heading-gradient">
                    Decide{" "}
                  </span>
                  {/* <br /> */}
                  <a data-scroll-to href="#section-contact">
                    <button
                      className="header__hero__wrapper--glow-button"
                      type="button"
                    >
                      Try it Out
                    </button>
                  </a>
                </div>
                <div className="header__hero__wrapper--frame">
                  <Frame radius={50} />
                </div>
              </div>
            </div>
          </header>
          <div className="header__footer">
            <div className="header__footer--left">
              <div className="speaker">
                <div
                  onClick={handleSpeaker}
                  className={`${"speaker__toggle"} ${
                    speakerState === "unmuted"
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
            <div className="header__footer--right"></div>
          </div>
        </div>
        <main className="container">
          <section
            className="section-contact"
            id="section-contact"
            style={{ marginBottom: "20rem" }}
          >
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
                  <div
                    className="screen-body-item"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <div className="app-title" style={{ textAlign: "center" }}>
                      <h1
                        className="heading-1"
                        style={{ justifyContent: "center" }}
                      >
                        <span>Loan Eligibility Prediction</span>
                      </h1>
                    </div>

                    <div
                      className="app-contact"
                      style={{
                        textAlign: "center",
                        marginTop: "1rem",
                        marginBottom: "2.5rem",
                      }}
                    >
                      Fill in the details below to get a prediction.
                    </div>

                    <form
                      onSubmit={handlePredictionSubmit}
                      style={{ width: "100%" }}
                    >
                      <div
                        className="app-form"
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "15px 20px",
                        }}
                      >
                        {/* --- Row 1: Personal Info --- */}
                        <div
                          className="app-form-group"
                          style={{ flex: "1 1 30%", minWidth: "180px" }}
                        >
                          <label className="inputfieldlable">Age</label>
                          <input
                            type="number"
                            name="age"
                            className="app-form-control"
                            placeholder="e.g., 35"
                            value={loanData.age}
                            onChange={handleLoanDataChange}
                            required
                          />
                        </div>
                        <div
                          className="app-form-group"
                          style={{ flex: "1 1 30%", minWidth: "180px" }}
                        >
                          <label className="inputfieldlable">Sex</label>
                          <select
                            name="sex"
                            className="app-form-control"
                            value={loanData.sex}
                            onChange={handleLoanDataChange}
                            required
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                        <div
                          className="app-form-group"
                          style={{ flex: "1 1 30%", minWidth: "180px" }}
                        >
                          <label className="inputfieldlable">Job</label>
                          <select
                            name="job"
                            className="app-form-control"
                            value={loanData.job}
                            onChange={handleLoanDataChange}
                            required
                          >
                            <option value="1">Unemployed / No job</option>
                            <option value="2">Employed</option>
                            <option value="3">
                              Self-employed or Professional
                            </option>
                          </select>
                        </div>

                        {/* --- Row 2: Financial Info --- */}
                        <div
                          className="app-form-group"
                          style={{ flex: "1 1 30%", minWidth: "180px" }}
                        >
                          <label className="inputfieldlable">Housing</label>
                          <select
                            name="housing"
                            className="app-form-control"
                            value={loanData.housing}
                            onChange={handleLoanDataChange}
                            required
                          >
                            <option value="own">Own</option>
                            <option value="free">Free</option>
                            <option value="rent">Rent</option>
                          </select>
                        </div>
                        {/* --- New Dropdown for Saving accounts --- */}
                        <div
                          className="app-form-group"
                          style={{ flex: "1 1 30%", minWidth: "180px" }}
                        >
                          <label className="inputfieldlable">
                            Saving accounts
                          </label>
                          <select
                            name="saving_accounts"
                            className="app-form-control"
                            value={loanData.saving_accounts}
                            onChange={handleLoanDataChange}
                            required
                          >
                            <option value="">No account</option>
                            <option value="little">Little</option>
                            <option value="moderate">Moderate</option>
                            <option value="quite rich">Quite Rich</option>
                            <option value="rich">Rich</option>
                          </select>
                        </div>

                        {/* --- New Dropdown for Checking account --- */}
                        <div
                          className="app-form-group"
                          style={{ flex: "1 1 30%", minWidth: "180px" }}
                        >
                          <label className="inputfieldlable">
                            Checking account
                          </label>
                          <select
                            name="checking_account"
                            className="app-form-control"
                            value={loanData.checking_account}
                            onChange={handleLoanDataChange}
                            required
                          >
                            <option value="">No account</option>
                            <option value="little">Little</option>
                            <option value="moderate">Moderate</option>
                            <option value="rich">Rich</option>
                          </select>
                        </div>

                        {/* --- Row 3: Loan Details --- */}
                        <div
                          className="app-form-group"
                          style={{ flex: "1 1 45%", minWidth: "180px" }}
                        >
                          <label className="inputfieldlable">
                            Credit amount
                          </label>
                          <input
                            type="number"
                            name="credit_amount"
                            className="app-form-control"
                            placeholder="e.g., 2500"
                            value={loanData.credit_amount}
                            onChange={handleLoanDataChange}
                            required
                          />
                        </div>
                        <div
                          className="app-form-group"
                          style={{ flex: "1 1 45%", minWidth: "180px" }}
                        >
                          <label className="inputfieldlable">
                            Duration (in months)
                          </label>
                          <input
                            type="number"
                            name="duration"
                            className="app-form-control"
                            placeholder="e.g., 24"
                            value={loanData.duration}
                            onChange={handleLoanDataChange}
                            required
                          />
                        </div>

                        {/* --- Row 4: Purpose --- */}
                        <div
                          className="app-form-group"
                          style={{ flex: "1 1 100%" }}
                        >
                          <label className="inputfieldlable">Purpose</label>
                          <select
                            name="purpose"
                            className="app-form-control"
                            value={loanData.purpose}
                            onChange={handleLoanDataChange}
                            required
                          >
                            <option value="radio/TV">Radio/TV</option>
                            <option value="education">Education</option>
                            <option value="furniture/equipment">
                              Furniture/Equipment
                            </option>
                            <option value="car">Car</option>
                            <option value="business">Business</option>
                            <option value="domestic appliances">
                              Domestic Appliances
                            </option>
                            <option value="repairs">Repairs</option>
                            <option value="vacation/others">
                              Vacation/Others
                            </option>
                          </select>
                        </div>
                      </div>

                      <div
                        className="app-form-group buttons"
                        style={{ justifyContent: "center", marginTop: "2rem" }}
                      >
<button
  type="submit"
  className="header__hero__wrapper--glow-button"
  style={{ width: '400px' }}
>
  Predict Eligibility
</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
{isModalOpen && <ResultModal result={predictionResult} onClose={closeModal} />}
    </>
  );
};

export default index;
