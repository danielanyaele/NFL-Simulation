let results = [];

const storeResults = (fixtureState) => {
  const { fixture, gameDetails } = fixtureState;

  let result = { fixture, gameDetails };

  results = [...results, result];

  return results;
};

export default storeResults;
