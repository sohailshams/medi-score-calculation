import { AirOrOxygen, Consciousness } from "./Enums";

export function getAirOrOxygenScore(airOrOxygenInput) {
  switch (airOrOxygenInput) {
    case AirOrOxygen.AIR:
      return airOrOxygenInput;
    case AirOrOxygen.OXYGEN:
      return airOrOxygenInput;
    default:
      return null;
  }
}

export function getConsciousnessScore(consciousnessInput) {
  switch (consciousnessInput) {
    case Consciousness.ALERT:
      return consciousnessInput;
    case Consciousness.CVPU:
      return consciousnessInput;
    default:
      return null;
  }
}

export function getRespirationRangeScore(respirationRangeInput) {
  // Check if respiration is a number
  if (typeof respirationRangeInput != "number") return null;

  switch (true) {
    case respirationRangeInput <= 8:
      return 3;
    case respirationRangeInput >= 9 && respirationRangeInput <= 11:
      return 1;
    case respirationRangeInput >= 12 && respirationRangeInput <= 20:
      return 0;
    case respirationRangeInput >= 21 && respirationRangeInput <= 24:
      return 2;
    case respirationRangeInput >= 25:
      return 3;
    default:
      return null;
  }
}

export function getSpO2Score(spoScoreInput, airOrOxygenInput) {
  // Check if spO2 is a number
  if (typeof spoScoreInput != "number") return null;

  switch (true) {
    case spoScoreInput <= 83 ||
      (spoScoreInput >= 97 && airOrOxygenInput === AirOrOxygen.OXYGEN):
      return 3;
    case (spoScoreInput >= 84 && spoScoreInput <= 85) ||
      (spoScoreInput >= 95 &&
        spoScoreInput <= 96 &&
        airOrOxygenInput === AirOrOxygen.OXYGEN):
      return 2;
    case (spoScoreInput >= 86 && spoScoreInput <= 87) ||
      (spoScoreInput >= 93 &&
        spoScoreInput <= 94 &&
        airOrOxygenInput === AirOrOxygen.OXYGEN):
      return 1;
    case (spoScoreInput >= 88 && spoScoreInput <= 92) ||
      (spoScoreInput >= 93 && airOrOxygenInput === AirOrOxygen.AIR):
      return 0;
    default:
      return null;
  }
}

export function getTemperatureScore(temperatureScoreInput) {
  // Check if temperature is a number
  if (typeof temperatureScoreInput != "number") return null;

  // Rounded to a single decimal place
  temperatureScoreInput = temperatureScoreInput.toFixed(1);
  switch (true) {
    case temperatureScoreInput <= 35.0:
      return 3;
    case (temperatureScoreInput >= 35.1 && temperatureScoreInput <= 36.0) ||
      (temperatureScoreInput >= 38.1 && temperatureScoreInput <= 39.0):
      return 1;
    case temperatureScoreInput >= 36.1 && temperatureScoreInput <= 38.0:
      return 0;
    case temperatureScoreInput >= 39.1:
      return 2;
    default:
      return null;
  }
}

export function getCBGScore(isFasting, CBGScoreInput) {
  if (CBGScoreInput !== "") {
    // Check if CBG is a number, if not do type conversion
    if (typeof CBGScoreInput != "number") {
      CBGScoreInput *= 1;
    }
    // Check if CBG is a number
    if (typeof CBGScoreInput != "number") return null;
    // Rounded to a single decimal place
    CBGScoreInput = CBGScoreInput.toFixed(1);

    switch (true) {
      case isFasting ? CBGScoreInput <= 3.4 : CBGScoreInput <= 4.4:
        return 3;
      case isFasting
        ? CBGScoreInput >= 3.5 && CBGScoreInput <= 3.9
        : CBGScoreInput >= 4.5 && CBGScoreInput <= 5.8:
        return 2;
      case isFasting
        ? CBGScoreInput >= 4.0 && CBGScoreInput <= 5.4
        : CBGScoreInput >= 5.9 && CBGScoreInput <= 7.8:
        return 0;
      case isFasting
        ? CBGScoreInput >= 5.5 && CBGScoreInput <= 5.9
        : CBGScoreInput >= 7.9 && CBGScoreInput <= 8.9:
        return 2;
      case isFasting ? CBGScoreInput >= 6.0 : CBGScoreInput >= 9.0:
        return 3;
      default:
        return null;
    }
  }
  return false;
}
