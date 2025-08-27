import "./App.css";
import { useState, useEffect } from "react";

function App() {
  // ✅ keep this a single string since we render one random word
  const [word, setWord] = useState("");              // <state> source of truth for the generated word
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(1);
  const [letter, setLetter] = useState("A");
  const [countLetter, setCountLetter] = useState("A");
  const [flip, setFlip] = useState(true);

  useEffect(() => {
    // 🔁 re-compute a random header letter whenever `value` changes
    const randomNumber = Math.floor(Math.random() * 26);
    const randomLetter = String.fromCharCode(65 + randomNumber); // 65 => 'A'
    setLetter(randomLetter);
  }, [value]);

  useEffect(() => {
    // 🔁 re-compute a random header letter whenever `count` changes
    const randomNumber = Math.floor(Math.random() * 26);
    const randomCountLetter = String.fromCharCode(65 + randomNumber);
    setCountLetter(randomCountLetter);
  }, [count]);

  // 🔨 pure function: build a 5-letter random word (uppercase to match color switch)
  const buildRandomWord = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";      // use uppercase to match switch cases
    let next = "";                                      // local var (NOT state) → no direct mutation
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      next += alphabet[randomIndex];
    }
    return next;                                        // return the completed word (pure)
  };

  // 🧠 event handler: generate + commit into state
  const generateWord = () => {
    const next = buildRandomWord(); // compute
    setWord(next);                  // commit to state → triggers re-render
  };

  // 🎨 maps letters-in-word → color token; guards + normalization included
  const colorCorrelate = (w) => {
    // 🚧 guard: if nothing passed (undefined/empty), return a neutral color
    if (!w || typeof w !== "string") return "black";

    // 🔤 normalize: work in uppercase to match the cases below
    const W = w.toUpperCase();

    const colors = ["red", "blue", "orange", "purple", "green", "yellow", "white"];

    // 🧰 switch(true) pattern → case blocks act as predicates (boolean guards)
    switch (true) {
      case W.includes("R"):
        return colors[0]; // red
      case W.includes("B"):
        return colors[1]; // blue
      case W.includes("O"):
        return colors[2]; // orange
      case W.includes("P"):
        return colors[3]; // purple
      case W.includes("G"):
        return colors[4]; // green
      case W.includes("Y"):
        return colors[5]; // yellow
      case W.includes("W"):
        return colors[6]; // white
      default:
        return "black";   // fallback token
    }
  };

  // 🖨️ safe log: pass the current word in state

  return (
    
    <div className="app"> {/* 🎯 Flex container to center the whole app */}
      <header className="header">
        <h1>Random Letter of the Header {countLetter}</h1>
      </header>

      {/* 🔢 Count controls row */}
      {/* 🔢 Row to display the count and the control buttons with two words */}
      <section className="row card">
        {/* 📦 The row is displayed as a flex container with two columns */}
        {/* The first column contains the count and the buttons */}
        {/* The second column contains the second word */}
        <div className="row-left">
          {/* 🧭 cluster buttons using flex with gaps */}
          <div className="btn-group">
            <button onClick={() => (flip ? setCount(count + value) : setCount(count - value))}>
              {flip ? "Increment" : "Decrement"}
            </button>
            <button onClick={() => (flip ? setCount(count - value) : setCount(count + value))}>
              {flip ? "Decrement" : "Increment"}
            </button>
          </div>
        </div>
        <div className="row-right">
          <h3 className="counter">{count}</h3>
        </div>
      </section>

      {/* 🎚️ Value controls row */}
      <section className="row card">
        <div className="row-left">
          <div className="btn-group">
            <button onClick={() => (flip ? setValue(value + 1) : setValue(value - 1))}>
              {flip ? "Increment Value" : "Decrement Value"}
            </button>
            <button onClick={() => (flip ? setValue(value - 1) : setValue(value + 1))}>
              {flip ? "Decrement Value" : "Increment Value"}
            </button>
          </div>
        </div>
        <div className="row-right number-pill">{value}</div>
      </section>

      {/* 🔤 Current letter & random word controls in a responsive flex row */}
      <section className="row card stack-sm">
        <div className="row-left">
          <h3>Current Letter: <span className="badge">{letter}</span></h3>
        </div>
        <div className="row-right">
          <button
            onDoubleClick={generateWord}
            onClick={() => setWord("")}
            className="primary"
            style={{ color: colorCorrelate(word) }} // 🎨 dynamic color via state
          >
            Random Word: {word || "—"}
          </button>
          <button className="ghost" onClick={() => setFlip(!flip)}>Flip</button>
        </div>
      </section>
    </div>
  
  );
}

export default App;
