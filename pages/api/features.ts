import type { NextApiRequest, NextApiResponse } from "next";

interface Ireply {
  id: number;
  img: string;
  title: string;
  desc: string;
}

const result: Ireply[] = [
  {
    id: 0,
    img: "svg/okf-client-centric-development.svg",
    title: "Client Centric Development",
    desc: "We craft the client's needs on web, mobile, and blockchain to tailor the solutions and enhance growth of the businesses.",
  },
  {
    id: 1,
    img: "svg/okf-agile.svg",
    title: "Agile Development",
    desc: "We follow the Agile Development process that helps us to deliver the project with utmost quality and solid product for reliable and scalable business.",
  },
  {
    id: 2,
    img: "svg/okf-dedicated-development-team.svg",
    title: "Dedicated Development Team",
    desc: "Our skilled team leverage projects to provide best results. The team dedicates their every effort and does not look back until it's accomplished.",
  },
  {
    id: 3,
    img: "svg/okf-excellent-support.svg",
    title: "Excellent Support",
    desc: "We are always there to assist our clients in every possible way to meet client's expectations and end needs.",
  },
  {
    id: 4,
    img: "svg/iot.svg",
    title: "Integration with IoT Devices",
    desc: "Empower users to control IoT devices, monitor data, and automate tasks seamlessly. Connect, interact, and simplify with our platform for smart device management.",
  },
  {
    id: 5,
    img: "svg/okf-data-security.svg",
    title: "Data Protection",
    desc: "Our company ensures the utmost safety of all your private data. We deliver best-rated products to maintain confidentiality.",
  },
  {
    id: 6,
    img: "svg/okf-qa.svg",
    title: "Quality Deliverance",
    desc: "We believe in delivering quality products to our clients by assuring all their project specifications at the best industry competitive price.",
  },
  {
    id: 7,
    img: "svg/okf-growth.svg",
    title: "Enhancement",
    desc: "During Discovery, Designing, and Development phases, our technical team is always there to provide suggestions and edits to improvise their product in the best possible manner.",
  },
  {
    id: 8,
    img: "svg/ui.svg",
    title: "Personalized User Experience",
    desc: "Deliver a personalized user experience tailored to each individual. Leverage customer data and preferences to provide targeted content, recommendations, and a seamless journey.",
  },
  {
    id: 9,
    img: "svg/update.svg",
    title: "Continuous Updates and Support",
    desc: "We provide regular updates, ongoing support, bug fixes, feature enhancements, and responsive assistance.",
  },
  {
    id: 10,
    img: "svg/performance.svg",
    title: "Performance Optimization",
    desc: "Optimize the performance of your website or application for faster loading times, improved responsiveness, and a smooth user experience. Ensure high performance even under heavy traffic.",
  },
  {
    id: 11,
    img: "svg/cross-platform.svg",
    title: "Cross-platform Compatibility",
    desc: "Ensuring cross-platform compatibility and consistent user experiences across devices and operating systems, reaching a wider audience.",
  },

];

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    data: result,
  });
}
