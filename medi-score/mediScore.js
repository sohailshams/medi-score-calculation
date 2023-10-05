import {
  getAirOrOxygenScore,
  getConsciousnessScore,
  getRespirationRangeScore,
  getSpO2Score,
  getTemperatureScore,
  getCBGScore,
} from "./helpers";

export function mediScoreCalculation(observationsObject) {
  // Check if observations is an empty object & retrun an error message
  if (!Object.keys(observationsObject).length)
    return "Please pass correct input!";

  const validKeys = [
    "airOrOxygen",
    "consciousness",
    "respirationRange",
    "spO2",
    "temperature",
  ];

  // Check if observatios contains all keys & if not, retrun an error message
  const isValidKeys = validKeys.every((el) =>
    Object.keys(observationsObject).includes(el)
  );

  if (!isValidKeys) return "Please pass correct input!";

  let total = 0;
  let cbgTotal = 0;

  // Destructuring observatoins properties
  const {
    airOrOxygen,
    consciousness,
    respirationRange,
    spO2,
    temperature,
    isFasting,
    cbg,
  } = observationsObject;

  // Get air or oxygen score or return an error message
  const airOrOxygenScore = getAirOrOxygenScore(airOrOxygen);
  if (airOrOxygenScore === null)
    return "Please choose correct data either air or oxygen";

  // Get consciousness score or return an error message
  const consciousnessScore = getConsciousnessScore(consciousness);
  if (consciousnessScore === null)
    return "Please choose correct data either alert or CVPU";

  // Get respiration range score or return an error message
  const respirationRangeScore = getRespirationRangeScore(respirationRange);
  if (respirationRangeScore === null)
    return "Please choose an integer value for Respiration rate";

  // Get SpO2 score or return an error message
  const spO2Score = getSpO2Score(spO2, airOrOxygen);
  if (spO2Score === null) return "Please choose an integer value for spO2";

  // Get temperature score or return an error message
  const temperatureScore = getTemperatureScore(temperature);
  if (temperatureScore === null) return "Please add correct temperature value";

  // Get CBG score
  const CBGScore = getCBGScore(isFasting, cbg);

  // Update cbgTotal if getCBGScore returns a number
  if (CBGScore != false) {
    cbgTotal += CBGScore;
  }
  // Final medi score
  total +=
    airOrOxygenScore +
    consciousnessScore +
    respirationRangeScore +
    spO2Score +
    temperatureScore +
    cbgTotal;

  return total;
}
