import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Form, Modal } from 'react-bootstrap';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../store/productsSlice';
import { fetchCompositionsByProduct, createComposition, deleteComposition } from '../store/compositionsSlice';
import { fetchRawMaterials } from '../store/rawMaterialsSlice';

function ProductsPage() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.list);
  const compositions = useSelector(state => state.compositions.list);
  const rawMaterials = useSelector(state => state.rawMaterials.list);

  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', value: '' });
  
  const [showComp, setShowComp] = useState(false);
  const [selectedProd, setSelectedProd] = useState(null);
  const [compForm, setCompForm] = useState({ rawMaterialId: '', quantityRequired: '' });

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchRawMaterials());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      dispatch(updateProduct({ id: editing.id, data: form }));
    } else {
      dispatch(createProduct(form));
    }
    setShow(false);
    setEditing(null);
    setForm({ name: '', value: '' });
  };

  const handleEdit = (p) => {
    setEditing(p);
    setForm({ name: p.name, value: p.value });
    setShow(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete?')) dispatch(deleteProduct(id));
  };

  const handleManageComp = (p) => {
    setSelectedProd(p);
    dispatch(fetchCompositionsByProduct(p.id));
    setShowComp(true);
  };

  const handleAddComp = (e) => {
    e.preventDefault();
    dispatch(createComposition({
      productId: selectedProd.id,
      rawMaterialId: parseInt(compForm.rawMaterialId),
      quantityRequired: parseFloat(compForm.quantityRequired)
    }));
    setCompForm({ rawMaterialId: '', quantityRequired: '' });
  };

  return (
    <>
      <div className="page-header">
        <h2>Products</h2>
        <Button onClick={() => setShow(true)}>+ New</Button>
      </div>

      <div className="card-table">
        <Table hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>${p.value}</td>
                <td>
                  <Button size="sm" variant="info" onClick={() => handleManageComp(p)} className="me-1">Comp</Button>
                  <Button size="sm" variant="warning" onClick={() => handleEdit(p)} className="me-1">Edit</Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(p.id)}>Del</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? 'Edit' : 'New'} Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Value</Form.Label>
              <Form.Control type="number" step="0.01" value={form.value} onChange={e => setForm({...form, value: e.target.value})} required />
            </Form.Group>
            <Button type="submit">Save</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showComp} onHide={() => setShowComp(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Compositions - {selectedProd?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddComp} className="mb-3">
            <div className="d-flex gap-2">
              <Form.Select value={compForm.rawMaterialId} onChange={e => setCompForm({...compForm, rawMaterialId: e.target.value})} required>
                <option value="">Select</option>
                {rawMaterials.map(rm => <option key={rm.id} value={rm.id}>{rm.name}</option>)}
              </Form.Select>
              <Form.Control type="number" step="0.01" placeholder="Qty" value={compForm.quantityRequired} onChange={e => setCompForm({...compForm, quantityRequired: e.target.value})} required />
              <Button type="submit">Add</Button>
            </div>
          </Form>

          <Table striped size="sm">
            <thead>
              <tr>
                <th>Raw Material</th>
                <th>Qty</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {compositions.map(c => (
                <tr key={c.id}>
                  <td>{c.rawMaterialName}</td>
                  <td>{c.quantityRequired}</td>
                  <td><Button size="sm" variant="danger" onClick={() => dispatch(deleteComposition(c.id))}>Del</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProductsPage;
