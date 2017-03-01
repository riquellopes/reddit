import React, { Component, PropTypes } from 'react'

class Picker extends Component {
  render() {
    const { value, onChange, options } = this.props

    return (
      <div>
        <h1 className="title is-1 has-text-centered" style={{'text-transform': 'capitalize'}}>{value}</h1>
        <p className="control">
            <span className="select is-large">
                <select onChange={e => onChange(e.target.value)}
                        value={value}>
                  {options.map(option =>
                    <option value={option} key={option}>
                      {option}
                    </option>)
                  }
                </select>
            </span>
        </p>
      </div>
    )
  }
}

Picker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Picker;
