// mark as client component
"use client";

import { useEffect, useRef, useState } from "react";
import HomeComponent from "./views/home";
import AIFeatures from "./views/home/components/AIFeatures";
import CallToAction from "./views/home/components/CallToAction";
import FAQs from "./views/home/components/FAQs ";
import Footer from "./views/home/components/Footer";
import HowItWorks from "./views/home/components/HowItWorks";

import SecurityPrivacy from "./views/home/components/SecurityPrivacy ";
import Testimonials from "./views/home/components/Testimonials";

const ScrollComponent = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const domRef = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting));
    });
    observer.observe(domRef.current);
    return () => {
      if (domRef.current instanceof Element) {
        observer.unobserve(domRef.current);
      }
    };
  }, []);
  

  return (
    <div
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
      ref={domRef}
    >
      {children}
    </div>
  );
};

export default function Home() {
  return (
    <div>
      <ScrollComponent><HomeComponent/></ScrollComponent>
      <ScrollComponent><AIFeatures/></ScrollComponent>
      <ScrollComponent><HowItWorks/></ScrollComponent>
      <ScrollComponent><Testimonials/></ScrollComponent>
      <ScrollComponent><SecurityPrivacy/></ScrollComponent>
      <ScrollComponent><CallToAction/></ScrollComponent>
      <ScrollComponent><FAQs/></ScrollComponent>
      <ScrollComponent><Footer/></ScrollComponent>
    </div>
  );
}