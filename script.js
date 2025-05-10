const container = document.getElementById("container");
const resetButton = document.getElementById("resetButton");

function getRandomRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return { r, g, b };
}

function rgbToString({ r, g, b }) {
  return `rgb(${r}, ${g}, ${b})`;
}

function createGrid(size) {
  container.innerHTML = "";
  const squareSize = 960 / size;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("grid-square");
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
    square.dataset.darken = "0"; // start at 0% dark

    square.addEventListener("mouseenter", () => {
      let darkenLevel = parseInt(square.dataset.darken, 10);
      
      // First interaction? Add random background color.
      if (darkenLevel === 0) {
        const rgb = getRandomRGB();
        square.dataset.rgb = JSON.stringify(rgb);
        square.style.backgroundColor = rgbToString(rgb);
      }

      // Apply darkening
      const baseColor = JSON.parse(square.dataset.rgb);
      const factor = (10 - darkenLevel) / 10;
      const darkened = {
        r: Math.floor(baseColor.r * factor),
        g: Math.floor(baseColor.g * factor),
        b: Math.floor(baseColor.b * factor)
      };
      square.style.backgroundColor = rgbToString(darkened);

      if (darkenLevel < 10) {
        square.dataset.darken = (darkenLevel + 1).toString();
      }
    });

    container.appendChild(square);
  }
}

resetButton.addEventListener("click", () => {
  let newSize = parseInt(prompt("Enter new grid size (max 100):"));
  if (newSize && newSize > 0 && newSize <= 100) {
    createGrid(newSize);
  } else {
    alert("Please enter a number between 1 and 100.");
  }
});

createGrid(16); // Initial load
