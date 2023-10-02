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

module.exports = { getAirOrOxygenScore, getConsciousnessScore };
