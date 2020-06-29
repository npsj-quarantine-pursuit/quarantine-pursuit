import React from 'react';
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const LoadingAnimation = () => {
    return (
        <div className="loading-container">
            <FontAwesomeIcon icon={faSync} aria-hidden="true" />
        </div>
    )
}
export default LoadingAnimation