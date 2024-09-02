import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../Style/File.css'
const File = ( {fileName,onRemove }) => {

    const cancelfile=()=>{
       onRemove(fileName)
    }
  return (
    <div className="file-item">
    <div className="file-icon">
        <FontAwesomeIcon icon={faFilePdf} className="pdf-icon" />
    </div>
    <div className="file-details">
        <div className="file-info">
            <span className="file-name">{fileName}</span>
        </div>
        
    </div>
    <div className="file-remove" onClick={cancelfile}>
        <FontAwesomeIcon icon={faTimes} />
    </div>
</div>
  )
}

export default File