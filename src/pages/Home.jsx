import "../App.css";

import { useState } from "react";

import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

const games = [
  {
    title: "Crimson Desert",
    image:
      "https://store-images.s-microsoft.com/image/apps.45738.13616283370123336.55bc585b-1fc2-4652-8965-61111d6975e0.5236f2e9-a0f4-4fc1-8aba-dbf96b812b95",
    rating: 5,
  },
  {
    title: "Marvel's Spider-Man 2",
    image:
      "https://upload.wikimedia.org/wikipedia/pt/6/64/Spider-Man_2_2023_capa.jpg",
    rating: 5,
  },
  {
    title: "Hollow Knight: Silksong",
    image:
      "https://upload.wikimedia.org/wikipedia/pt/8/86/Hollow_Knight_Silksong_cover.jpeg",
    rating: 5,
  },
  {
    title: "Red Dead Redemption 2",
    image:
      "https://www.quadrorama.com.br/wp-content/uploads/2022/05/read-dead-redemption-2-ff572348.png",
    rating: 5,
  },
];

export default function Home() {
  const [ratings, setRatings] = useState(
    games.map((game) => game.rating)
  );

  return (
    <div className="app">
      <Header />

      {/* HERO */}
      <section className="hero">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop={true}
          className="hero-swiper"
        >
          <SwiperSlide>
            <div className="slide">
              <img
                src="https://i.ytimg.com/vi/xk0mxglFWDk/maxresdefault.jpg"
                alt="Masterchief"
              />

              <div className="overlay">
                <h2>Halo Infinite</h2>

                <p>
                  Halo Infinite anuncia modo battle royale.
                </p>

                <Link
                  to="/games"
                  className="hero-button"
                >
                  Explorar Games
                </Link>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide">
              <img
                src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030300/26950369fe4b03c2268620eb9815c8a246aa0b06/ss_26950369fe4b03c2268620eb9815c8a246aa0b06.1920x1080.jpg"
                alt="Hollow Knight"
              />

              <div className="overlay">
                <h2>
                  Hollow Knight: Silksong
                </h2>

                <p>
                  O indie mais aguardado da geração.
                </p>

                <Link
                  to="/games"
                  className="hero-button"
                >
                  Ver Catálogo
                </Link>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide">
              <img
                src="https://s1.pearlcdn.com/cd/brand/metatag/2025/09/25/78b56ee739920250925065827388.jpg"
                alt=""
              />

              <div className="overlay">
                <h2>Crimson Desert</h2>

                <p>
                  Crimson desert é mais um rpg genérico? 
                  Entenda o caso.
                </p>

                <Link
                  to="/games"
                  className="hero-button"
                >
                  Ver Games
                </Link>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide">
              <img
                src="https://xboxwire.thesourcemediaassets.com/sites/8/2024/12/Ciri-hero-27cea1af21d7154e58d6-1900x1080-1-4a700a3c484912e7bb2c.jpg"
                alt=""
              />

              <div className="overlay">
                <h2>The Witcher IV</h2>

                <p>
                  A CD PROJEKT RED busca redenção após fracasso
                </p>

                <Link
                  to="/games"
                  className="hero-button"
                >
                  Explorar
                </Link>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide">
              <img
                src="https://i0.wp.com/brignews.com/wp-content/uploads/2022/12/A4818E56-095B-45BB-9F3D-99E2D0D2F662.jpeg?fit=1920%2C1080&ssl=1"
                alt=""
              />

              <div className="overlay">
                <h2>
                   Elden ring
                </h2>

                <p>
                    Rumores dizem que a From software está trabalhando em um jogo totalmente novo.
                </p>

                <Link
                  to="/games"
                  className="hero-button"
                >
                  Ver Notícias
                </Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* TITLE */}
      <section className="title-section">
        <h2>Jogos mais bem avaliados</h2>
      </section>

      {/* CARDS */}
      <section className="games-row">
        {games.map((game, index) => (
          <div
            className="game-card"
            key={index}
          >
            <img
              src={game.image}
              alt={game.title}
            />

            <h3>{game.title}</h3>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <Stack spacing={1}>
                <Rating
                  name={`rating-${index}`}
                  value={ratings[index]}
                  precision={0.5}
                  size="large"
                  onChange={(
                    event,
                    newValue
                  ) => {
                    const updatedRatings = [
                      ...ratings,
                    ];

                    updatedRatings[index] =
                      newValue;

                    setRatings(
                      updatedRatings
                    );

                    localStorage.setItem(
                      "ratings",
                      JSON.stringify(
                        updatedRatings
                      )
                    );
                  }}
                />
              </Stack>
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
