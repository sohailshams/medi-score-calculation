import { useState } from "react";
import ObservationDropdown from "./ObservationDropdown";
import ObservationInput from "./ObservationInput";
import { mediScoreCalculation } from "../../medi-score/mediScore";
import { AirOrOxygen, Consciousness } from "../../medi-score/Enums";
import "./CustomCss.css";

function ObservationsForm() {
  const [AODropDownTitle, setAODropDownTitle] = useState("Chose One Value");
  const [ACDropDownTitle, setACDropDownTitle] = useState("Chose One Value");
  const [patientObservations, setPatientObservations] = useState({
    airOrOxygen: "",
    consciousness: "",
    respirationRange: "",
    spO2: "",
    temperature: "",
  });
  const [scoreOrMsg, setScoreOrMsg] = useState("");

  const handleDropDownChange = (e) => {
    if (e.target.value === "AIR") {
      //   setAODropDownValue(e.target.value);
      setPatientObservations({
        ...patientObservations,
        [e.target.name]: AirOrOxygen.AIR,
      });
      setAODropDownTitle(e.target.value);
    }
    if (e.target.value === "OXYGEN") {
      //   setAODropDownValue(e.target.value);
      setPatientObservations({
        ...patientObservations,
        [e.target.name]: AirOrOxygen.OXYGEN,
      });
      setAODropDownTitle(e.target.value);
    }
    if (e.target.value === "ALERT") {
      //   setACDropDownValue(e.target.value);
      setPatientObservations({
        ...patientObservations,
        [e.target.name]: Consciousness.ALERT,
      });
      setACDropDownTitle(e.target.value);
    }
    if (e.target.value === "CVPU") {
      //   setACDropDownValue(e.target.value);
      setPatientObservations({
        ...patientObservations,
        [e.target.name]: Consciousness.CVPU,
      });
      setACDropDownTitle(e.target.value);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === "respirationRange") {
      setPatientObservations({
        ...patientObservations,
        [e.target.name]: e.target.value,
      });
    }
    if (e.target.name === "spO2") {
      setPatientObservations({
        ...patientObservations,
        [e.target.name]: e.target.value,
      });
    }
    if (e.target.name === "temperature") {
      setPatientObservations({
        ...patientObservations,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Converting string values to number
    Object.keys(patientObservations).forEach((el) => {
      if (
        (el === "respirationRange" &&
          patientObservations["respirationRange"] != "") ||
        (el === "spO2" && patientObservations["spO2"] != "") ||
        (el === "temperature" && patientObservations["temperature"] != "")
      ) {
        patientObservations[el] *= 1;
      }
    });

    // Get medi score
    const result = mediScoreCalculation(patientObservations);
    setScoreOrMsg(result);

    // Re-setting input fields values
    if (typeof result === "number") {
      setPatientObservations({
        airOrOxygen: "",
        consciousness: "",
        respirationRange: "",
        spO2: "",
        temperature: "",
      });
      setAODropDownTitle("Chose One Value");
      setACDropDownTitle("Chose One Value");
    }
  };

  return (
    <div className="flex justify-center items-center h-[600px]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-3 mt-10 border-2 p-20 shadow-xl"
      >
        <ObservationDropdown
          label="AIR or OXYGEN:"
          name="airOrOxygen"
          optionOne="AIR"
          optionTwo="OXYGEN"
          dropDownValue={AODropDownTitle}
          handleDropDownChange={handleDropDownChange}
        />
        <ObservationDropdown
          label="ALERT or CVPU:"
          name="consciousness"
          optionOne="ALERT"
          optionTwo="CVPU"
          dropDownValue={ACDropDownTitle}
          handleDropDownChange={handleDropDownChange}
        />
        <ObservationInput
          label="Respiration rate (per minute):"
          inputType="number"
          name="respirationRange"
          placeholder="Respiration rate"
          value={patientObservations.respirationRange}
          handleInputChange={handleInputChange}
          id={"respirationRange"}
        />
        <ObservationInput
          label="SpO2 (%):"
          inputType="number"
          name="spO2"
          placeholder="SpO2 (%)"
          value={patientObservations.spO2}
          handleInputChange={handleInputChange}
          id={"spO2"}
        />
        <ObservationInput
          label="Temperature (°C):"
          inputType="number"
          name="temperature"
          placeholder="37.1"
          value={patientObservations.temperature}
          handleInputChange={handleInputChange}
          id={"temperature"}
        />

        <input
          className="py-1 text-white bg-[#251430] w-[400px]"
          type="submit"
          value="Get Medi Score"
        />
        <h1 className="text-center text-red-900 font-extrabold text-lg">
          {scoreOrMsg}
        </h1>
      </form>
    </div>
  );
}

export default ObservationsForm;
