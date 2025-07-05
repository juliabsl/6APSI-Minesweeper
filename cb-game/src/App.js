import React, { useState, useEffect } from 'react';
import './App.css';

const imageUrls = [
  'https://images.squarespace-cdn.com/content/v1/6109e64cfe878a0cad199515/cc385b01-b05f-4bb4-9752-92924a41333d/french-baguette.jpg', // Baguette
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbjV9SruwxXQZhOi-sK0ZO3z_Refn8RQg8d7o6FsEnq2ZPvRIvN61wb-83Jwd4oUnPXBU&usqp=CAU' // Loaf
];

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function App() {
  const [items] = useState(Array.from({ length: 36 }, (_, i) => i + 1));
  const [assignedImages, setAssignedImages] = useState([]);
  const [revealed, setRevealed] = useState(Array(36).fill(false));
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [turn, setTurn] = useState('player1');

  const [scores, setScores] = useState({
    player1: { baguette: 0, loaf: 0 },
    player2: { baguette: 0, loaf: 0 }
  });

  useEffect(() => {
    const imgs = [...Array(18).fill(imageUrls[0]), ...Array(18).fill(imageUrls[1])];
    setAssignedImages(shuffle(imgs));
  }, []);

  const handleClick = (index) => {
    if (revealed[index]) return;

    const imageClicked = assignedImages[index];
    const isBaguette = imageClicked === imageUrls[0];

    setRevealed((prev) => {
      const newRevealed = [...prev];
      newRevealed[index] = true;
      return newRevealed;
    });

    setScores((prev) => ({
      ...prev,
      [turn]: {
        ...prev[turn],
        baguette: prev[turn].baguette + (isBaguette ? 1 : 0),
        loaf: prev[turn].loaf + (isBaguette ? 0 : 1)
      }
    }));

    setTurn((prev) => (prev === 'player1' ? 'player2' : 'player1'));
  };

  const handlePlayerSelect = (player) => {
    setCurrentPlayer(player);
  };

  if (!currentPlayer) {
    return (
      <div className="container">
        <h2>Choose Your Player</h2>
        <button onClick={() => handlePlayerSelect('player1')}>Player 1</button>
        <button onClick={() => handlePlayerSelect('player2')}>Player 2</button>
      </div>
    );
  }

  if (assignedImages.length === 0) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>Get that 🥖 Baguette 🥖</h1>
      <h2>Current Turn: {turn === 'player1' ? 'Player 1' : 'Player 2'}</h2>

      <div className="scoreboard-container">
        <div className="scoreboard">
          <div className={turn === 'player1' ? 'active' : ''}>
            <h3>Player 1</h3>
            <p>🥖 Baguettes: {scores.player1.baguette}</p>
            <p>🍞 Loaves: {scores.player1.loaf}</p>
          </div>
          <div className={turn === 'player2' ? 'active' : ''}>
            <h3>Player 2</h3>
            <p>🥖 Baguettes: {scores.player2.baguette}</p>
            <p>🍞 Loaves: {scores.player2.loaf}</p>
          </div>
        </div>
      </div>

      <div className="grid">
        {items.map((num, index) =>
          revealed[index] ? (
            <img
              key={index}
              src={assignedImages[index]}
              alt="Revealed"
              className="square"
            />
          ) : (
            <div
              key={index}
              className="square number"
              onClick={() => handleClick(index)}
            >
              {num}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
