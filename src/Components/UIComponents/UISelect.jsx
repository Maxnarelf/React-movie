import React from "react";
import PropTypes from "prop-types";
import '../../Styles/selection.css';

export default class UISelect extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };



  render() {
    const { id, name, value, onChange, labelText, children } = this.props;
    console.log("UISelect render");
    return (
      <div className="year_block">
        <label  className="year" htmlFor={id}>{labelText}</label>
        <select
          id={id}
          className="sel_style"
          name={name}
          value={value}
          onChange={onChange}
        >
          {children}
        </select>
      </div>
    );
  }
}