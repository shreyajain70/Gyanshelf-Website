import React, { useState, useRef, useEffect } from "react";

const boardOptions = [
  "HP Board",
  "CBSE",
  "ICSE",
  "ISC",
];

function BoardDropDown({ selected, setSelected }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const filteredOptions = boardOptions.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    function handleOutsideClick(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="board-dropdown" ref={dropdownRef}>
      <div
        className="board-dropdown__header"
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={`board-dropdown__selected ${selected === "Select by Board" ? "placeholder" : ""}`}>
          {selected}
        </span>
        <span className={`board-dropdown__arrow ${isOpen ? "open" : ""}`} />
      </div>
      {isOpen && (
        <div className="board-dropdown__menu">
          <input
            type="text"
            className="board-dropdown__search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          <ul className="board-dropdown__list" role="listbox" tabIndex={-1}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option}
                  className={`board-dropdown__item ${option === selected ? "selected" : ""}`}
                  onClick={() => {
                    setSelected(option);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                  role="option"
                  aria-selected={option === selected}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelected(option);
                      setIsOpen(false);
                      setSearchTerm("");
                    }
                  }}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="board-dropdown__item no-results">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BoardDropDown;
