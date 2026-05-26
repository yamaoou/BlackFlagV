import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header({ onSearch }) {
  const [avatar, setAvatar] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2JsZZy81pCCUDfv4944Q_z95Zpa8tJb1siw&s"
  );

  useEffect(() => {
    function loadProfile() {
      const profile = JSON.parse(localStorage.getItem("profile"));
      if (profile?.avatar) {
        setAvatar(profile.avatar);
      }
    }

    loadProfile();
    window.addEventListener("storage", loadProfile);

    return () => {
      window.removeEventListener("storage", loadProfile);
    };
  }, []);

  return (
    <header className="header">
      <Link to="/" className="logo-area" style={{ textDecoration: "none", color: "white" }}>
        <h1>BlackFlag</h1>
      </Link>

      <div className="search">
        <input 
          type="text" 
          placeholder="Buscar jogos..." 
          onChange={(e) => onSearch && onSearch(e.target.value)}
        />
        <span>⌕</span>
      </div>

      <nav>
        <Link to="/games">Games</Link>
        <Link to="/profile">Perfil</Link>
      </nav>

      <Link to="/profile">
        <img className="profile" src={avatar} alt="Profile" />
      </Link>
    </header>
  );
}