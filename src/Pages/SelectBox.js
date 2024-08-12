import { useState } from "react";
import Select from "react-tailwindcss-select";

const options = [
    { value: "Service", label: "First Service" },
    { value: "Service2", label: "Second Service" },
    { value: "Service3", label: "Third Services" },
    { value: "Service4", label: "Fourth Services" },
    { value: "Service5", label: "Fifth Services" },
    { value: "Service6", label: "Sixth Services" },
    { value: "Service7", label: "Seventh Services" },

    
];

const SelectBox = () => {
    const [animal, setAnimal] = useState(null);

    const handleChange = value => {
        console.log("value:", value);
        setAnimal(value);
    };

    return (
        <Select
            value={animal}
            onChange={handleChange}
            options={options}
            className={('w-full')}
        />
    );
};

export default SelectBox;