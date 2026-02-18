import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Form, Modal } from 'react-bootstrap';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../store/productsSlice';
import {
  fetchCompositionsByProduct,
  createComposition,
  deleteComposition
} from '../store/compositionsSlice';
import { fetchRawMaterials } from '../store/rawMaterialsSlice';

function ProductsPage() {
  const dispatch = useDispatch();

  const products = useSelector(state => state.products.list);
  const compositions = useSelector(state => state.compositions.list);
  const rawMaterials = useSelector(state => state.rawMaterials.list);

  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({name: '', value: ''});

  const [showComp, setShowComp] = useState(false);
  const [selectedProd, setSelectedProd] = useState(null);
  const [materialId, setMaterialId] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchRawMaterials());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editing) {
      dispatch(updateProduct({id: editing.id, data: form}));
    } else {
      dispatch(createProduct(form));
    }

    setShow(false);
    setEditing(null);
    setForm({name: '', value: ''});
  };

  const handleEdit = (p) => {
    setEditing(p);
    setForm({name: p.name, value: p.value});
    setShow(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete?')) dispatch(deleteProduct(id));
  };

  const openComposition = (p) => {
    setSelectedProd(p);
    dispatch(fetchCompositionsByProduct(p.id));
    setShowComp(true);
  };

  const addComposition = async (e) => {
    e.preventDefault();

    if (!materialId || !quantity) return;

    await dispatch(createComposition({
      productId: selectedProd.id,
      rawMaterialId: Number(materialId),
      quantityRequired: Number(quantity)
    }));

    dispatch(fetchCompositionsByProduct(selectedProd.id));

  }
}