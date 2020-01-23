import React from 'react';
import { useSettingsCtx } from '../../context/useSettings/useSettingsCtx';
import txt from './translations';

import FileUpload from '../FileUpload/FileUpload';

const Fields = ({ handleFormChange, formCharge }) => {
  const { settingsStore } = useSettingsCtx();
  const { lang } = settingsStore;

  return (
    <>
      <div className='field'>
        <label>{txt.name[lang]}</label>
        <input
          type='text'
          name='name'
          onChange={handleFormChange}
          value={formCharge.name}
        />
      </div>

      <div className='field'>
        <label>{txt.totalAmount[lang]}</label>
        <input
          type='number'
          name='total'
          step='0.01'
          onChange={handleFormChange}
          value={formCharge.total}
        />
      </div>

      <div className='field'>
        <label>{txt.percentage[lang]}</label>
        <input
          type='number'
          name='percent'
          step='0.01'
          onChange={handleFormChange}
          value={formCharge.percent}
        />
      </div>

      <div className='field'>
        <label>{txt.date[lang]}</label>
        <input
          type='date'
          name='date'
          onChange={handleFormChange}
          value={formCharge.date}
        />
      </div>

      <FileUpload />
    </>
  );
};

export default Fields;
