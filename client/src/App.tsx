import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import ProductsPage from "@/pages/products";
import AITechnologyPage from "@/pages/ai-technology";
import AnalyticsPage from "@/pages/analytics";
import OurStoryPage from "@/pages/our-story";
import RoboticsPage from "@/pages/robotics";
import NotFound from "@/pages/not-found";
import GetIdeasPage from "@/pages/get-ideas";
import PersonalisedMerchPage from "@/pages/personalised-merch";
import ContactUsPage from "@/pages/contact-us";
import ScrollToTop from "@/components/scroll-to-top";
import PageTransition from "@/components/page-transition";
import { AnimatePresence } from "framer-motion";

function Router() {
  const [location] = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Switch>
        <Route path="/">
          <PageTransition key={location} type="scale-blur">
            <Home />
          </PageTransition>
        </Route>
        <Route path="/products">
          <PageTransition key={location} type="scale-blur">
            <ProductsPage />
          </PageTransition>
        </Route>
        <Route path="/analytics">
          <PageTransition key={location} type="scale-blur">
            <AnalyticsPage />
          </PageTransition>
        </Route>
        <Route path="/ai-technology">
          <PageTransition key={location} type="scale-blur">
            <AITechnologyPage />
          </PageTransition>
        </Route>
        <Route path="/our-story">
          <PageTransition key={location} type="scale-blur">
            <OurStoryPage />
          </PageTransition>
        </Route>
        <Route path="/robotics">
          <PageTransition key={location} type="scale-blur">
            <RoboticsPage />
          </PageTransition>
        </Route>
        <Route path="/personalised-merch">
          <PageTransition key={location} type="scale-blur">
            <PersonalisedMerchPage />
          </PageTransition>
        </Route>
        <Route path="/get-ideas">
          <PageTransition key={location} type="scale-blur">
            <GetIdeasPage />
          </PageTransition>
        </Route>
        <Route path="/contact-us">
          <PageTransition key={location} type="scale-blur">
            <ContactUsPage />
          </PageTransition>
        </Route>
        <Route>
          <PageTransition key={location} type="scale-blur">
            <NotFound />
          </PageTransition>
        </Route>
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <ScrollToTop />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
