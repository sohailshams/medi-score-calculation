export function alertChecker(mediScore, mediScoreData) {
  let flagUp = false;
  mediScoreData.forEach((el) => {
    //  Check if current score is > 2
    // assuming mediScoreData only contains last 24 hours readings
    if (mediScore - el.mediScore > 2) {
      // return [true, "This patient needs urgent attention!"];
      flagUp = true;
    }
  });
  return flagUp;
}
