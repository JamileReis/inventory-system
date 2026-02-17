import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Form, Modal } from 'react-bootstrap';
import { fetchRawMaterials, createRawMaterial, updateRawMaterial, deleteRawMaterial } from '../store/rawMaterialsSlice';

function RawMaterialsPage() {
  const dispatch = useDispatch();
  const rawMaterials = useSelector(state => state.rawMaterials.list);

  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', stockQuantity: '' });

  useEffect(() => {
    dispatch(fetchRawMaterials());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      dispatch(updateRawMaterial({ id: editing.id, data: form }));
    } else {
      dispatch(createRawMaterial(form));
    }
    setShow(false);
    setEditing(null);
    setForm({ name: '', stockQuantity: '' });
  };

  const handleEdit = (rm) => {
    setEditing(rm);
    setForm({ name: rm.name, stockQuantity: rm.stockQuantity });
    setShow(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete?')) dispatch(deleteRawMaterial(id));
  };

  return (
    <>
      <div className="page-header">
        <h2>Raw Materials</h2>
        <Button onClick={() => setShow(true)}>+ New</Button>
      </div>

      <div className="card-table">
        <Table hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rawMaterials.map(rm => (
              <tr key={rm.id}>
                <td>{rm.id}</td>
                <td>{rm.name}</td>
                <td>{rm.stockQuantity}</td>
                <td>
                  <Button size="sm" variant="warning" onClick={() => handleEdit(rm)} className="me-1">Edit</Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(rm.id)}>Del</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? 'Edit' : 'New'} Raw Material</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock Quantity</Form.Label>
              <Form.Control type="number" step="0.01" value={form.stockQuantity} onChange={e => setForm({...form, stockQuantity: e.target.value})} required />
            </Form.Group>
            <Button type="submit">Save</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RawMaterialsPage;
