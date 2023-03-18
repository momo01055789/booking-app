import "./App.css";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./userContext";
import Layout from "./Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage";
import PlacesPage from "./pages/PlacesPage";
import PlacePage from "./pages/PlacePage";
import PlaceForm from "./components/PlaceForm";
import IndexPage from "./pages/IndexPage";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3001";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlaceForm />} />
          <Route path="/account/places/:id" element={<PlaceForm />} />
          <Route path="/place/:id" element={<PlacePage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
