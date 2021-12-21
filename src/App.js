/* eslint react/style-prop-object: 0 */

import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

const layers = ["wall",
"stickies",
"bakery",
"cake",
"candle",
"bakeryfront",
"shelf",
"booklowershelf",
"booklowershelf2",
"shelfsecondfloor",
"bunny_basket",
"bunny_copy",
"bunny",
"auro",
"mukulbody",
"toptable",
"restaurant_menu",
"aurophone",
"netflixlappy",
"cards",
"thickshake_1",
"thickshake_1_copy",
"book",
"book_1",
"book2",
"shelftop",
"thickshake",
"aurohands",
"pictionary",
"avalon",
"Coup",
"mukulhands",
"dialog"]

const mappings = {
  "cafe": ["toptable", "wall", "bakeryfront", "bakery", "shelf", "shelfsecondfloor", "shelftop"],
  "mukul": ["mukulbody", "mukulhands"],
  "auro": ["aurohands", "auro", "aurophone"],
  "dialog": ["dialog"],
  "thickshake": ["thickshake", "thickshake_1", "thickshake_1_copy"],
  "uno": ["cards"],
  "laptop": ["netflixlappy"],
  "books": ["book_1", "book2", "book", "booklowershelf", "booklowershelf2"], 
  "menu": ["restaurant_menu"],
  "cake": ["cake", "candle"],
  "stickies": ["stickies"],
  "bunnies": ["bunny", "bunny_copy", "bunny_basket"],
  "games": ["pictionary", "avalon", "Coup"],
}

function App() {
  const [visibility, setVisibility] = useState({})
  const [gameState, setGameState] = useState("greet")

  let dialog = ""
  if(gameState == "greet"){
    dialog = "Happy Birthday Shruti! \n Where are we celebrating it?"
  } else {
    dialog = "Great start! Now guess the rest of the objects in the scene"
  }

  useEffect(()=>{
    let obj = {}
    // hide all layers in layers
    for(let layer of layers){
      obj[layer] = "visibility"
      document.getElementById(layer).setAttribute("filter", "url(#blurMe)")
    }
    setVisibility(obj)
  }, [])
  let currentHint = 0;
  let text = ""

  for(let layer of layers){
    text += `#${layer} { display:${layer in visibility?visibility[layer]:"none"}; }`
  }

  const showId = (id) => {
    setVisibility(Object.assign({[id]: "visible"}, visibility))
    document.getElementById(id).setAttribute("filter", "")
  }

  const showLabel = (label) => {
    if(gameState == "greet") {
      if(label != "cafe"){
        alert("Wrong guess. Try again :(")
        return
      }
      setGameState("guess")
    }
    if(!(label in mappings)){
      alert("Wrong guess. Try again :(")
      return
    }
    for (let id of mappings[label]){
      showId(id)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    showLabel(document.getElementById("textbox").value.toLowerCase());
    document.getElementById("textbox").value = "";
  };
  return (
    <div>
      <p style={{display: "none"}}>{visibility.toString()}</p>
      <style>
      {text}
      </style>
      <blockquote>
        <p><em>{dialog}</em></p>
      </blockquote>
      <form onSubmit={onSubmit} >
        <input id="textbox" type="text" placeholder="Take a guess"/>
        <button type="submit"> Reveal! </button>
      </form>
    </div>
  );
}

export default App;
