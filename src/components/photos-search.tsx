import InputText from "./input-text";
import SearchIcon from "../assets/icons/search.svg?react";
import { useState, useCallback } from "react";
import { debounce } from "../helpers/utils";
import usePhotos from "../contexts/photos/hooks/use-photos";

// Create the debounced function outside the component
const debouncedSearch = debounce((func) => func(), 500);

const PhotosSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const debouncedSetValue = useCallback(debouncedSearch, []);
  const { filters } = usePhotos();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    debouncedSetValue(filters.setQ(value));
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
