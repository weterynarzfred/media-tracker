const selectStyles = {
  control: base => ({
    ...base,
    borderRadius: 0,
    outline: 'none',
    boxShadow: 'none',
    border: 'none',
    backgroundColor: 'var(--inputBackgroundColor)',
    color: '#eee',
    minHeight: 0,
    height: '100%',
    borderRadius: '5px',
  }),
  valueContainer: base => ({
    ...base,
    padding: 'var(--inputPadding)',
    color: '#eee',
    height: '100%',
  }),
  menu: base => ({
    ...base,
    backgroundColor: 'var(--inputBackgroundColor)',
    color: '#eee',
    margin: 0,
    border: '1px solid var(--inputBorderColor)',
    borderRadius: '5px',
  }),
  menuList: base => ({
    ...base,
    padding: 0,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? '#222' : 'transparent',
    color: '#eee',
    minHeight: 0,
    padding: '3px 5px',
    borderRadius: '5px',
    cursor: 'pointer',
  }),
  singleValue: base => ({
    ...base,
    color: '#eee',
    height: '100%',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  dropdownIndicator: base => ({
    ...base,
    padding: 0,
  }),
  indicatorSeparator: () => ({
    display: 'none',
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
    padding: 0,
    color: '#eee',
  }),
};

export default selectStyles;
