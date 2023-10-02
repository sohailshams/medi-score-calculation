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
      respirationRange: 12,
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
      respirationRange: 12,
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
      respirationRange: 12,
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
      respirationRange: 12,
      spo: 0,
      temperature: 0,
    };
    expect(mediScoreCalculation(observations)).toBe(3);
  });
  it("returns a message if passed incorrect Respiration range input", () => {
    // Create obervations object
    const observations = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: "something",
      spo: 95,
      temperature: 37.1,
    };
    expect(mediScoreCalculation(observations)).toBe(
      "Please choose an integer value"
    );
  });
  it("getrespirationRangeScore returns correct score if respiration range observation is <=8", () => {
    // Create obervations objects
    const observationsLessThan8 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: -1,
      spo: 0,
      temperature: 0,
    };
    const observationEqual8 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 8,
      spo: 0,
      temperature: 0,
    };
    expect(mediScoreCalculation(observationsLessThan8)).toBe(3);
    expect(mediScoreCalculation(observationEqual8)).toBe(3);
  });
  it("getrespirationRangeScore returns correct score if respiration range observation is >=9 and <=11", () => {
    // Create obervations objects
    const observationsEqual9 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 9,
      spo: 0,
      temperature: 0,
    };
    const observationsEqual10 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 10,
      spo: 0,
      temperature: 0,
    };
    const observationsEqual11 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 11,
      spo: 0,
      temperature: 0,
    };
    expect(mediScoreCalculation(observationsEqual9)).toBe(1);
    expect(mediScoreCalculation(observationsEqual10)).toBe(1);
    expect(mediScoreCalculation(observationsEqual11)).toBe(1);
  });
  it("getrespirationRangeScore returns correct score if respiration range observation is >=12 and <=20", () => {
    // Create obervations objects
    const observationsEqual12 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 12,
      spo: 0,
      temperature: 0,
    };
    const observationsEqual16 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 16,
      spo: 0,
      temperature: 0,
    };
    const observationsEqual20 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 20,
      spo: 0,
      temperature: 0,
    };
    expect(mediScoreCalculation(observationsEqual12)).toBe(0);
    expect(mediScoreCalculation(observationsEqual16)).toBe(0);
    expect(mediScoreCalculation(observationsEqual20)).toBe(0);
  });
  it("getrespirationRangeScore returns correct score if respiration range observation is >=21 and <=24", () => {
    // Create obervations objects
    const observationsEqual21 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 21,
      spo: 0,
      temperature: 0,
    };
    const observationsEqual23 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 23,
      spo: 0,
      temperature: 0,
    };
    const observationsEqual24 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 24,
      spo: 0,
      temperature: 0,
    };
    expect(mediScoreCalculation(observationsEqual21)).toBe(2);
    expect(mediScoreCalculation(observationsEqual23)).toBe(2);
    expect(mediScoreCalculation(observationsEqual24)).toBe(2);
  });
  it("getrespirationRangeScore returns correct score if respiration range observation is >=25", () => {
    // Create obervations objects
    const observationsEqual25 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 25,
      spo: 0,
      temperature: 0,
    };
    const observationsGreaterThan25 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 30,
      spo: 0,
      temperature: 0,
    };
    expect(mediScoreCalculation(observationsEqual25)).toBe(3);
    expect(mediScoreCalculation(observationsGreaterThan25)).toBe(3);
  });
});
