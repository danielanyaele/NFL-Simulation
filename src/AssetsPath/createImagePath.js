import imagePath from "../../assetsPath/images";

const createImagePath = (fixture) => {
  const teams = fixture.split(" - ");
  const homeTeam = teams[0];
  const awayTeam = teams[1];

  const teamOneNames = homeTeam.split(" ");
  const teamOneSvgName = teamOneNames[teamOneNames.length - 1];

  // Naming Convention does not support numbers so i created an exception rule for san franciso 49ers

  const exception1 =
    teamOneSvgName === "49ers" ? "Fortyniners" : teamOneSvgName;

  const teamTwoNames = awayTeam.split(" ");
  const teamTwoSvgName = teamTwoNames[teamTwoNames.length - 1];

  const exception2 =
    teamTwoSvgName === "49ers" ? "Fortyniners" : teamTwoSvgName;

  const teamOnePath = `${imagesPath[exception1]}`;
  const teamTwoPath = `${imagesPath[exception2]}`;

  return {
    homeTeam,
    awayTeam,
    teamOnePath,
    teamTwoPath,
  };
};

export default createImagePath;
