const {
  getAirOrOxygenScore,
  getConsciousnessScore,
  getrespirationRangeScore,
} = require("./helpers");

function mediScoreCalculation(observationsObject) {
  // Check if observations is an empty object & retrun an error message
  if (!Object.keys(observationsObject).length)
    return "Please pass correct input!";

  const validKeys = [
    "airOrOxygen",
    "consciousness",
    "respirationRange",
    "spo",
    "temperature",
  ];

  // Check if observatios contains all keys & if not, retrun an error message
  const isValidKeys = validKeys.every((el) =>
    Object.keys(observationsObject).includes(el)
  );

  if (!isValidKeys) return "Please pass correct input!";

  let total = 0;

  // Destructuring observatoins properties
  const { airOrOxygen, consciousness, respirationRange } = observationsObject;

  // Get air or oxygen score or return an error message
  const airOrOxygenScore = getAirOrOxygenScore(airOrOxygen);
  if (airOrOxygenScore === null)
    return "Please choose correct data either air or oxygen";

  // Get consciousness score or return an error message
  const consciousnessScore = getConsciousnessScore(consciousness);
  if (consciousnessScore === null)
    return "Please choose correct data either alert or CVPU";

  // Get respiration range score or return an error message
  const respirationRangeScore = getrespirationRangeScore(respirationRange);
  if (respirationRangeScore === null) return "Please choose an integer value";

  // Final medi score
  total += airOrOxygenScore + consciousnessScore + respirationRangeScore;

  return total;
}

module.exports = { mediScoreCalculation };
