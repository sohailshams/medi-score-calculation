# Medi Score Calculation

- [Live Link](https://medi-score-calculation.netlify.app/)

- [Github Repo](https://github.com/sohailshams/medi-score-calculation)

## Description

The Medi Score Calculation is a simple function to calculate score of a patient based on patient's physiological measurements. These measurements are taken against following observations;

1. Air / Oxygen saturation
1. Alert / level of consciousness or
1. Respiration rate
1. SpO2 (%)
1. Temperature

### Bonus

1. Raising a flag if score raised by 2 in 24 hours
1. Capillary Blood Glucose

## Developemt Process

I created react application to develop this function because I also wanted to develop front end for this. I also setup [jest](https://jestjs.io/) for testing purpose to make this function robust. My approach was to create a function that take observations as an object and then calculate the score of each individual observation object property. Finally add the scores to get the total of all. Following helper functions are created in connection to the main **mediScoreCalculation** function;

1. getAirOrOxygenScore
1. getConsciousnessScore
1. getRespirationRangeScore
1. getSpO2Score
1. getTemperatureScore
1. alertChecker
1. getCBGScore

## Testing

I followed test driven development approach and wrote comprehensive test scenarios for all functions. For testing **_getAirOrOxygenScore_**, **_getConsciousnessScore_**, **_getRespirationRangeScore_**, **_getSpO2Score_** and **_getTemperatureScore_** functions I called the main **mediScoreCalculation** and passed **_observation_** object with different values to test the outcome as per table below. Please note ranges are inclusive.

|           Property            | Score 3 | Score 2 |  Score 1  |        Score 0        |     Score 1     |     Score 2     |    Score 3    |
| :---------------------------: | :-----: | :-----: | :-------: | :-------------------: | :-------------: | :-------------: | :-----------: |
|      1112Air or oxygen?       |         | Oxygen  |           |          Air          |                 |                 |               |
|         Consciousness         |         |         |           |         Alert         |                 |                 |     CVPU      |
| Respiration rate (per minute) |   ≤8    |         |   9–11    |         12–20         |                 |      21–24      |               |
|           SpO2 (%)            |   ≤83   |  84–85  |   86–87   | 88–92 (or ≥93 on air) | 93–94 on oxygen | 95–96 on oxygen | ≥97 on oxygen |
|       Temperature (°C)        |  ≤35.0  |         | 35.1–36.0 |       36.1–38.0       |    38.1–39.0    |      ≥39.1      |               |

Apart from testing individual helper functions I tested the **mediScoreCalculation** function with following input observations;

#### Patient 1 - No alert

```
{
    airOrOxygen: AirOrOxygen.AIR,
    consciousness: Consciousness.ALERT,
    respirationRange: 15,
    spO2: 95,
    temperature: 37.1,
};
```

**Total Medi Score = 0**

#### Patient 2 - Flag an alert

```
{
    airOrOxygen: AirOrOxygen.OXYGEN,
    consciousness: Consciousness.ALERT,
    respirationRange: 17,
    spO2: 95,
    temperature: 37.1,
};
```

**Total Medi Score = 4**

#### Patient 3 - Flag an alert

```
{
    airOrOxygen: AirOrOxygen.OXYGEN,
      consciousness: Consciousness.CVPU,
      respirationRange: 23,
      spO2: 88,
      temperature: 38.5,
};
```

**_Please note there is a typo in patient 3 observations in the project README as CVPU score is 3 not 1._**
**Total Medi Score = 8**

#### Patient 4 - Flag an alert

```
{
    airOrOxygen: AirOrOxygen.OXYGEN,
      consciousness: Consciousness.CVPU,
      respirationRange: 5,
      spO2: 98,
      temperature: 35.0,
};
```

**Total Medi Score = 14**

#### Patient 5 - Flag an alert

```
{
    airOrOxygen: AirOrOxygen.OXYGEN,
      consciousness: Consciousness.ALERT,
      respirationRange: 17,
      spO2: 95,
      temperature: 37.1,
      isFasting: false,
      cbg: 7.9,
};
```

**Total Medi Score = 6**

#### Patient 6 - Flag an alert

```
{
    airOrOxygen: AirOrOxygen.OXYGEN,
      consciousness: Consciousness.ALERT,
      respirationRange: 17,
      spO2: 95,
      temperature: 37.1,
      isFasting: true,
      cbg: 7.9,
};
```

**Total Medi Score = 7**

## Bonus Flagging an Alert

To develop this function I created mock data which is an array and contains objects of medi score with time and id. I also assumed that this mock data is associdated to the current patient and this array contains data for only last 24 hours. This function is taking medi score and the test data array as parameters and compare the total medi score against the previous readings taken within 24 hours and if the score is raised by 2 in the current reading, the function will return true and a message will be rendered.

## Bonus CBG

**_Please note there is a typo in CBG (2 hours affter eating) first element as looking at others it appears that it should be 4.4 not 4.5._**
To implement this functionality I added **_isFasting_** and **_cbg_** in the observations object. Since this functionality is implemented at the end so I created a seperated test suite for **_getCBGScore_** function.
**Please note isFasting and cbg are optional fields**.

## Front End

Apart from adding tests for the functions I also developed the front end so user can test the functionality manually. I developed the front end in [react js](https://react.dev/) and used [tailwindcss](https://tailwindcss.com/docs/position) for styling. Air / Oxygen and Alert / CVPU are dropdowns and other fields are simple input fields. If user tries to get score without passing any input then relevant error message is rendered for user to assist and make corrections.

## Technologies Used

- [Ract JS](https://react.dev/)
- [Jest](https://jestjs.io/)
- [Vite JS](https://vitejs.dev/)
  Vite is powerfull tool to create react app and and comes recommended by the [Ract docs](https://react.dev/learn/start-a-new-react-project#can-i-use-react-without-a-framework) which is why I am using it.
- [Tailwindcss](https://tailwindcss.com/)
  I used tailwindcss instead of raw css because using tailwindcss make less code to write and makes development quick.

## Local Deployment

Please follow these steps to run this project locally on your machine;

1. Go to [GitHub repository](https://github.com/sohailshams/medi-score-calculation), first fork it and clone to your local machine.
2. Now run **npm install**
3. Now run **npm run dev**

### Running Tests

Go to the project directory and run **npm run test** command.
