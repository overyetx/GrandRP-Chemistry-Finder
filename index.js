var recipes = {
    "Alcohol": ["Energy", "Water"],
    "Ashes": ["Dust", "Fire"],
    "Ammonites": ["Sand", "Cephalopods"],
    "Ants": ["Land", "Insects"],
    "Seaweed": ["Life", "Water"],
    "Bacterium": ["Life", "Swamp"],
    "Beast": ["Land", "Lizard"],
    "Concrete": ["Cement", "Water"],
    "Dirt": ["Water", "Dust"],
    "Steam": ["Water", "Fire"],
    "Pressure": ["Land", "Land"],
    "Dinosaur": ["Egg", "Land"],
    "Dragon": ["Dinosaur", "Fire"],
    "The Sky": ["Air", "Cloud"],
    "Sea": ["Lake", "Salt"],
    "Thunder": ["Storm", "Sound"],
    "Energy": ["Fire", "Air"],
    "Egg": ["Life", "Stone"],
    "Lizard": ["Swamp", "Egg"],
    "Electricity": ["Metal", "Energy"],
    "Ice": ["Water", "Cold"],
    "Frog": ["Lizard", "Swamp"],
    "Fish": ["Bacterium", "Plankton"],
    "Geyser": ["Land", "Steam"],
    "Glass": ["Sand", "Fire"],
    "Sound": ["Metal", "Wind"],
    "Shroom": ["Air", "Bacterium"],
    "Arthropods": ["Plankton", "Sand"],
    "Chicken": ["Life", "Egg"],
    "Insects": ["Beetle", "Air"],
    "Iodine": ["Seaweed", "Fire"],
    "Cold": ["Cloud", "Wind"],
    "Cephalopods": ["Molluscs", "Water"],
    "Caviar": ["Fish", "Fish"],
    "Beetle": ["Land", "Worm"],
    "Kangaroo": ["Beast", "Frog"],
    "Camel": ["Beast", "Desert"],
    "Limestone": ["Stone", "Shell"],
    "Lava": ["Fire", "Land"],
    "Clay": ["Swamp", "Sand"],
    "Life": ["Swamp", "Energy"],
    "Dragonfly": ["Insects", "Water"],
    "Metal": ["Stone", "Fire"],
    "Magnet": ["Electricity", "Metal"],
    "Molluscs": ["Swamp", "Plankton"],
    "Shell": ["Plankton", "Stone"],
    "Mussels": ["Sand", "Molluscs"],
    "Mite": ["Life", "Dust"],
    "Octopus": ["Water", "Cephalopods"],
    "Ocean": ["Sea", "Sea"],
    "Plankton": ["Bacterium", "Water"],
    "Pearls": ["Sand", "Shell"],
    "Phoenix": ["Bird", "Fire"],
    "Jellyfish": ["Water", "Plankton"],
    "Dust": ["Air", "Land"],
    "Swamp": ["Land", "Water"],
    "Storm": ["Energy", "Air"],
    "Lake": ["Water", "Water"],
    "Stone": ["Lava", "Water"],
    "Sand": ["Stone", "Air"],
    "Sandglass": ["Sand", "Glass"],
    "Turtle": ["Egg", "Sand"],
    "Sulphur": ["Bacterium", "Swamp"],
    "Acid": ["Fire", "Sulphur"],
    "Silicon": ["Pressure", "Sand"],
    "Salt": ["Acid", "Metal"],
    "Salt Water": ["Water", "Salt"],
    "Starfish": ["Plankton", "Sand"],
    "Spider": ["Arthropods", "Stone"],
    "Butterfly": ["Air", "Worm"],
    "Scorpion": ["Beetle", "Sand"],
    "Snake": ["Swamp", "Worm"],
    "Slugs": ["Mussels", "Swamp"],
    "Tequila": ["Alcohol", "Worm"],
    "Volcano": ["Lava", "Pressure"],
    "Bird": ["Egg", "Air"],
    "Desert": ["Sand", "Sand"],
    "Wind": ["Air", "Air"],
    "Hydrogen": ["Electricity", "Water"],
    "Cloud": ["Air", "Steam"],
    "Worm": ["Bacterium", "Land"],
    "Whale": ["Beast", "Water"],
    "Vodka": ["Alcohol", "Water"],
    "Cells": ["Bacterium", "Bacterium"],
    "Brick": ["Clay", "Fire"],
    "Time": ["Sandglass", "Life"],
    "Cement": ["Clay", "Limestone"]
};

const basicElements = ["Fire", "Water", "Air", "Land"];

function removeDuplicates(array) {
  const unique = [];
  const seen = new Set();

  for (const item of array) {
    if (!seen.has(item)) {
      unique.push(item);
      seen.add(item);
    }
  }

  return unique;
}

function capitalizeEveryWord(sentence) {
  return sentence
    .split(' ')                  // Split the sentence into words
    .map(word =>                 // Transform each word
      word.charAt(0).toUpperCase() + word.slice(1)  // Capitalize the first letter and concatenate the rest
    )
    .join(' ');                  // Join the words back into a sentence
}

function findStep(element, steps = []) {
    if (basicElements.includes(element)) {
        return;
    }
    if (recipes[element]) {
        for (const component of recipes[element]) {
            if (!basicElements.includes(component)) {
                findStep(component, steps);
            }
        }
        steps.push(`${recipes[element].join(' + ')} = ${element}`);
    }
}

function findRecipe() {
    const target = capitalizeEveryWord(document.getElementById('element').value.trim());
    const resultDiv = document.getElementById('result');
    
    if (!recipes[target]) {
        resultDiv.innerHTML = `Element <strong>${target}</strong> not found.`;
        return;
    }

    let steps = [];
    
    findStep(target, steps);
	steps = removeDuplicates(steps);

    if (steps.length === 0) {
        resultDiv.innerHTML = `<strong>${target}</strong> is already a basic element or cannot be built.`;
    } else {
        resultDiv.innerHTML = `<strong>${target}</strong> can be built using the following steps:<br>${steps.map((step, index) => `<strong>${index + 1}:</strong> ${step}`).join('<br>')}`;
    }
}

function writeAll() {
    const target = document.getElementById('allrecipes');
    let text = "";
	for (const [el, recipe] of Object.entries(recipes)) {
		text += `<li><b>${el} = </b> ${recipe[0]} + ${recipe[1]}</li>`
	}
	target.innerHTML = text;
}

writeAll();