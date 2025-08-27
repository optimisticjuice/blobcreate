import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [word, setWord] = useState("");
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(1);
  const [letter, setLetter] = useState("A");
  const [countLetter, setCountLetter] = useState("A");
  const [flip, setFlip] = useState(true);
  const [myArray, setMyArray] = useState(["", "", ""]);

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 26);
    const randomLetter = String.fromCharCode(65 + randomNumber); // 65 => 'A'
    setLetter(randomLetter);
  }, [value]);

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 26);
    const randomCountLetter = String.fromCharCode(65 + randomNumber);
    setCountLetter(randomCountLetter);
  }, [count]);

  const buildRandomWord = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";      // use uppercase to match switch cases
    let next = "";                                      // local var (NOT state) → no direct mutation
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      next += alphabet[randomIndex];
    }
    return next;                                        // return the completed word (pure)
  };

  const generateWord = () => {
    const next = buildRandomWord(); // compute
    setWord(next);                  // commit to state → triggers re-render
  };

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

  const switchToCenter = () => {
    setMyArray(["", "0", ""]);
  }
  const switchToLeft = () => {
    setMyArray(["0", "", ""]);
  }
  const switchToRight = () => {
    setMyArray(["", "", "0"]);
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Random Letter of the Header {countLetter}</h1>
      </header>
      <section className="row card">
        <div className="row-left">
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
      <section className="row card stack-sm">
        <div className="row-left">
          <h3>Current Letter: <span className="badge">{letter}</span></h3>
        </div>
        <div className="row-right">
          <button
            onDoubleClick={generateWord}
            onClick={() => setWord("")}
            className="primary"
            style={{ color: colorCorrelate(word) }}
          >
            Random Word: {word || "—"}
          </button>
          <button className="ghost" onClick={() => setFlip(!flip)}>Flip</button>
        </div>
      </section>
      <section style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "24px", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "20px" }}>
            {
              myArray.map((item, index) => (
                <div key={index} style={{ backgroundColor: item === "0" ? "red" : "grey", borderRadius: "50%", minHeight: "10px", minWidth: "10px" }}></div>
              ))
            }
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <div style={{ backgroundColor: "blue", height: "2px", width: "20px" }}></div>
            <div style={{ backgroundColor: "black", height: "2px", width: "20px" }}></div>
            <div style={{ backgroundColor: "yellow", height: "2px", width: "20px" }}></div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px", marginTop: "24px" }}>
          <button onClick={switchToLeft}>Left</button>
          <button onClick={switchToCenter}>Center</button>
          <button onClick={switchToRight}>Right</button>
        </div>
      </section>
    </div>
  );
}

export default App;
