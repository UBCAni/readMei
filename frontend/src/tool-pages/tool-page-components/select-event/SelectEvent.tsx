import {useState , ReactElement } from "react";

const EventSelecter = (props: any): ReactElement => {
    const [dataSetId, setDatasetId] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [showError, setShowError] = useState(false);
    const [options] = useState(['Hanami','Hanami-2022','Hanami-2023','Hanami-2024', 'Halloween', 'Christmas Party']);

    const handleChange = (event: any) => {
        setDatasetId(event.target.value);
      };

    const handleSelectOption = (option: any) => {
        setDatasetId(option);
        setShowDropdown(false);
    };    
    
    const processSubmit = () => {
        // validation
        // if not included in list, then do nothing and return error
        if (!options.includes(dataSetId)) {
            setShowError(true);
            return;
        } else {
            setShowError(false);
        }

        
    }

    return (<>
    <div >
      <input
        className="w-100"
        type="text"
        value={dataSetId}
        onChange={handleChange}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
      />
      {showDropdown && (
        <div style={{ border: '1px solid #ccc', width: "100%"}} className="">
          {options.filter(item => item.includes(dataSetId)).map((option, index) => (
            <div key={index} onClick={() => handleSelectOption(option)}>
              {option}
            </div>
          ))}
        </div>
      )}
      <button type="submit" onClick = {processSubmit} className="btn btn-lg text-white background-blue mt-4 w-100">Manage Event Data</button>
      {showError && <h6 className="text-center text-danger">Invalid Dataset name!</h6>}
    </div>
    </>);
}


export default EventSelecter;