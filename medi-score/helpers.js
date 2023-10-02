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

function getrespirationRangeScore(respirationRangeInput) {
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

module.exports = {
  getAirOrOxygenScore,
  getConsciousnessScore,
  getrespirationRangeScore,
};
