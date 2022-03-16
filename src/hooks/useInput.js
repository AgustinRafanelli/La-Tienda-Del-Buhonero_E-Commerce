import { useState } from 'react';

function useInput(name, preValue = "") {
  const [value, setValue] = useState(preValue);

  const handleChange = e => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return { name, value, handleChange, reset };
}

export default useInput;
