import { useState } from 'react';

function useInput(name) {
  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return { name, value, handleChange, reset };
}

export default useInput;
