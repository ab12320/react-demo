import React from 'react';

export default class UserAgreementModal extends React.Component {
  render() {
    return (
      <div className="modal fade" id="userAgreementModal" tabIndex="-1" role="dialog"
           aria-labelledby="userAgreementModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="userAgreementModalLabel">User Agreement</h5>
            </div>
            <div className="modal-body">
              Long text
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-info" data-dismiss="modal">I got it, close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

