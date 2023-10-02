const { AirOrOxygen, Consciousness } = require("./Enums");

function getAirOrOxygenScore(airOrOxygenInput) {
  switch (airOrOxygenInput) {
    case AirOrOxygen.AIR:
      return airOrOxygenInput;
    case AirOrOxygen.OXYGEN:
      return airOrOxygenInput;
    default:
      return null;
  }
}

function getConsciousnessScore(consciousnessInput) {
  switch (consciousnessInput) {
    case Consciousness.ALERT:
      return consciousnessInput;
    case Consciousness.CVPU:
      return consciousnessInput;
    default:
      return null;
  }
}

function getRespirationRangeScore(respirationRangeInput) {
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

function getSpO2Score(spoScoreInput, airOrOxygenInput) {
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

module.exports = {
  getAirOrOxygenScore,
  getConsciousnessScore,
  getRespirationRangeScore,
  getSpO2Score,
};
