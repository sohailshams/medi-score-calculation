import { mediScoreCalculation } from "../medi-score/mediScore";
import { AirOrOxygen, Consciousness } from "../medi-score/Enums";
import { alertChecker } from "../medi-score/alertChecker";
import { mediScoreData } from "../test-data/patientTestData";
import { getCBGScore } from "../medi-score/helpers";

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

  // Patient 1 observations
  it("mediScoreCalculation returns correct score for patient 1 observations", () => {
    // Create obervations object
    const observations = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 95,
      temperature: 37.1,
    };

    expect(mediScoreCalculation(observations)).toBe(0);
  });

  // Patient 2 observations
  it("mediScoreCalculation returns correct score for patient 1 observations", () => {
    // Create obervations object
    const observations = {
      airOrOxygen: AirOrOxygen.OXYGEN,
      consciousness: Consciousness.ALERT,
      respirationRange: 17,
      spO2: 95,
      temperature: 37.1,
    };

    expect(mediScoreCalculation(observations)).toBe(4);
  });

  // Patient 3 observations
  it("mediScoreCalculation returns correct score for patient 1 observations", () => {
    // Create obervations object
    const observations = {
      airOrOxygen: AirOrOxygen.OXYGEN,
      consciousness: Consciousness.CVPU,
      respirationRange: 23,
      spO2: 88,
      temperature: 38.5,
    };

    expect(mediScoreCalculation(observations)).toBe(8);
  });

  // Patient 4 observations
  it("mediScoreCalculation returns correct score for patient 1 observations", () => {
    // Create obervations object
    const observations = {
      airOrOxygen: AirOrOxygen.OXYGEN,
      consciousness: Consciousness.CVPU,
      respirationRange: 5,
      spO2: 98,
      temperature: 35.0,
    };

    expect(mediScoreCalculation(observations)).toBe(14);
  });
});

describe("mediScoreCalculation - getAirOrOxygenScore test suite", () => {
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
      temperature: 36.1,
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
      temperature: 36.1,
    };
    expect(mediScoreCalculation(observations)).toBe(2);
  });
});

describe("mediScoreCalculation - getConsciousnessScore test suite", () => {
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
      temperature: 36.1,
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
      temperature: 36.1,
    };
    expect(mediScoreCalculation(observations)).toBe(3);
  });
});

describe("mediScoreCalculation - getRespirationRangeScore test suite", () => {
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
      "Please choose an integer value for Respiration rate"
    );
  });
  it("getRespirationRangeScore returns correct score if respiration range observation is <=8", () => {
    // Create obervations objects
    const observationsLessThan8 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: -1,
      spO2: 90,
      temperature: 36.1,
    };
    const observationEqual8 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 8,
      spO2: 90,
      temperature: 36.1,
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
      temperature: 36.1,
    };
    const observationsEqual10 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 10,
      spO2: 90,
      temperature: 36.1,
    };
    const observationsEqual11 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 11,
      spO2: 90,
      temperature: 36.1,
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
      temperature: 36.1,
    };
    const observationsEqual16 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 16,
      spO2: 90,
      temperature: 36.1,
    };
    const observationsEqual20 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 20,
      spO2: 90,
      temperature: 36.1,
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
      temperature: 36.1,
    };
    const observationsEqual23 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 23,
      spO2: 90,
      temperature: 36.1,
    };
    const observationsEqual24 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 24,
      spO2: 90,
      temperature: 36.1,
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
      temperature: 36.1,
    };
    const observationsGreaterThan25 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 30,
      spO2: 90,
      temperature: 36.1,
    };
    expect(mediScoreCalculation(observationsEqual25)).toBe(3);
    expect(mediScoreCalculation(observationsGreaterThan25)).toBe(3);
  });
});

describe("mediScoreCalculation - getSpO2Score test suite", () => {
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
      "Please choose an integer value for spO2"
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

describe("mediScoreCalculation - getTemperatureScore test suite", () => {
  it("returns a message if passed incorrect temperature input", () => {
    // Create obervations object
    const observations = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 90,
      temperature: "somthing",
    };
    expect(mediScoreCalculation(observations)).toBe(
      "Please add correct temperature value"
    );
  });
  it("getTemperatureScore returns correct score if temperature observation is <=35.0", () => {
    // Create obervations objects
    const observationsLessThan35 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 90,
      temperature: 34,
    };
    const observationsEqual35 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 90,
      temperature: 35.0,
    };
    expect(mediScoreCalculation(observationsLessThan35)).toBe(3);
    expect(mediScoreCalculation(observationsEqual35)).toBe(3);
  });
  it("getTemperatureScore returns correct score if temperature observation is >=35.1 and <=36.0", () => {
    // Create obervations objects
    const observationsEqual351 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 90,
      temperature: 35.1,
    };
    const observationsEqual355 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 90,
      temperature: 35.5,
    };
    const observationsEqual36 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 90,
      temperature: 36.0,
    };
    expect(mediScoreCalculation(observationsEqual351)).toBe(1);
    expect(mediScoreCalculation(observationsEqual355)).toBe(1);
    expect(mediScoreCalculation(observationsEqual36)).toBe(1);
  });
  it("getTemperatureScore returns correct score if temperature observation is >=36.1 and <=38.0", () => {
    // Create obervations objects
    const observationsEqual361 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 90,
      temperature: 36.1,
    };
    const observationsEqual37 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 90,
      temperature: 37,
    };
    const observationsEqual38 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 90,
      temperature: 38.0,
    };
    expect(mediScoreCalculation(observationsEqual361)).toBe(0);
    expect(mediScoreCalculation(observationsEqual37)).toBe(0);
    expect(mediScoreCalculation(observationsEqual38)).toBe(0);
  });
  it("getTemperatureScore returns correct score if temperature observation is >=38.1 and <=39.0", () => {
    // Create obervations objects
    const observationsEqual381 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 90,
      temperature: 38.1,
    };
    const observationsEqual385 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 90,
      temperature: 38.5,
    };
    const observationsEqual39 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 90,
      temperature: 39.0,
    };
    expect(mediScoreCalculation(observationsEqual381)).toBe(1);
    expect(mediScoreCalculation(observationsEqual385)).toBe(1);
    expect(mediScoreCalculation(observationsEqual39)).toBe(1);
  });
  it("getTemperatureScore returns correct score if temperature observation is >=39.1", () => {
    // Create obervations objects
    const observationsEqual391 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 90,
      temperature: 39.1,
    };
    const observationsEqual40 = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 90,
      temperature: 40.0,
    };
    expect(mediScoreCalculation(observationsEqual391)).toBe(2);
    expect(mediScoreCalculation(observationsEqual40)).toBe(2);
  });
});

describe("getCBGScore test suite", () => {
  it("getCBGScore returns a false if passed an empty string - isFasting=false", () => {
    expect(getCBGScore(false, "")).toBe(false);
  });
  it("getCBGScore returns a false if passed an empty string - isFasting=true", () => {
    expect(getCBGScore(true, "")).toBe(false);
  });
  it("getCBGScore returns a null if passed input not converted to number - isFasting=false", () => {
    expect(getCBGScore(false, "nonsense")).toBe(null);
  });
  it("getCBGScore returns a null if passed input not converted to number - isFasting=true", () => {
    expect(getCBGScore(true, "nonsense")).toBe(null);
  });
  it("getCBGScore returns correct score if CBG observation is <=4.4 - isFasting=false", () => {
    expect(getCBGScore(false, 4)).toBe(3);
    expect(getCBGScore(false, 4.4)).toBe(3);
  });
  it("getCBGScore returns correct score if CBG observation is <=3.4 - isFasting=true", () => {
    expect(getCBGScore(true, 3)).toBe(3);
    expect(getCBGScore(true, 3.4)).toBe(3);
  });
  it("getCBGScore returns correct score if CBG observation is >=4.5 and <=5.8 - isFasting=false", () => {
    expect(getCBGScore(false, 4.5)).toBe(2);
    expect(getCBGScore(false, 5)).toBe(2);
    expect(getCBGScore(false, 5.8)).toBe(2);
  });
  it("getCBGScore returns correct score if CBG observation is >=3.5 and <=3.9 - isFasting=true", () => {
    expect(getCBGScore(true, 3.5)).toBe(2);
    expect(getCBGScore(true, 3.7)).toBe(2);
    expect(getCBGScore(true, 3.9)).toBe(2);
  });
  it("getCBGScore returns correct score if CBG observation is >=5.9 and <=7.8 - isFasting=false", () => {
    expect(getCBGScore(false, 5.9)).toBe(0);
    expect(getCBGScore(false, 6.0)).toBe(0);
    expect(getCBGScore(false, 7.8)).toBe(0);
  });
  it("getCBGScore returns correct score if CBG observation is >=4.0 and <=5.4 - isFasting=true", () => {
    expect(getCBGScore(true, 4.0)).toBe(0);
    expect(getCBGScore(true, 5)).toBe(0);
    expect(getCBGScore(true, 5.4)).toBe(0);
  });
  it("getCBGScore returns correct score if CBG observation is >=7.9 and <=8.9 - isFasting=false", () => {
    expect(getCBGScore(false, 7.9)).toBe(2);
    expect(getCBGScore(false, 8.0)).toBe(2);
    expect(getCBGScore(false, 8.9)).toBe(2);
  });
  it("getCBGScore returns correct score if CBG observation is >=5.5 and <=5.9 - isFasting=true", () => {
    expect(getCBGScore(true, 5.5)).toBe(2);
    expect(getCBGScore(true, 5.7)).toBe(2);
    expect(getCBGScore(true, 5.9)).toBe(2);
  });
  it("getCBGScore returns correct score if CBG observation is >=9.0 - isFasting=false", () => {
    expect(getCBGScore(false, 9.0)).toBe(3);
    expect(getCBGScore(false, 9.5)).toBe(3);
  });
  it("getCBGScore returns correct score if CBG observation is >=6.0 - isFasting=true", () => {
    expect(getCBGScore(true, 9.0)).toBe(3);
    expect(getCBGScore(true, 9.5)).toBe(3);
  });
});

describe("alertChecker test suite", () => {
  it("returns false", () => {
    // Create obervations object
    const observations = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 95,
      temperature: 37.1,
    };
    const mediScore = mediScoreCalculation(observations);
    expect(alertChecker(mediScore, mediScoreData)).toBe(false);
  });
  it("returns false if medi score did not raise by more than 2 - single reading in 24 hours", () => {
    // Create obervations object
    const observations = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 95,
      temperature: 37.1,
    };
    // Single reading medi score data
    const mediScoreDataSingle = [
      {
        id: 1,
        time: "06:00",
        mediScore: 0,
      },
    ];
    const mediScore = mediScoreCalculation(observations);
    expect(alertChecker(mediScore, mediScoreDataSingle)).toBe(false);
  });
  it("returns true if medi score raised by more than 2 - single reading in 24 hours", () => {
    // Create obervations object
    const observations = {
      airOrOxygen: AirOrOxygen.OXYGEN,
      consciousness: Consciousness.ALERT,
      respirationRange: 17,
      spO2: 95,
      temperature: 37.1,
    };
    // Single reading medi score data
    const mediScoreDataSingle = [
      {
        id: 1,
        time: "06:00",
        mediScore: 0,
      },
    ];
    const mediScore = mediScoreCalculation(observations);
    expect(alertChecker(mediScore, mediScoreDataSingle)).toBe(true);
  });
  it("returns false if medi score did not raise by more than 2 - multiple readings 24 hours", () => {
    // Create obervations object
    const observations = {
      airOrOxygen: AirOrOxygen.AIR,
      consciousness: Consciousness.ALERT,
      respirationRange: 15,
      spO2: 95,
      temperature: 37.1,
    };
    const mediScore = mediScoreCalculation(observations);
    expect(alertChecker(mediScore, mediScoreData)).toBe(false);
  });
  it("returns true if medi score raised by more than 2 - multiple readings 24 hours", () => {
    // Create obervations object
    const observations = {
      airOrOxygen: AirOrOxygen.OXYGEN,
      consciousness: Consciousness.ALERT,
      respirationRange: 17,
      spO2: 95,
      temperature: 37.1,
    };
    const mediScore = mediScoreCalculation(observations);
    expect(alertChecker(mediScore, mediScoreData)).toBe(true);
  });
});
