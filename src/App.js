import React, { useEffect, useState, useRef } from "react";

import logo from "./logo.svg";
import "./App.css";

function App() {
  const [alignedJson, setAlignedJson] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    fetch("/aligned-a539e85d7b660957093d20114c6696219180e3c1.json")
      .then(res => res.json())
      .then(json => {
        setAlignedJson(json);
        setLoading(false);
      })
      .catch(e => alert(JSON.stringify(e, null, 4)));
  }, []);

  if (loading) return "Loading...";

  const transcript = alignedJson.segments.map(segment => {
    const paragraph = segment.wdlist.map(wd => {
      let color = "white";
      if (currentTime >= wd.start) {
        color = "red";
      }
      return (
        <span
          key={`${wd.start}-${wd.end}`}
          onClick={e => {
            audioRef.current.currentTime = wd.start;
          }}
          style={{
            background: color
          }}
        >
          {wd.word}
        </span>
      );
    });
    return <p key={`${segment.start}-${segment.end}`}>{paragraph}</p>;
  });

  return (
    <div className="App">
      <div>{transcript}</div>
      <pre>Current time is {currentTime}</pre>
      <header className="App-header">
        <audio
          onTimeUpdate={e => {
            setCurrentTime(audioRef.current.currentTime);
          }}
          ref={audioRef}
          controls
          src="/audio.mp3"
        ></audio>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
