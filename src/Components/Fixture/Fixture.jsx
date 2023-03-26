import "./Fixture.css";
import { useEffect, useReducer, useState } from "react";
import fixtureReducer from "../../Reducers/fixtureReducer";
import FixturePrototype from "./FixtureProto";
import Ball from "../../assets/SVG/ball.svg";
import { useStopwatch } from "react-timer-hook";
import createImagePath from "./createImagePath";
import storeResults from "../../Data/storeAllResults";

const Fixture = ({ details }) => {
  const [state, dispatch] = useReducer(fixtureReducer, FixturePrototype);
  const [endOfMatch, setEndOfMatch] = useState(-1);

  const { seconds, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

  //Initialize game state
  useEffect(() => {
    dispatch({
      type: "initializeState",
      payload: { ...details },
    });
  }, []);

  // turn on scoring effect in fixtures after overlay is removed from the UI
  useEffect(() => {
    setTimeout(() => {
      start();
    }, 4000);
  }, []);

  const score = () => {
    // Increase Points
    dispatch({
      type: "score",
    });

    //After secs erase scoring animation
    setTimeout(() => {
      dispatch({
        type: "clearScoringTheme",
      });
    }, 2000);

    //Switch to the next points to be scored
    dispatch({
      type: "updateNextPointsIndex",
    });
  };

  //watches the time for points to be scored at
  useEffect(() => {
    //if game clock matches a scoring interval, score.
    if (state.scoringInterval && state.scoringInterval.includes(seconds)) {
      score();
    }

    //At halftime, pause scoring event on games
    if (seconds === 30) {
      pause();

      //store Game result
      dispatch({ type: "storeGameResult" });

      // after 3secs trigger scoring event on games
      setTimeout(() => {
        const stopwatchOffset = new Date();
        reset(stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + 30));
      }, 5000);
    }

    //stop background clock from running after 50 secs
    if (endOfMatch === 60) {
      pause();
      //compiles results for all fixtures
      storeResults(state);
    }

    setEndOfMatch(endOfMatch + 1);
  }, [seconds]);

  const { homeTeam, awayTeam, teamOnePath, teamTwoPath } = createImagePath(
    details.fixture
  );

  return (
    <>
      <div className="fixture">
        <div className={`team__one ${state.hasScored && "score"}`}>
          <div className="team__one-logo">
            <img src={teamOnePath} className="team-img" alt="team logo" />
          </div>

          <div className="team__one-name">{homeTeam}</div>
          <div className="team__one-scores">
            <div
              className={`team__one-scores__scored ${
                state.showPointsScored ? "" : "hidden"
              }`}
            >
              +{state.team1PointsScored}
            </div>
            <div className="team__one-scores__current">
              {state.team1CurPoints}
            </div>
          </div>
        </div>

        {state.hasScored && (
          <svg className="ball">
            <use href={`${Ball}#icon-football`}></use>
          </svg>
        )}

        <div className={`team__one ${state.hasScored && "score"}`}>
          <div className="team__one-logo">
            <img src={teamTwoPath} className="team-img" alt="team logo" />
          </div>
          <div className="team__two-name">{awayTeam}</div>
          <div className="team__two-scores">
            <div
              className={`team__two-scores__scored ${
                state.showPointsScored ? "" : "hidden"
              }`}
            >
              +{state.team2PointsScored}
            </div>
            <div className="team__two-scores__current">
              {state.team2CurPoints}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fixture;
