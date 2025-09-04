import React, { useState, useRef, useEffect } from "react";

const classOptions = [
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11 Medical",
  "Class 11 NonMedical",
  "Class 11 Commerce",
  "Class 11 Arts",
  "Class 12 Medical",
  "Class 12 NonMedical",
  "Class 12 Commerce",
  "Class 12 Arts",
];

function ClassDropDown({ selected, setSelected }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const dropdownRef = useRef(null);

  const filteredOptions = classOptions.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    function handleOutsideClick(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
        setHighlightIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleKeyDown = (e) => {
    if (!isOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      setSelected(filteredOptions[highlightIndex]);
      setIsOpen(false);
      setSearchTerm("");
      setHighlightIndex(-1);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setSearchTerm("");
      setHighlightIndex(-1);
    }
  };

  return (
    <div
      className="class-dropdown"
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
    >
      <div
        className="class-dropdown__header"
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={`class-dropdown__selected ${selected === "Select by Class" ? "placeholder" : ""}`}>
          {selected}
        </span>
        <span className={`class-dropdown__arrow ${isOpen ? "open" : ""}`} />
      </div>
      {isOpen && (
        <div className="class-dropdown__menu">
          <input
            type="text"
            className="class-dropdown__search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setHighlightIndex(0);
            }}
            autoFocus
          />
          <ul className="class-dropdown__list" role="listbox" tabIndex={-1}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={option}
                  className={`class-dropdown__item ${option === selected ? "selected" : ""} ${highlightIndex === index ? "highlighted" : ""}`}
                  onClick={() => {
                    setSelected(option);
                    setIsOpen(false);
                    setSearchTerm("");
                    setHighlightIndex(-1);
                  }}
                  role="option"
                  aria-selected={option === selected}
                  tabIndex={0}
                  onMouseEnter={() => setHighlightIndex(index)}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="class-dropdown__item no-results">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ClassDropDown;
