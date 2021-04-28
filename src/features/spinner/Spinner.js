import React from 'react';
import classNames from 'classnames';
import {useSelector, useDispatch} from 'react-redux';
import {
  showSpinner,
  hideSpinner,
  selectSpinner,
} from './spinnerSlice';

export default function Spinner() {
  const spinner = useSelector(selectSpinner);

  const spinnerClasses = classNames('spinner-border', 'spinner-border-sm');
  const spinnerWrapClasses = classNames('text-center', {
    'visible': !spinner.isHidden,
    'invisible': spinner.isHidden,
  });

  return (
    <div className={spinnerWrapClasses}>
      <div className={spinnerClasses} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
