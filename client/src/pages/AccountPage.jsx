import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userContext } from "../userContext";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNavigation from "../components/AccountNavigation";

const AccountPage = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(userContext);
  let { subpage } = useParams();
  const navigate = useNavigate();

  if (subpage === undefined) {
    subpage = "account";
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user) {
    navigate("/login");
  }

  if (ready && !user && !redirect) {
    navigate("/login");
  }

  if (redirect) {
    navigate(redirect);
  }

  return (
    <div>
      <AccountNavigation />
      {subpage === "account" && (
        <div className="text-center max-w-lg mx-auto">
          logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
};

export default AccountPage;
