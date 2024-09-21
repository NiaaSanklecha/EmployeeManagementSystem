import React from "react";

const format = (text) => {
  return text != null ? text : "";
};

const unformat = (text) => {
  return text.trim().length === 0 ? null : text;
};
class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: format(props.value),
    };
  }

  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  onBlur = (e) => {
    const { onChange } = this.props;
    const { value } = this.state;
    onChange(e, unformat(value));
  };

  render() {
    const { value } = this.state;
    const { tag = "input", ...props } = this.props;
    return tag === "input" ? (
      <input
        {...props}
        value={value}
        onBlur={this.onBlur}
        onChange={this.onChange}
      />
    ) : (
      <textarea 
      {...props}
        value={value}
        onBlur={this.onBlur}
        onChange={this.onChange}/>
    );
    // return React.createElement(tag, {
    //   ...props,
    //   value,
    //   onBlur: this.onBlur,
    //   onChange: this.onChange,
    // });
  }
}

export default TextInput;
