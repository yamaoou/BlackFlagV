import { useEffect, useState } from "react";
import Header from "../components/Header";

const INITIAL_PROFILE = {
  username: "Yamaoou",
  handle: "@yamaou",
  bio: "Jogo jogos",
  location: "Brasil",
  avatar: "",
  background: "",
};

export default function Profile() {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [reviews, setReviews] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 

  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");
    const savedReviews = localStorage.getItem("reviews");

    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedReviews) setReviews(JSON.parse(savedReviews));
    
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("profile", JSON.stringify(profile));
      window.dispatchEvent(new Event("storage"));
    }
  }, [profile, loaded]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  function toBase64(file, callback) {
    const reader = new FileReader();
    reader.onload = () => callback(reader.result);
    reader.readAsDataURL(file);
  }

  function changeAvatar(e) {
    const file = e.target.files[0];
    if (!file) return;
    toBase64(file, (img) => setProfile(prev => ({ ...prev, avatar: img })));
  }

  function changeBg(e) {
    const file = e.target.files[0];
    if (!file) return;
    toBase64(file, (img) => setProfile(prev => ({ ...prev, background: img })));
  }

  function removeReview(index) {
    const updated = reviews.filter((_, i) => i !== index);
    setReviews(updated);
    localStorage.setItem("reviews", JSON.stringify(updated));
  }

  return (
    <>
      <Header />

      <div
        className="page"
        style={{
          backgroundImage: profile.background
            ? `url(${profile.background})`
            : "linear-gradient(to bottom, #4b0000, #120000)",
        }}
      >
        <div className="profile-banner">
          <div className="banner-overlay">
            
            
            <div className="avatar-section">
              {profile.avatar ? (
                <img src={profile.avatar} className="avatar" alt="Avatar" />
              ) : (
                <div className="avatar"></div>
              )}

              <label className="upload-btn small">
                📷
                <input type="file" accept="image/*" onChange={changeAvatar} hidden />
              </label>
            </div>

            
            <div className="info">
              {isEditing ? (
                <div className="edit-form">
                  <input 
                    type="text" 
                    name="username" 
                    value={profile.username} 
                    onChange={handleInputChange} 
                    placeholder="Nome de usuário"
                  />
                  <input 
                    type="text" 
                    name="handle" 
                    value={profile.handle} 
                    onChange={handleInputChange} 
                    placeholder="@seu-arroba"
                  />
                  <textarea 
                    name="bio" 
                    value={profile.bio} 
                    onChange={handleInputChange} 
                    placeholder="Sua bio..."
                  />
                  <input 
                    type="text" 
                    name="location" 
                    value={profile.location} 
                    onChange={handleInputChange} 
                    placeholder="Onde você mora?"
                  />
                </div>
              ) : (
                <>
                  <h1>{profile.username}</h1>
                  <h3>{profile.handle}</h3>
                  <p>{profile.bio}</p>
                  <span>📍 {profile.location}</span>
                </>
              )}
            </div>

            
            <div className="profile-actions">
              <button 
                className="edit-toggle-btn" 
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Salvar Perfil" : " Editar Perfil"}
              </button>

              <label className="upload-btn">
                 Trocar Fundo
                <input type="file" accept="image/*" onChange={changeBg} hidden />
              </label>
            </div>
          </div>
        </div>

        <h2 className="section-title">Avaliações</h2>

        <div className="grid">
          {reviews.length === 0 && <p className="empty">Nenhuma avaliação ainda.</p>}
          {reviews.map((item, index) => (
            <div key={index} className="card">
              <img src={item.image} alt={item.game} className="game-image" />
              <div className="overlay">
                <button onClick={() => removeReview(index)}>✕</button>
                <p>{item.game}</p>
                <span className="stars">{"★".repeat(item.rating)}</span>
                <small>{item.review}</small>
              </div>
            </div>
          ))}
        </div>

        <style>{css}</style>
      </div>
    </>
  );
}

const css = `
.page {
  min-height: 100vh;
  color: white;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 100px 30px 40px;
  font-family: 'Segoe UI', sans-serif;
}

.profile-banner {
  width: 100%;
  border-radius: 25px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(15px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.banner-overlay {
  display: flex;
  align-items: center;
  padding: 40px;
  gap: 30px;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  flex-wrap: wrap;
}


.edit-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
}

.edit-form input, .edit-form textarea {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  padding: 8px 12px;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  outline: none;
}

.edit-form input:focus { border-color: #8b0000; }

.info { flex: 1; }
.info h1 { font-size: 2.8rem; margin: 0; }
.info h3 { color: #ccc; margin-bottom: 10px; }

.profile-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.edit-toggle-btn {
  background: white;
  color: black;
  border: none;
  padding: 12px 20px;
  border-radius: 50px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.edit-toggle-btn:hover { background: #eee; transform: scale(1.05); }

.upload-btn {
  background: #8b0000;
  padding: 10px 18px;
  border-radius: 50px;
  cursor: pointer;
  text-align: center;
  font-size: 0.9rem;
  font-weight: bold;
}

.upload-btn.small {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-top: -20px;
  border: 3px solid #1a1a1a;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
}

.section-title { margin-top: 40px; font-size: 2rem; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; margin-top: 20px; }
.card { position: relative; aspect-ratio: 2/3; border-radius: 15px; overflow: hidden; background: #111; }
.game-image { width: 100%; height: 100%; object-fit: cover; }
.overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.8); display: flex; flex-direction: column; justify-content: flex-end; padding: 15px; opacity: 0; transition: 0.3s; }
.card:hover .overlay { opacity: 1; }
.overlay button { position: absolute; top: 10px; right: 10px; background: red; color: white; border: none; border-radius: 5px; cursor: pointer; }
`;
