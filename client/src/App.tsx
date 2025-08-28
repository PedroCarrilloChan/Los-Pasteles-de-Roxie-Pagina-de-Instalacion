import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import PetRegistration from "@/pages/PetRegistration";
import Loading from "@/pages/Loading";
import ThankYou from "@/pages/ThankYou";
import IphoneInstall from "@/pages/IphoneInstall";
import AndroidInstall from "@/pages/AndroidInstall";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/pet-registration" component={PetRegistration} />
      <Route path="/loading" component={Loading} />
      <Route path="/android-install" component={AndroidInstall} />
      <Route path="/iphone-install" component={IphoneInstall} />
      <Route path="/thank-you" component={ThankYou} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;