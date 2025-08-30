import InputText from "./input-text";
import SearchIcon from "../assets/icons/search.svg?react";
import { useState, useCallback } from "react";
import { debounce } from "../helpers/utils";

// Create the debounced function outside the component
const debouncedSearch = debounce(
  (value: string) => console.log(`Pesquisa com debounce ${value}`),
  200
);

const PhotosSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const debouncedSetValue = useCallback(debouncedSearch, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    debouncedSetValue(value);
    setInputValue(value);
  };

  return (
    <div className="flex-1">
      <InputText
        value={inputValue}
        icon={SearchIcon}
        onChange={handleInputChange}
        placeholder="Pesquisar fotos"
      />
    </div>
  );
};
export default PhotosSearch;
