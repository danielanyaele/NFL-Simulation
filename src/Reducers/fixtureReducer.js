import scoringIntervals from "../Data/scoringIntervals";

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const fixtureReducer = (st, action) => {
  if (action.type === "initializeState") {
    //secs when points are to be scored;
  

    const scoringInterval = scoringIntervals[getRandomInt(0, 5)];

    const { team1, team2, fixture } = action.payload;

    return {
      ...st,
      fixture,
      scoringInterval: scoringInterval,

      teamPoints: {
        team1,
        team2,
      },
    };
  }

  if (action.type === "score") {
    const pointsScoredByTeam1 = st.teamPoints.team1[st.nextPointIndex];
    const pointsScoredByTeam2 = st.teamPoints.team2[st.nextPointIndex];

    return {
      ...st,
      hasScored: true,
      showPointsScored: true,
      team1PointsScored: pointsScoredByTeam1,
      team2PointsScored: pointsScoredByTeam2,
      team1CurPoints: st.team1CurPoints + pointsScoredByTeam1,
      team2CurPoints: st.team2CurPoints + pointsScoredByTeam2,
    };
  }

  if (action.type === "clearScoringTheme") {
    return {
      ...st,
      hasScored: false,
      showPointsScored: false,
    };
  }

  if (action.type === "updateNextPointsIndex") {
    return {
      ...st,
      nextPointIndex: st.nextPointIndex + 1,
    };
  }

  if (action.type === "storeGameResult") {
    // Halftime result
    const team1HTScore = st.teamPoints.team1.slice(0, 3).reduce((acc, cur) => {
      return acc + cur;
    }, 0);
    const team2HTScore = st.teamPoints.team2.slice(0, 3).reduce((acc, cur) => {
      return acc + cur;
    }, 0);

    // Full time result
    const team1FTScore = st.teamPoints.team1.slice(0).reduce((acc, cur) => {
      return acc + cur;
    }, 0);

    const team2FTScore = st.teamPoints.team2.slice(0).reduce((acc, cur) => {
      return acc + cur;
    }, 0);

    return {
      ...st,
      gameDetails: {
        ...st.gameDetails,
        "HT-Score": { team1: team1HTScore, team2: team2HTScore },
        "FT-Score": { team1: team1FTScore, team2: team2FTScore },
      },
    };
  }
};

export default fixtureReducer;
