const { mediScoreCalculation } = require("../medi-score/mediScore");
const { AirOrOxygen, Consciousness } = require("../medi-score/Enums");

describe("mediScoreCalculation test suite", () => {
  it("returns a message if passed an empty object", () => {
    expect(mediScoreCalculation({})).toBe("Please pass correct input!");
  });
  it("returns a message if passed object did not contain all properties", () => {
    // Create obervations object that is missing airOrOxygen  consciousness properties
    const observations = {
      respirationRange: 17,
      spo: 95,
      temperature: 37.1,
    };
    expect(mediScoreCalculation(observations)).toBe(
      "Please pass correct input!"
    );
  });
  it("returns a message if passed incorrect air or oxygen input", () => {
    // Create obervations object
    const observations = {
      airOrOxygen: "something",
      consciousness: Consciousness.ALERT,
      respirationRange: 17,
      spo: 95,
      temperature: 37.1,
    };
    expect(mediScoreCalculation(observations)).toBe(
      "Please choose correct data either air or oxygen"
    );
  });
  it("getAirOrOxygenScore returns correct score if the patient is breathing air", () => {
    // Create obervations object
    const observations = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: 0,
      respirationRange: 0,
      spo: 0,
      temperature: 0,
    };

    expect(mediScoreCalculation(observations)).toBe(0);
  });
  it("getAirOrOxygenScore returns correct score if the patient requires supplementary oxygen.", () => {
    // Create obervations object
    const observations = {
      airOrOxygen: AirOrOxygen.OXYGEN,
      consciousness: 0,
      respirationRange: 0,
      spo: 0,
      temperature: 0,
    };
    expect(mediScoreCalculation(observations)).toBe(2);
  });
  it("returns a message if passed incorrect consciousness input", () => {
    // Create obervations object
    const observations = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: "something",
      respirationRange: 17,
      spo: 95,
      temperature: 37.1,
    };
    expect(mediScoreCalculation(observations)).toBe(
      "Please choose correct data either alert or CVPU"
    );
  });
  it("getConsciousnessScore returns correct score if the patient is conscious", () => {
    // Create obervations object
    const observations = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 0,
      spo: 0,
      temperature: 0,
    };
    expect(mediScoreCalculation(observations)).toBe(0);
  });
  it("getConsciousnessScore returns correct score if the patient is unconscious", () => {
    // Create obervations object
    const observations = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.CVPU,
      respirationRange: 0,
      spo: 0,
      temperature: 0,
    };
    expect(mediScoreCalculation(observations)).toBe(3);
  });
});
