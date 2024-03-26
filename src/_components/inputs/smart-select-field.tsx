"use client";
import React from "react";
import { Props } from "react-select";
import AsyncCreatableSelect from "react-select/async-creatable";
const sampleOptions = [
  {
    label: "Great Hotel",
    value: "Great Hotel",
  },
  {
    label: "Great Htel",
    value: "Great Htel",
  },
  {
    label: " Hotel",
    value: " Hotel",
  },
  {
    label: "Great ",
    value: "Great ",
  },
];

type Optiontype = { label: string; value: string };
const filterColors = (inputValue: string) => {
  return sampleOptions.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const mockpromiseOptions = (inputValue: string) =>
  new Promise<Optiontype[]>((resolve) => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

type CustomSelectSearchProps = Props & {
  promiseOptions: (inputValue: string) => Promise<Optiontype[]>;
  formatCreateLabel: (inputValue: string) => string;
  isCreateOptionEnabled?: boolean;
};

export const CustomSelectSearch = ({
  value,
  options = sampleOptions,
  isCreateOptionEnabled,

  promiseOptions = mockpromiseOptions,
  formatCreateLabel = (i) => `Créer "${i}" ?`,
  ...props
}: CustomSelectSearchProps) => {
  return (
    <AsyncCreatableSelect
      classNames={{
        input: () => "p-0",
        container: () => "  w-full max-w-prose",
        control: () => "  input input-bordered w-full pr-0",
        option: ({ isSelected, isFocused }) =>
          `w-full bg-base-100 max-w-prose cursor-pointer ${
            isFocused && !isSelected && "bg-secondary"
          } ${isSelected && "bg-primary"} `,
        menu: () => "w-full bg-base-100 max-w-prose ",
        // clearIndicator
        // dropdownIndicator
        // group
        // groupHeading
        //  indicatorsContainer: () => "p-0",
        // indicatorSeparator
        // loadingIndicator
        // loadingMessage
        // menuList
        // menuPortal
        // multiValue
        // multiValueLabel
        // multiValueRemove
        // noOptionsMessage
        // placeholder
        singleValue: () => "text-base-content",
        valueContainer: () => "p-0",
      }}
      // value={value}
      //   options={options}
      hideSelectedOptions={false}
      cacheOptions
      defaultOptions
      loadOptions={promiseOptions}
      formatCreateLabel={formatCreateLabel} //  onCreateOption={() => console.log("created")}
      {...props}
    />
  );
};
export default CustomSelectSearch;
