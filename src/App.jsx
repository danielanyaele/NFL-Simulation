import { useState, useEffect } from "react";
import { useStopwatch } from "react-timer-hook";
import fixtures from "./Data/fixtures.js";
import Header from "./Components/Header/Header";
import Fixture from "./Components/Fixture/Fixture";
import "./App.css";

function App() {
  const [countdown, setCountdown] = useState(5);
  const [startGame, setStartGame] = useState(false);

  const { seconds, pause } = useStopwatch({
    autoStart: true,
  });

  useEffect(() => {
    if (countdown === 0) {
      setStartGame(true);
      pause();
    }
    setCountdown((prev) => prev - 1);
  }, [seconds]);

  return (
    <>
      <div className="container">
        {/* remove overlay after 5secs countdown */}
        {!startGame && <div className="overlay"></div>}

        {!startGame && <div className="countdown">{countdown}</div>}

        <Header />
        <div className="fixtures">
          {fixtures.map((details, i) => {
            return <Fixture details={details} key={i + 1} />;
          })}
        </div>
      </div>
    </>
  );
}

export default App;
