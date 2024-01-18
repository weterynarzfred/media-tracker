const selectStyles = {
  control: base => ({
    ...base,
    borderRadius: 0,
    outline: 'none',
    boxShadow: 'none',
    border: 'none',
    backgroundColor: '#333',
    color: '#eee',
    minHeight: 0,
  }),
  menu: base => ({
    ...base,
    backgroundColor: '#333',
    color: '#eee',
    margin: 0,
  }),
  menuList: base => ({
    ...base,
    padding: '2px',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? '#555' : '#333',
    color: '#eee',
    minHeight: 0,
    padding: 0,
  }),
  singleValue: base => ({
    ...base,
    backgroundColor: '#333',
    color: '#eee',
  }),
  valueContainer: base => ({
    ...base,
    padding: 0,
    backgroundColor: '#333',
    color: '#eee',
  }),
  dropdownIndicator: base => ({
    ...base,
    padding: 0,
  }),
  clearIndicator: base => ({
    ...base,
    padding: 0,
  }),
  placeholder: base => ({
    ...base,
    color: '#777',
  }),
  input: base => ({
    ...base,
    margin: 0,
    color: '#eee',
  }),
};

export default selectStyles;
