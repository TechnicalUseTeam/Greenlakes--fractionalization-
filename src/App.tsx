import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Contact } from './pages/Contact';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { EstatePage } from './pages/EstatePage';
import { Explore } from './pages/Explore';
import { Home } from './pages/Home';
import { HowItWorks } from './pages/HowItWorks';
import { NotFound } from './pages/NotFound';
import { Ownership } from './pages/Ownership';
import { SignIn } from './pages/SignIn';
import { Tokenisation } from './pages/Tokenisation';
import { Why } from './pages/Why';

const titles: Record<string, string> = {
  '/': 'Green Lakes · Co-Own Your Dream Second Home',
  '/explore': 'Explore land · Green Lakes',
  '/how-it-works': 'How it works · Green Lakes',
  '/tokenisation': 'Tokenisation · Green Lakes',
  '/why-green-lakes': 'Why Green Lakes',
  '/ownership': 'Ownership & documents · Green Lakes',
  '/contact': 'Contact · Green Lakes',
  '/sign-in': 'Log in · Green Lakes',
};

function RouteEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    document.title = titles[pathname] ?? 'Green Lakes';
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <RouteEffects />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/estates/:slug" element={<EstatePage />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/tokenisation" element={<Tokenisation />} />
          <Route path="/why-green-lakes" element={<Why />} />
          <Route path="/ownership" element={<Ownership />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
