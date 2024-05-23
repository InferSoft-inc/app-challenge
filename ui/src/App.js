import React, { useState } from 'react';
import { Button, Input, Form, FormGroup, Label, Card, CardBody, CardTitle, Container, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';  // Assuming you have the logo imported

function App() {
  const [files, setFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState("");

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleUpload = () => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files`, file);  // Ensure files are appended correctly
    });

    fetch('http://127.0.0.1:8000/inferSoft/fileUpload', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log('Files uploaded successfully:', data);
        setFiles([])
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
        setSearchResults(data.message);  // Assuming data.message is an array of results
      })
      .catch(error => {
        console.error('Error during search:', error);
      });
  };

  return (
    <div className="App" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <header className="App-header">
        <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <Card style={{ width: '100%', maxWidth: '400px' }}>
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
              </Form>
            </CardBody>
          </Card>

          <Card style={{ width: '100%', maxWidth: '400px' }}>
            <CardBody>
              <CardTitle tag="h5">Search</CardTitle>
              <Form inline onSubmit={handleSearch}>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Label for="search" className="mr-sm-2">Search</Label>
                  <Input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </FormGroup>
                <br/>
                <Button type="submit" color="primary">Search</Button>
              </Form>
            </CardBody>
          </Card>

          {searchResults && (
            <Card style={{ width: '100%', maxWidth: '400px' }}>
              <CardBody>
                <CardTitle tag="h5">Search Results</CardTitle>
                <p>{searchResults}</p>
              </CardBody>
            </Card>
          )}
        </Container>
      </header>
    </div>
  );
}

export default App;
