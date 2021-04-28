import React from 'react';
import classNames from 'classnames';
import {useSelector, useDispatch} from 'react-redux';
import {
  showAlert,
  selectAlert,
} from './alertSlice';

export default function Alert() {
  const alert = useSelector(selectAlert);

  if (alert.isHidden) {
    return null;
  } else {
    const alertClasses = classNames('alert', [`alert-${alert.type}`]);

    return (
      <div className={alertClasses} role="alert">
        <div className="row">
          <div className="col-11 px-0 px-sm-1">
            <strong>{alert.title}</strong>
          </div>
          <div className="col-1 px-0 px-sm-1">
            <button type="button" className="close" aria-label="Close" data-dismiss="alert">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-12 px-0 px-sm-1">
            {alert.text}
          </div>
        </div>
      </div>
    );
  }
}
