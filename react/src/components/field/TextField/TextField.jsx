import React from 'react';

function TextField({ id, label, value, onChange }) {
  return (
    <div className="step">
      <h2 className="step__title title title--heading-2">{label}</h2>
      <input
        type="text"
        className="ui-input"
        value={value || ''}
        onChange={(e) => onChange(id, e.target.value)}
      />
    </div>
  );
}

export default TextField;