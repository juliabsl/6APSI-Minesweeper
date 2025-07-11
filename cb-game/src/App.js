import React, { useState, useEffect } from 'react';
import './App.css';

const imageUrls = [
  'https://media.istockphoto.com/id/1076194804/vector/roast-turkey-or-chicken-dinner.jpg?s=612x612&w=0&k=20&c=AtOeJaKRxGmfW2GEdxWQMG-KEGX_Ar660VERWfXjc0w=', // Chicken
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb9XlbkJ-HoaBALP5iP2_it2ib5TuCjzALAQ&s' // Bummer
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

  //Track current player (1 or 2)
  const [currentPlayer, setCurrentPlayer] = useState(1);

  //Player image assignment
  const [playerChoices] = useState({
    1: imageUrls[0], // Chicken
    2: imageUrls[1], // Bummer
  });

  //Game over state
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const imgs = [...Array(18).fill(imageUrls[0]), ...Array(18).fill(imageUrls[1])];
    setAssignedImages(shuffle(imgs));
  }, []);

  // Handle game logic based on player turn
  const handleClick = (index) => {
    if (revealed[index] || gameOver) return;

    const imageAtIndex = assignedImages[index];
    const playerImage = playerChoices[currentPlayer];

    if (imageAtIndex !== playerImage) {
      // Reveal wrong image then end game
      setRevealed((prev) => {
        const newRevealed = [...prev];
        newRevealed[index] = true;
        return newRevealed;
      });
      setGameOver(true);
      return;
    }

    // Correct image revealed
    setRevealed((prev) => {
      const newRevealed = [...prev];
      newRevealed[index] = true;
      return newRevealed;
    });

    // Switch turns
    setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
  };

  // Reset game
  const resetGame = () => {
    const imgs = [...Array(18).fill(imageUrls[0]), ...Array(18).fill(imageUrls[1])];
    setAssignedImages(shuffle(imgs));
    setRevealed(Array(36).fill(false));
    setCurrentPlayer(1);
    setGameOver(false);
  };

  if (assignedImages.length === 0) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h1>Winner Winner</h1>
      <h1>🍗 Chicken Dinner 🍗</h1>

      {/* Player turn or game over message */}
      <h2>
        {gameOver
          ? `Game Over! Player ${currentPlayer} clicked the wrong tile.`
          : `Player ${currentPlayer}'s Turn (${playerChoices[currentPlayer] === imageUrls[0] ? '🍗 Chicken' : '💀 Bummer'})`}
      </h2>

      {/*Restart button */}
      <button onClick={resetGame}>Restart</button>

      <div className="grid">
        {items.map((num, index) =>
          revealed[index] ? (
            <img
              key={index}
              src={assignedImages[index]}
              alt={assignedImages[index] === imageUrls[0] ? 'Chicken' : 'Bummer'}
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
