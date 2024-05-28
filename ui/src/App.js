import React, { useState } from 'react';
import { Button, Table, Input, Form, FormGroup, Label, Card, CardBody, CardTitle, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [files, setFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState('');
  const [modal, setModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const toggleModal = () => {
    setModal(!modal);
    if (!modal) {
      fetchUploadedFiles();
    }
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleUpload = () => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files`, file);
    });

    fetch('http://127.0.0.1:8000/inferSoft/fileUpload', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log('Files uploaded successfully:', data);
        setFiles([]);
      })
      .catch(error => {
        console.error('Error uploading files:', error);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const url = new URL('http://localhost:8000/inferSoft/search');
    url.searchParams.append('search_query', searchQuery);

    fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        setSearchResults(data.message);
      })
      .catch(error => {
        console.error('Error during search:', error);
      });
  };

  const fetchUploadedFiles = () => {
    fetch('http://127.0.0.1:8000/inferSoft/getUploadedFiles', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        setUploadedFiles(data.files);
      })
      .catch(error => {
        console.error('Error fetching uploaded files:', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <Container className="app-container">
          <Card className="card-component">
            <CardBody>
              <CardTitle tag="h5">Upload PDFs and Images</CardTitle>
              <Form>
                <FormGroup>
                  <Label for="fileUpload">Choose Files</Label>
                  <Input
                    type="file"
                    name="file"
                    id="fileUpload"
                    accept=".pdf,image/*"
                    multiple
                    onChange={handleFileChange}
                  />
                </FormGroup>
                {files.length > 0 && (
                  <div>
                    <h6>Files to be uploaded:</h6>
                    <ul>
                      {Array.from(files).map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                    <Button color="success" onClick={handleUpload}>Upload Files</Button>
                  </div>
                )}
                <br/>
                <Button color="info" onClick={toggleModal}>View all uploaded files</Button>
              </Form>
            </CardBody>
          </Card>

          <Card className="card-component">
            <CardBody>
              <CardTitle tag="h5">Search</CardTitle>
              <Form inline onSubmit={handleSearch}>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </FormGroup>
                <br />
                <Button type="submit" color="primary">Search</Button>
              </Form>
            </CardBody>
          </Card>

          {searchResults && (
            <Card className="card-component">
              <CardBody>
                <CardTitle tag="h5">Search Results</CardTitle>
                <p>{searchResults}</p>
              </CardBody>
            </Card>
          )}

          <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Uploaded Files</ModalHeader>
            <ModalBody>
              {uploadedFiles.length > 0 ? (
                <Table striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>File Name</th>
                      <th>File Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uploadedFiles.map((file, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{file.fileName}</td>
                        <td><a href={file.fileLink} target="_blank" rel="noopener noreferrer">View File</a></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>No files uploaded yet.</p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggleModal}>Close</Button>
            </ModalFooter>
          </Modal>
        </Container>
      </header>
    </div>
  );
}

export default App;
