import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "./pages/Landing.tsx";
import Onboarding from "./pages/Onboarding.tsx";
import Login from "./pages/Login.tsx";
import Index from "./pages/Index.tsx";
import GroupPreview from "./pages/GroupPreview.tsx";
import ChannelPreview from "./pages/ChannelPreview.tsx";
import UserPreview from "./pages/UserPreview.tsx";
import RelayDevelopers from "./pages/RelayDevelopers.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/messenger" element={<Index />} />
          <Route path="/g/:slug" element={<GroupPreview />} />
          <Route path="/c/:slug" element={<ChannelPreview />} />
          <Route path="/u/:username" element={<UserPreview />} />
          <Route path="/developers" element={<RelayDevelopers />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
