import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./SearchBar.module.css";

type SuggestionsProps = {
  searchText: string;
  inFocus: boolean;
  GenericSuggestions?: JSX.Element | null;
  SpecificSuggestions?: JSX.Element | null;
};

function Suggestions<T>(props: SuggestionsProps): JSX.Element | null {
  if (!props.inFocus) {
    return null;
  }

  if (props.searchText.length < 1) {
    return props.GenericSuggestions ? (
      <div className={styles.SuggestionsContainer}>
        {props.GenericSuggestions}
      </div>
    ) : null;
  }

  return props.SpecificSuggestions ? (
    <div className={styles.SuggestionsContainer}>
      {props.SpecificSuggestions}
    </div>
  ) : null;
}

function ClearButton(props: {
  isActive: boolean;
  onClick?: () => void;
}): JSX.Element {
  if (!props.isActive) return <div className={styles.SearchButtonDummy}></div>;
  return (
    <div className={styles.SearchButton}>
      <FontAwesomeIcon
        icon="times"
        size="lg"
        onClick={props.onClick}
        className={styles.SearchIcon}
      />
    </div>
  );
}

function SearchButton(props: { onClick?: () => void }): JSX.Element {
  return (
    <div className={styles.SearchButton}>
      <FontAwesomeIcon
        icon="search"
        size="lg"
        className={styles.SearchIcon}
        onClick={props.onClick}
      />
    </div>
  );
}

type SearchInputProps = {
  input: string;
  inFocus: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onSearchButton: () => void;
  onClearButton: () => void;
  onFocus: () => void;
  onBlur: () => void;
};

function SearchInput(props: SearchInputProps) {
  const searchBarStyle = props.inFocus
    ? { borderColor: "rgb(142, 158, 142)" }
    : { borderColor: "transparent" };

  return (
    <div
      style={searchBarStyle}
      className={styles.SearchInputContainer}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
    >
      <input
        value={props.input}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
        className={styles.SearchInput}
      />
      <div className={styles.SearchButtonsContainer}>
        <ClearButton
          isActive={props.input.length > 0}
          onClick={props.onClearButton}
        />
        <SearchButton onClick={props.onSearchButton} />
      </div>
    </div>
  );
}

export type SearchBarProps = {
  input: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTriggerSearch: (input: string) => void;
  onClearInput: () => void;
  GenericSuggestions?: JSX.Element | null;
  SpecificSuggestions?: JSX.Element | null;
};

/**
 * Search bar with autosuggest features
 * @param props.input current search text
 * @param props.onChange callback of HTMLInputElement
 * @param props.onTriggerSearch callback of search trigger, takes input
 * @param props.onClearInput callback for clearing input
 * @param props.GenericSuggestions JSX to be shown when search bar in focus but no input
 * @param props.SpecificSuggestions JSX to be shown when search bar in focus with some input
 */
export default function SearchBar(props: SearchBarProps) {
  const [inFocus, setInFocus] = React.useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    props.onChange(e);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    setInFocus(true);
    if (e.key === "Enter") {
      props.onTriggerSearch(props.input);
      setInFocus(false);
    }
  }

  function handleSearchButton() {
    props.onTriggerSearch(props.input);
    setInFocus(false);
  }

  function handleClearButton() {
    props.onClearInput();
  }

  return (
    <div className={styles.SearchBar}>
      <SearchInput
        input={props.input}
        inFocus={inFocus}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onSearchButton={handleSearchButton}
        onClearButton={handleClearButton}
        onFocus={() => setInFocus(true)}
        onBlur={() => setInFocus(false)}
      />
      {inFocus ? <div className={styles.curtain}></div> : null}
      <Suggestions
        searchText={props.input}
        inFocus={inFocus}
        GenericSuggestions={props.GenericSuggestions}
        SpecificSuggestions={props.SpecificSuggestions}
      />
    </div>
  );
}
