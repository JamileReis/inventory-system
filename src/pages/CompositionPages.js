import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../store/productsSlice"
import { fetchRawMaterials } from "../store/rawMaterialsSlice"
import { addComposition } from "../store/compositionsSlice"

function CompositionsPage() {
    const dispatch = useDispatch()

    const products = useSelector(state => state.products.items)
    const materials = useSelector(state => state.rawMaterials.items)

    const [productId, setProductId] = useState("")
    const [materialId, setMaterialId] = useState("")
    const [quantity, setQuantity] = useState("")

    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchRawMaterials())
    }, [dispatch])

    const handleSubmit = e => {
        e.preventDefault()
        if (!productId || !materialId || !quantity) return

        dispatch(
            addComposition({
                productId,
                materialId,
                quantity: Number(quantity)
            })
        )

        setMaterialId("")
        setQuantity("")
    }

    return (
        <>
            <div className="page-header">
                <h1>Composição de Produtos</h1>
            </div>

            <div className="card">
                <form onSubmit={handleSubmit} className="form">
                    <label>Produto</label>
                    <select
                        value={productId}
                        onChange={e => setProductId(e.target.value)}
                    >
                        <option value="">Selecione</option>
                        {products.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>

                    <label>Matéria-prima</label>
                    <select
                        value={materialId}
                        onChange={e => setMaterialId(e.target.value)}
                    >
                        <option value="">Selecione</option>
                        {materials.map(m => (
                            <option key={m.id} value={m.id}>{m.name}</option>
                        ))}
                    </select>

                    <label>Quantidade necessária</label>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                    />

                    <button type="submit">Adicionar à composição</button>
                </form>
            </div>
        </>
    )
}

export default CompositionsPage