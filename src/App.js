import { BrowserRouter } from "react-router-dom";


// components
import Header from "components/Header";
import Footer from "components/Footer";

// Routes
import Routes from "config/Routes";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
