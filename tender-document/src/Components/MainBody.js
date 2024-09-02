import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../Style/MainBody.css'
import File from './File';
import { Row, Spinner } from 'reactstrap';

const MainBody = () => {

    const [haveDocuments, setHaveDocuments] = useState(false);
    const [documents, setDocuments] = useState([]);
    const test = [12, 3, 4]
    const [inProcessing, setInProcessing] = useState(false)

    const onDrop = useCallback((acceptedFiles) => {

        setDocuments(prevFileArray => [...prevFileArray, ...acceptedFiles])
        setHaveDocuments(true);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'application/pdf', // Restrict to PDF files
    });

    const onSendDocumnet = async () => {
        setInProcessing(true)
        const formData = new FormData();

        Array.from(documents).forEach((file, index) => {
            formData.append(`file${index}`, file);  // Append each file to FormData
        });




        try {
            const response = await axios.post('http://localhost:5000/process', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                responseType: 'blob', // Ensure response is treated as a Blob
            });

            // Handle the response to download the file
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'generated_file.pdf'); // Set the file name
            document.body.appendChild(link);
            link.click();
            link.remove(); // Clean up and remove the link
            setInProcessing(false)
            setDocuments([])
            setHaveDocuments(false)


        } catch (err) {
            console.error('Error occurred:', err);
        }
    }



    const removeDocument = (data) => {
        const temp = documents.filter(document => document.name !== data);
        setDocuments(temp);

        if (documents.length === 1) {
            console.log('checked')
            setHaveDocuments(false)
        }

    }

    return (
        <div className='main-container'>

            {inProcessing && <div className='spinner'>
                <Spinner
                    color="secondary"
                    style={{
                        height: '3rem',
                        width: '3rem',
                       
                    }}
                >
                    Loading...
                </Spinner>
                <Spinner
                   
                    style={{
                        height: '3rem',
                        width: '3rem',
                       
                    }}
                    type="grow"
                    color="warning"
                >
                    Loading...
                </Spinner>
            </div>}
            {!inProcessing &&
                <div className='temp-container'>


                    <Row className='drag-and-drop-container'
                    >
                        {!haveDocuments &&
                            <Row className='drag-and-drop-box'>
                                <div {...getRootProps()} className='drag-and-drop' style={{
                                    backgroundColor: isDragActive ? '#e0e0e0' : '#f9f9f9',

                                }}>
                                    <input {...getInputProps()} />
                                    <div style={{ textAlign: 'center', padding: '20px' }}>
                                        <FontAwesomeIcon icon={faCloudArrowUp} size="8x" style={{ color: '#FFDE05' }} className='upload-font' />
                                    </div>
                                    <div className='text'>
                                        {
                                            isDragActive ?

                                                <p>Drop the files here ...</p> :
                                                <h3>Drag '&' drop some files here, or click to select files</h3>
                                        }
                                    </div>
                                </div>

                            </Row>
                        }
                        {haveDocuments &&
                            <Row className='drag-and-drop-box2'>
                                <div {...getRootProps()} className='drag-and-drop2' style={{
                                    backgroundColor: isDragActive ? '#e0e0e0' : '#f9f9f9',

                                }}>
                                    <input {...getInputProps()} />
                                    <div style={{ textAlign: 'center', padding: '20px' }}>
                                        <FontAwesomeIcon icon={faCloudArrowUp} size="8x" style={{ color: '#FFDE05' }} />
                                    </div>


                                </div>
                                <div className='doc-container'>
                                    {

                                        documents.map((document, index) => (

                                            <File
                                                key={index}
                                                fileName={document.name}
                                                onRemove={removeDocument}></File>
                                        ))
                                    }
                                </div>
                                <div className='button-container'>
                                    <button className='main-button' onClick={onSendDocumnet}>Process document</button>
                                </div>


                            </Row>


                        }







                    </Row>
                </div>
            }
        </div>
    )
}

export default MainBody;