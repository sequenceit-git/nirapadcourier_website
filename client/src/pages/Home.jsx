import React from 'react';
import Hero from '../components/landing/Hero';
import Services from '../components/landing/Services';
import CoverageRates from '../components/landing/CoverageRates';
import ClientsGrid from '../components/landing/ClientsGrid';
import AboutWhy from '../components/landing/AboutWhy';
import ProcessSteps from '../components/landing/ProcessSteps';
import CTA from '../components/landing/CTA';

export default function Home() {
  return (
    <div className="bg-brand-paper">
      <Hero />
      <Services />
      <CoverageRates />
      <ClientsGrid />
      <AboutWhy />
      <ProcessSteps />
      <CTA />
    </div>
  );
}

