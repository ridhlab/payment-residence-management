import React from "react";

export const useFetchDropdownSearch = () => {
    const [searchValue, setSearchValue] = React.useState("");
    const [selectOptions, setSelectOptions] = React.useState([]);

    return { searchValue, setSearchValue, selectOptions, setSelectOptions };
};
