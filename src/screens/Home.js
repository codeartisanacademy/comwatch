import React, {useState, useEffect} from 'react'
import {collection, query, addDoc, Timestamp, onSnapshot, orderBy, updateDoc, doc} from 'firebase/firestore';
import { db } from '../firebase';
import { map } from '@firebase/util';
import {Button, Modal, Form} from 'react-bootstrap';

function Home() {
  const [reports, setReports] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [description, setDescription] = useState("");
  const [reporter, setReporter] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);

  const handleSubmit = async ()=>{
    try {
      if(description && reporter){
        await addDoc(collection(db, 'reports'), {
          description: description,
          reporter: reporter,
          solved: false,
          reportDate: Timestamp.now(),
        })
        setShowAddModal(false);
      }else{
        alert("Please enter description and reporter");
      }
      
    } catch (error) {
      alert(error);
    }
    finally{
      setDescription("");
      setReporter("");
    }
  }

  const handleUpdate = async ()=>{
    const reportRef = doc(db, 'reports', selectedReport?.id);
    try {
      await updateDoc(reportRef, {
        description: description
      })
      setShowEditModal(false);
    } catch (error) {
      alert(error);
    }finally{
      setDescription("");
    }
  }

  const handleUpdateMode = (report)=>{
    setSelectedReport(report);
    setShowEditModal(!showEditModal);
    setDescription(report.data.description);
  }

  const getReports = ()=>{
    const q = query(collection(db, 'reports'), orderBy("reportDate", "desc"));
    onSnapshot(q, (querySnapshot)=>{
        setReports(querySnapshot.docs.map(doc=> (
          {
            id : doc.id,
            data : doc.data()
          }
        ))
        )
    })
  }

  useEffect(() => {
    getReports();
  }, [])

  return (
    <>
      <div className="text-end mt-4">
        <Button onClick={()=>setShowAddModal(true)}>Add New Report</Button>
      </div>
      <h1>Home {reports.length}</h1>
      {
        reports.map((report)=>{
          return(
            <p key={report.id}>{report.data.description} - <a href="#" onClick={()=>handleUpdateMode(report)}>Edit</a> - <a href="#">Delete</a> </p>
          )
          
        })
      }
      <Modal show={showEditModal} onHide={()=>setShowEditModal(!showEditModal)}>
        <Modal.Header>
          <Modal.Title>Edit Report - ID {selectedReport?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" value={description}  onChange={(e)=>setDescription(e.target.value)}></Form.Control>
            </Form.Group>
            <Button variant="primary" className="mt-4" onClick={handleUpdate}>
                Submit
              </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={showAddModal} onHide={()=>setShowAddModal(!showAddModal)}>
        <Modal.Header>
          <Modal.Title>Add New Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>
                  Description
                </Form.Label>
                <Form.Control type="text" onChange={(e)=>setDescription(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Reporter
                </Form.Label>
                <Form.Control type="text" onChange={(e)=>setReporter(e.target.value)}></Form.Control>
              </Form.Group>
              <Button variant="primary" className="mt-4" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
        </Modal.Body>
      </Modal>
    </>
  )

}
export default Home;