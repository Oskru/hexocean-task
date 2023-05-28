// styles imports
import './messageBox.scss';

// font awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

/**
 * This is a component for rendering message box that shows the feedback
 * about the submit state whether it's an error or success.
 * @param {object} fetchData - the state of the form submission
 * @param {function} setFetchData - the function to set the state of the form submission
 * @returns The `MessageBox` component.
 */
function MessageBox({ fetchData, setFetchData }) {
  const { error, ok } = fetchData;

  const handleClose = () => {
    setFetchData({ error: '', ok: null });
  };

  if (error !== '') {
    return (
      <div className="messagebox messagebox--error">
        <div className="messagebox__title">
          <FontAwesomeIcon
            icon={faXmark}
            className="icon--close"
            onClick={handleClose}
          />
          An error has occurred
          <FontAwesomeIcon icon={faExclamation} className="icon--title" />
        </div>
        <div className="messagebox__body messagebox__body--error">
          {error instanceof Error ? (
            // client side errors
            <div>
              <span className="messagebox__error-name">{error.name}</span>:{' '}
              {error.message}
            </div>
          ) : (
            // server side (response) errors
            Object.keys(error).map((field) => (
              <div key={field} className="messagebox__error-position">
                <span className="messagebox__error-name">{field}</span>:{' '}
                {error[field]}
              </div>
            ))
          )}
        </div>
      </div>
    );
  } else if (ok) {
    return (
      <div className="messagebox messagebox--ok">
        <div className="messagebox__title">
          <FontAwesomeIcon
            icon={faXmark}
            className="icon--close"
            onClick={handleClose}
          />
          Success
          <FontAwesomeIcon icon={faCircleCheck} className="icon--title" />
        </div>
        <div className="messagebox__body">
          Your dish has been successfully submitted
        </div>
      </div>
    );
  }

  return null;
}

export default MessageBox;
