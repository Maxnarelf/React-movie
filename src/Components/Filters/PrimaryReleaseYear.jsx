import React from "react";
import PropTypes from "prop-types";
import UISelect from "../UIComponents/UISelect";


export default class PrimaryReleaseYear extends React.PureComponent {
  static propTypes = {
    primary_release_year: PropTypes.string.isRequired,
    onChangeFilters: PropTypes.func.isRequired
  };

  static defaultProps = {
    options: [
        ...Array.from(
            {length: Number(new Date().getFullYear()) - 1950 + 1},
            (_, item) => {
              const year = 1950 + item;
              return {
                label: `${year}`,
                value: `${year}`
              }
            }
          )
    ].reverse()
  };
  
 
  render() {
    const { primary_release_year, onChangeFilters, options } = this.props;
    console.log("PrimaryReleaseYear render");
    return (
      <UISelect
        id="primary_release_year"
        name="primary_release_year"
        value={primary_release_year}
        onChange={onChangeFilters}
        labelText="Год релиза:"
        className="year"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </UISelect>
    );
  }
}