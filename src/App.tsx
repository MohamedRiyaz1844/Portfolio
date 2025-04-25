import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Learning from './components/Learning';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Hero />
        <About />
        <Learning />
      </main>
      <Footer />
    </>
  );
};

export default App;
