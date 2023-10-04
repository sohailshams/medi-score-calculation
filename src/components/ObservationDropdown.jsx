function ObservationDropdown({
  label,
  name,
  optionOne,
  optionTwo,
  dropDownValue,
  handleDropDownChange,
}) {
  return (
    <div>
      <label htmlFor="dropDown">{label}</label>
      <select
        className="ml-8 w-[180px] py-2 bg-slate-200 border-[1px] border-[#251430] outline-none"
        onChange={handleDropDownChange}
        value={dropDownValue}
        id="dropDown"
        name={name}
      >
        <option className="invisible" value={dropDownValue} disabled>
          {dropDownValue}
        </option>
        <option value={optionOne}>{optionOne}</option>
        <option value={optionTwo}>{optionTwo}</option>
      </select>
    </div>
  );
}

export default ObservationDropdown;
