import { useState } from "react";
import Header from "../components/Header";

export default function Games() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  
  const [search, setSearch] = useState("");

  const games = [
    { id: 1, name: "Elden Ring", image: "https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg" },
    { id: 2, name: "God of War Ragnarök", image: "https://upload.wikimedia.org/wikipedia/en/e/ee/God_of_War_Ragnar%C3%B6k_cover.jpg" },
    { id: 3, name: "Hollow Knight: Silksong", image: "https://upload.wikimedia.org/wikipedia/pt/8/86/Hollow_Knight_Silksong_cover.jpeg" },
    { id: 4, name: "Red Dead Redemption 2", image: "https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg" },
    { id: 5, name: "Spider-Man 2", image: "https://upload.wikimedia.org/wikipedia/pt/6/64/Spider-Man_2_2023_capa.jpg" },
    { id: 6, name: "Cyberpunk 2077", image: "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg" },
    { id: 7, name: "The Witcher 3", image: "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg" },
    { id: 8, name: "Resident Evil 4", image: "https://i.etsystatic.com/6824854/r/il/e0f2b4/5931341667/il_1080xN.5931341667_k7p5.jpg" },
    { id: 9, name: "Sekiro", image: "https://upload.wikimedia.org/wikipedia/en/6/6e/Sekiro_art.jpg" },
    { id: 10, name: "Bloodborne", image: "https://upload.wikimedia.org/wikipedia/en/6/68/Bloodborne_Cover_Wallpaper.jpg" },
    { id: 11, name: "Crimson Desert", image: "https://store-images.s-microsoft.com/image/apps.45738.13616283370123336.55bc585b-1fc2-4652-8965-61111d6975e0.5236f2e9-a0f4-4fc1-8aba-dbf96b812b95" },
    { id: 12, name: "GTA V", image: "https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png" },
    { id: 13, name: "Persona 3 Reload", image: "https://myhotposters.com/cdn/shop/files/mL7098_1024x1024.jpg?v=1748531278" },
    { id: 14, name: "Dark Souls III", image: "https://upload.wikimedia.org/wikipedia/en/b/bb/Dark_souls_3_cover_art.jpg" },
    { id: 15, name: "Hades", image: "https://upload.wikimedia.org/wikipedia/en/c/cc/Hades_cover_art.jpg" },
  ];

 
  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(search.toLowerCase())
  );

  function saveReview() {
    if (rating === 0) {
      alert("Escolha uma nota.");
      return;
    }

    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    const newReview = {
      id: Date.now(),
      game: selectedGame.name,
      image: selectedGame.image,
      rating,
      review,
    };

    reviews.push(newReview);
    localStorage.setItem("reviews", JSON.stringify(reviews));

    alert("Avaliação salva!");
    setSelectedGame(null);
    setRating(0);
    setReview("");
  }

  return (
    <>
    
      <Header onSearch={setSearch} />

      <div
        style={{
          background: "linear-gradient(to bottom, #700000, #120000)",
          minHeight: "100vh",
          padding: "110px 40px 40px",
          color: "white",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "4rem",
            marginBottom: "50px",
            fontFamily: "serif",
          }}
        >
          Games
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "30px",
            maxWidth: "1500px",
            margin: "0 auto",
          }}
        >
          {/* Mapeamos filteredGames em vez de games */}
          {filteredGames.map((game) => (
            <div
              key={game.id}
              onClick={() => setSelectedGame(game)}
              style={{ cursor: "pointer" }}
            >
              <div
                style={{
                  background: "rgba(0,0,0,0.35)",
                  borderRadius: "18px",
                  overflow: "hidden",
                  transition: "0.25s",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.45)",
                }}
              >
                <img
                  src={game.image}
                  alt={game.name}
                  style={{
                    width: "100%",
                    height: "320px",
                    objectFit: "cover",
                  }}
                />
                <div style={{ padding: "16px" }}>
                  <h2
                    style={{
                      fontSize: "1.1rem",
                      textAlign: "center",
                      margin: 0,
                    }}
                  >
                    {game.name}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL */}
        {selectedGame && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.75)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            <div
              style={{
                background: "linear-gradient(to bottom, #5a0000, #240000)",
                width: "420px",
                padding: "30px",
                borderRadius: "20px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
            >
              <img
                src={selectedGame.image}
                alt={selectedGame.name}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  borderRadius: "14px",
                  marginBottom: "20px",
                }}
              />
              <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
                {selectedGame.name}
              </h1>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  marginBottom: "25px",
                }}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    style={{
                      fontSize: "2.4rem",
                      cursor: "pointer",
                      transition: "0.2s",
                      color: star <= rating ? "gold" : "#444",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>

              <textarea
                placeholder="Escreva sua review..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                style={{
                  width: "100%",
                  height: "120px",
                  border: "none",
                  borderRadius: "12px",
                  resize: "none",
                  padding: "12px",
                  fontSize: "1rem",
                  background: "#1c1c1c",
                  color: "white",
                  marginBottom: "20px",
                  boxSizing: "border-box",
                }}
              />

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={saveReview}
                  style={{
                    flex: 1,
                    padding: "14px",
                    border: "none",
                    borderRadius: "12px",
                    background: "gold",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                >
                  Salvar
                </button>
                <button
                  onClick={() => setSelectedGame(null)}
                  style={{
                    flex: 1,
                    padding: "14px",
                    border: "none",
                    borderRadius: "12px",
                    background: "#222",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
