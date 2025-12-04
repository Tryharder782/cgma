import React from 'react';

const Input = ({type,text, setText}) => {
   return (
      <div className='inputComponent'>
         <input className='inputBox' type={type} value={text} onChange={e => setText(e.target.value)} />
      </div>
   );
};

export default Input;