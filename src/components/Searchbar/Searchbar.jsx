import React from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { ImSearch } from 'react-icons/im';

import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import SelectMarks from '../SelectMarks/';

export default function Searchbar({
  onSubmit,
  onChangeSelect,
  totalPages,
  page,
  searchImageArray,
}) {
  return (
    <SearchbarHeader>
      <SearchForm onSubmit={(event) => onSubmit(event)}>
        <SearchFormInput
          type="text"
          name="searchQuery"
          autocomplete="off"
          autoFocus={true}
          placeholder="Search images and photos"
        />
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          <IconContext.Provider value={{ color: 'blue', size: 30 }}>
            <ImSearch />
          </IconContext.Provider>
        </SearchFormButton>
      </SearchForm>
      <SelectMarks onChange={(event) => onChangeSelect(event)} />
      {searchImageArray.length > 0 && (
        <p
          style={{ fontSize: 'xx-large', marginLeft: '10px' }}
        >{`page ${page} / ${totalPages}`}</p>
      )}
    </SearchbarHeader>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
};
