const { AirOrOxygen } = require("./Enums");

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

module.exports = { getAirOrOxygenScore };
