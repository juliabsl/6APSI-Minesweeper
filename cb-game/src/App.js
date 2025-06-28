import React, { useState, useEffect } from 'react';
import './App.css';

const imageUrls = [
  'https://images.squarespace-cdn.com/content/v1/6109e64cfe878a0cad199515/cc385b01-b05f-4bb4-9752-92924a41333d/french-baguette.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbjV9SruwxXQZhOi-sK0ZO3z_Refn8RQg8d7o6FsEnq2ZPvRIvN61wb-83Jwd4oUnPXBU&usqp=CAU'
];

function getRandomImage() {
  const index = Math.floor(Math.random() * imageUrls.length);
  return imageUrls[index];
}

function shuffle(array) {
  const arr = [...array];
  for(let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// function TryAgain(props) {
//   return ();
// }

function App() {
  const [items, setItems] = useState(Array.from({ length: 36 }, (_, i) => i + 1));
  const [assignedImages, setAssignedImages] = useState([]);
  const [revealed, setRevealed] = useState(Array(36).fill(false));

  useEffect(() => {
    const imgs = [...Array(18).fill(imageUrls[0]), ...Array(18).fill(imageUrls[1])];
    setAssignedImages(shuffle(imgs));
  }, []);

  const handleClick = (index) => {
    if (revealed[index]) return;
    setRevealed(prev => {
      const newRevealed = [...prev];
      newRevealed[index] = true;
      return newRevealed;
    });
  };

  if (assignedImages.length === 0) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>Get that 🥖 Baguette 🥖</h1>
      <div className="grid">
        {items.map((num, index) => (
          revealed[index] ? (
            <img
              key={index}
              src={assignedImages[index]}
              alt="Revealed"
              className="square"
              onClick={() => handleClick(index)}
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
        ))}
      </div>
    </div>
  );
}

export default App;
