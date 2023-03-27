import "./Header.css";
import { useState, useEffect } from "react";
import { useStopwatch } from "react-timer-hook";

const Header = () => {
  const [breakType, setBreakType] = useState("");
  const [secondHalfTime, setSecondHalfTime] = useState(30);
  const [time, setTime] = useState(-1);
  const [displayHTScore, setDisplayHTSscore] = useState(false);

  const { seconds, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

  //start game clock after overlay is removed from the UI
  useEffect(() => {
    setTimeout(() => {
      start();
    }, 6000);
  }, []);

  //Handles Game Clock
  useEffect(() => {
    if (time === 30 && secondHalfTime === 30) {
      // pause game clock for 3secs halftime break and changes number to "HT" text
      pause();
      setBreakType("HT");

      //starts clock for second half after 5secs halftime break
      setTimeout(() => {
        setBreakType("");
        const stopwatchOffset = new Date();

        //resets clock to 24secs
        reset(stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + 30));
        setTime(29);
        setSecondHalfTime(0);
      }, 5000);
    }

    if (time === 59) setDisplayHTSscore(true);

    //stop game clock as clock reaches 48secs for fulltime.
    if (time === 60) {
      
      pause();
      setBreakType("FT");
    }

    setTime(time + 1);
  }, [seconds]);

  return (
    <>
      <div className="header">
        <div className="header__title">NFL Live</div>

        {displayHTScore && <div className="header__game-status">HT</div>}

        <div className="header__timer">{breakType ? breakType : time}</div>
      </div>
    </>
  );
};

export default Header;
