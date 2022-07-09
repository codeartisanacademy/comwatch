import React, {useState, useEffect} from 'react'
import {collection, query, addDoc, Timestamp, onSnapshot, orderBy, updateDoc, deleteDoc, doc} from 'firebase/firestore';
import { db } from '../firebase';
import { map } from '@firebase/util';
import {Button, Modal, Form} from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';

function Home() {
  const [reports, setReports] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
      toast.success("Successfully updated", {position: 'bottom-center',});
    } catch (error) {
      //alert(error);
      toast.error("An error has occured");
    }finally{
      setDescription("");
    }
  }

  const handleDelete = async ()=>{
    const reportRef = doc(db, 'reports', selectedReport?.id)
    try {
      await deleteDoc(reportRef);
      setShowDeleteModal(!showDeleteModal);
      toast.success("Successfully deleted", {position: 'bottom-center',});
    } catch (error) {
      toast.error("An error has occured");
    }
  }

  const handleUpdateMode = (report)=>{
    setSelectedReport(report);
    setShowEditModal(!showEditModal);
    setDescription(report.data.description);
  }

  const handleDeleteMode = (report)=>{
    setSelectedReport(report);
    setShowDeleteModal(!showDeleteModal);
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
      <Toaster />
      <div className="text-end mt-4">
        <Button onClick={()=>setShowAddModal(true)}>Add New Report</Button>
      </div>
      <h1>Home {reports.length}</h1>
      {
        reports.map((report)=>{
          return(
            <p key={report.id}>{report.data.description} - <a href="#" onClick={()=>handleUpdateMode(report)}>Edit</a> - <a href="#" onClick={()=>handleDeleteMode(report)}>Delete</a> </p>
          )
          
        })
      }
      <Modal show={showDeleteModal} onHide={()=>setShowDeleteModal(!showDeleteModal)}>
        <Modal.Header>
          <Modal.Title>Delete report - {selectedReport?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You are about to delete the following report</p>
          <p>{selectedReport?.data.description}</p>
          <div>
          <Button variant="danger" className="mt-4" onClick={handleDelete}>
                Delete
              </Button>
          </div>
        </Modal.Body>
      </Modal>
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