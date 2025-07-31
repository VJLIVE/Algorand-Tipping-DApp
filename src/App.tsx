import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "./context/WalletContext";
import Home from "./pages/Home";
import FundraiserDetail from "./pages/FundraiserDetail";

function App() {
  return (
    <WalletProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fundraiser/:id" element={<FundraiserDetail />} />
        </Routes>
      </BrowserRouter>
    </WalletProvider>
  );
}

export default App;
