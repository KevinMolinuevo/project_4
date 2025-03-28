import { useState } from "react";

const RandomDogCard = () => {
  const [dogData, setDogData] = useState(null);
  const [banList, setBanList] = useState([]);

  const fetchRandomDog = async () => {
    let tries = 0;

    while (tries < 10) {
      try {
        const res = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await res.json();

        const parts = data.message.split("/");
        const breed = parts[parts.indexOf("breeds") + 1];

        if (banList.includes(breed)) {
          tries++;
          continue;
        }

        setDogData({
          image: data.message,
          breed: breed,
          format: data.message.split(".").pop(),
        });
        return;
      } catch (err) {
        console.error("Failed to fetch dog data", err);
        return;
      }
    }

    alert("No more dog breeds to show. You banned too many!");
  };

  const handleBan = () => {
    if (!dogData) return;
    setBanList((prev) => [...prev, dogData.breed]);
    setDogData(null);
  };

  const handleUnban = (breedToRemove) => {
    setBanList((prev) => prev.filter((breed) => breed !== breedToRemove));
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
          <div style={{ marginTop: "1rem" }}>
            <button onClick={handleBan}>🚫 Ban This Breed</button>
          </div>
        </>
      )}

      {banList.length > 0 && (
        <>
          <h3>Banned Breeds</h3>
          <ul>
            {banList.map((breed, index) => (
              <li key={index}>
                {breed}{" "}
                <button onClick={() => handleUnban(breed)}>Unban</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default RandomDogCard;