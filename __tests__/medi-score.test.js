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
      spO2: 95,
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
      spO2: 90,
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
      spO2: 90,
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
      spO2: 90,
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
      spO2: 90,
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
      spO2: 90,
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
      spO2: 90,
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
      spO2: 90,
      temperature: 37.1,
    };
    expect(mediScoreCalculation(observations)).toBe(
      "Please choose an integer value"
    );
  });
  it("getRespirationRangeScore returns correct score if respiration range observation is <=8", () => {
    // Create obervations objects
    const observationsLessThan8 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: -1,
      spO2: 90,
      temperature: 0,
    };
    const observationEqual8 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 8,
      spO2: 90,
      temperature: 0,
    };
    expect(mediScoreCalculation(observationsLessThan8)).toBe(3);
    expect(mediScoreCalculation(observationEqual8)).toBe(3);
  });
  it("getRespirationRangeScore returns correct score if respiration range observation is >=9 and <=11", () => {
    // Create obervations objects
    const observationsEqual9 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 9,
      spO2: 90,
      temperature: 0,
    };
    const observationsEqual10 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 10,
      spO2: 90,
      temperature: 0,
    };
    const observationsEqual11 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 11,
      spO2: 90,
      temperature: 0,
    };
    expect(mediScoreCalculation(observationsEqual9)).toBe(1);
    expect(mediScoreCalculation(observationsEqual10)).toBe(1);
    expect(mediScoreCalculation(observationsEqual11)).toBe(1);
  });
  it("getRespirationRangeScore returns correct score if respiration range observation is >=12 and <=20", () => {
    // Create obervations objects
    const observationsEqual12 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 12,
      spO2: 90,
      temperature: 0,
    };
    const observationsEqual16 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 16,
      spO2: 90,
      temperature: 0,
    };
    const observationsEqual20 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 20,
      spO2: 90,
      temperature: 0,
    };
    expect(mediScoreCalculation(observationsEqual12)).toBe(0);
    expect(mediScoreCalculation(observationsEqual16)).toBe(0);
    expect(mediScoreCalculation(observationsEqual20)).toBe(0);
  });
  it("getRespirationRangeScore returns correct score if respiration range observation is >=21 and <=24", () => {
    // Create obervations objects
    const observationsEqual21 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 21,
      spO2: 90,
      temperature: 0,
    };
    const observationsEqual23 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 23,
      spO2: 90,
      temperature: 0,
    };
    const observationsEqual24 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 24,
      spO2: 90,
      temperature: 0,
    };
    expect(mediScoreCalculation(observationsEqual21)).toBe(2);
    expect(mediScoreCalculation(observationsEqual23)).toBe(2);
    expect(mediScoreCalculation(observationsEqual24)).toBe(2);
  });
  it("getRespirationRangeScore returns correct score if respiration range observation is >=25", () => {
    // Create obervations objects
    const observationsEqual25 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 25,
      spO2: 90,
      temperature: 0,
    };
    const observationsGreaterThan25 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 30,
      spO2: 90,
      temperature: 0,
    };
    expect(mediScoreCalculation(observationsEqual25)).toBe(3);
    expect(mediScoreCalculation(observationsGreaterThan25)).toBe(3);
  });
  it("returns a message if passed incorrect spO2 input", () => {
    // Create obervations object
    const observations = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: "something",
      temperature: 36.1,
    };
    expect(mediScoreCalculation(observations)).toBe(
      "Please choose an integer value"
    );
  });
  it("getSpO2Score returns correct score if spO2 observation is <=83", () => {
    // Create obervations objects
    const observationsLessThan83 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 80,
      temperature: 36.1,
    };
    const observationsEqual83 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 83,
      temperature: 36.1,
    };
    expect(mediScoreCalculation(observationsLessThan83)).toBe(3);
    expect(mediScoreCalculation(observationsEqual83)).toBe(3);
  });
  it("getSpO2Score returns correct score if spO2 observation is >=84 and <=85", () => {
    // Create obervations objects
    const observationsEqual84 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 84,
      temperature: 36.1,
    };
    const observationsEqual85 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 85,
      temperature: 36.1,
    };
    expect(mediScoreCalculation(observationsEqual84)).toBe(2);
    expect(mediScoreCalculation(observationsEqual85)).toBe(2);
  });
  it("getSpO2Score returns correct score if spO2 observation is >=86 and <=87", () => {
    // Create obervations objects
    const observationsEqual86 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 86,
      temperature: 36.1,
    };
    const observationsEqual87 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 87,
      temperature: 36.1,
    };
    expect(mediScoreCalculation(observationsEqual86)).toBe(1);
    expect(mediScoreCalculation(observationsEqual87)).toBe(1);
  });
  it("getSpO2Score returns correct score if spO2 observation is >=88 and <=92 or >= 93 on air", () => {
    // Create obervations objects
    const observationsEqual88 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 88,
      temperature: 36.1,
    };
    const observationsEqual90 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 90,
      temperature: 36.1,
    };
    const observationsEqual92 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 92,
      temperature: 36.1,
    };
    const observationsEqual93Air = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 93,
      temperature: 36.1,
    };
    const observationsGreater93Air = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 100,
      temperature: 36.1,
    };
    expect(mediScoreCalculation(observationsEqual88)).toBe(0);
    expect(mediScoreCalculation(observationsEqual90)).toBe(0);
    expect(mediScoreCalculation(observationsEqual92)).toBe(0);
    expect(mediScoreCalculation(observationsEqual93Air)).toBe(0);
    expect(mediScoreCalculation(observationsGreater93Air)).toBe(0);
  });
  it("getSpO2Score returns correct score if spO2 observation is >=93 and <=94 and on oxygen", () => {
    // Create obervations objects
    const observationsEqual93Oxygen = {
      airOrOxygen: AirOrOxygen.OXYGEN,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 93,
      temperature: 36.1,
    };
    const observationsEqual94Oxygen = {
      airOrOxygen: AirOrOxygen.OXYGEN,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 94,
      temperature: 36.1,
    };
    // Note total is 3 because when we pass patient on oxygen then we get score 2 from getAirOrOxygenScore + 1 from spO2Score
    expect(mediScoreCalculation(observationsEqual93Oxygen)).toBe(3);
    expect(mediScoreCalculation(observationsEqual94Oxygen)).toBe(3);
  });
  it("getSpO2Score returns correct score if spO2 observation is >=95 and <=96 and on oxygen", () => {
    // Create obervations objects
    const observationsEqual95Oxygen = {
      airOrOxygen: AirOrOxygen.OXYGEN,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 95,
      temperature: 36.1,
    };
    const observationsEqual96Oxygen = {
      airOrOxygen: AirOrOxygen.OXYGEN,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 96,
      temperature: 36.1,
    };
    // Note total is 4 because when we pass patient on oxygen then we get score 2 from getAirOrOxygenScore + 2 from spO2Score
    expect(mediScoreCalculation(observationsEqual95Oxygen)).toBe(4);
    expect(mediScoreCalculation(observationsEqual96Oxygen)).toBe(4);
  });
  it("getSpO2Score returns correct score if spO2 observation is >=97 and on oxygen", () => {
    // Create obervations objects
    const observationsEqual97Oxygen = {
      airOrOxygen: AirOrOxygen.OXYGEN,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 97,
      temperature: 36.1,
    };
    const observationsGreater97Oxygen = {
      airOrOxygen: AirOrOxygen.OXYGEN,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 100,
      temperature: 36.1,
    };
    // Note total is 5 because when we pass patient on oxygen then we get score 2 from getAirOrOxygenScore + 3 from spO2Score
    expect(mediScoreCalculation(observationsEqual97Oxygen)).toBe(5);
    expect(mediScoreCalculation(observationsGreater97Oxygen)).toBe(5);
  });
});