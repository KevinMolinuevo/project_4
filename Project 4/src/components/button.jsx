import { useState } from "react";

const RandomDogCard = () => {
  const [dogData, setDogData] = useState(null);

  const fetchRandomDog = async () => {
    try {
      const res = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await res.json();

      const parts = data.message.split("/");
      const breed = parts[parts.indexOf("breeds") + 1];

      setDogData({
        image: data.message,
        breed: breed,
        format: data.message.split(".").pop(),
      });
    } catch (err) {
      console.error("Failed to fetch dog data", err);
    }
  };

  return (
    <>
      <h2>🐶 Random Dog Viewer</h2>
      <button onClick={fetchRandomDog}>Get Random Dog</button>

      {dogData && (
        <>
          <h3>Breed: {dogData.breed}</h3>
          <p>Image Format: {dogData.format}</p>
          <p>
            Source URL:{" "}
            <a href={dogData.image} target="_blank" rel="noopener noreferrer">
              Click here
            </a>
          </p>
          <img
            src={dogData.image}
            alt={dogData.breed}
            width="300"
            style={{ borderRadius: "10px", marginTop: "1rem" }}
          />
        </>
      )}
    </>
  );
};

export default RandomDogCard;
        