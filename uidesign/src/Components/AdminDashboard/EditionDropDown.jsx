import React, { useState, useRef, useEffect } from "react";

const editionOptions = [
  "2025 Edition",
  "2024 Edition",
  "2023 Edition",
  "2022 Edition",
  "2021 Edition",
  "2020 Edition",
  "2019 Edition",
  "2018 Edition",
  "2017 Edition",
  "2016 Edition",
  "2015 Edition",
  "2014 Edition",
  "2013 Edition",
  "2012 Edition",
  "2011 Edition",
  "2010 Edition",
  "2009 Edition",
  "2008 Edition",
  "2007 Edition",
  "2006 Edition",
  "2005 Edition",
];

function EditionDropDown({ selected, setSelected }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const dropdownRef = useRef(null);

  const filteredOptions = editionOptions.filter(option =>
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
      className="edition-dropdown"
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
    >
      <div
        className="edition-dropdown__header"
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={`edition-dropdown__selected ${selected === "Select by Edition" ? "placeholder" : ""}`}>
          {selected}
        </span>
        <span className={`edition-dropdown__arrow ${isOpen ? "open" : ""}`} />
      </div>
      {isOpen && (
        <div className="edition-dropdown__menu">
          <input
            type="text"
            className="edition-dropdown__search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setHighlightIndex(0);
            }}
            autoFocus
          />
          <ul className="edition-dropdown__list" role="listbox" tabIndex={-1}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={option}
                  className={`edition-dropdown__item ${option === selected ? "selected" : ""} ${highlightIndex === index ? "highlighted" : ""}`}
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
              <li className="edition-dropdown__item no-results">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default EditionDropDown;
