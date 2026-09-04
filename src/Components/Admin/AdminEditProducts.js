import React, { useState, useEffect } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import avatar from '../../images/avatar.png';
import baseUrl from '../../Api/baseURL';

const AdminEditProducts = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('10');
    const [categoryId, setCategoryId] = useState('');
    const [brandId, setBrandId] = useState('');
    const [img, setImg] = useState(avatar);
    const [selectedFile, setSelectedFile] = useState(null);

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('success');

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                // Fetch product details
                const resProd = await baseUrl.get(`/api/v1/products/${id}`);
                const prod = resProd.data.data || resProd.data;
                if (prod) {
                    setTitle(prod.title || '');
                    setDescription(prod.description || '');
                    setPrice(prod.price || '');
                    setQuantity(prod.quantity || '10');
                    setCategoryId(prod.category?._id || prod.category || '');
                    setBrandId(prod.brand?._id || prod.brand || '');
                    if (prod.imageCover) {
                        setImg(prod.imageCover.startsWith('http') ? prod.imageCover : `http://127.0.0.1:8000/products/${prod.imageCover}`);
                    }
                }

                // Fetch categories
                const resCat = await baseUrl.get('/api/v1/categories');
                setCategories(resCat.data?.data || resCat.data || []);

                // Fetch brands
                const resBrand = await baseUrl.get('/api/v1/brands');
                setBrands(resBrand.data?.data || resBrand.data || []);

                setLoading(false);
            } catch (err) {
                console.error("Error loading product edit data:", err);
                setMessage("Erreur lors du chargement du produit");
                setVariant("danger");
                setLoading(false);
            }
        };

        if (id) loadData();
    }, [id]);

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImg(URL.createObjectURL(event.target.files[0]));
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description || !price) {
            setMessage("Veuillez remplir les champs obligatoires (Titre, Description, Prix)");
            setVariant("danger");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("quantity", quantity || 10);
        if (categoryId) formData.append("category", categoryId);
        if (brandId) formData.append("brand", brandId);
        if (selectedFile) formData.append("imageCover", selectedFile);

        try {
            setSaving(true);
            const res = await baseUrl.put(`/api/v1/products/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setSaving(false);
            if (res.status === 200) {
                setMessage("Produit modifié avec succès !");
                setVariant("success");
                setTimeout(() => navigate('/admin/allproducts'), 1500);
            }
        } catch (err) {
            console.error("Error updating product with FormData, trying JSON fallback:", err);
            try {
                const jsonPayload = {
                    title,
                    description,
                    price: Number(price),
                    quantity: Number(quantity || 10),
                    category: categoryId || undefined,
                    brand: brandId || undefined
                };
                const res = await baseUrl.put(`/api/v1/products/${id}`, jsonPayload);
                setSaving(false);
                if (res.status === 200) {
                    setMessage("Produit modifié avec succès !");
                    setVariant("success");
                    setTimeout(() => navigate('/admin/allproducts'), 1500);
                    return;
                }
            } catch (fallbackErr) {
                setSaving(false);
                setMessage("Erreur lors de la modification du produit");
                setVariant("danger");
            }
        }
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    return (
        <div>
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-4">Modifier le produit</div>
                <Col sm="8">
                    <div className="text-form pb-2">Photo du produit</div>
                    <div>
                        <label htmlFor="upload-product-image" style={{ cursor: "pointer" }}>
                            <img src={img} alt="product" height="100px" width="120px" style={{ objectFit: "cover", borderRadius: "8px" }} />
                        </label>
                        <input
                            type="file"
                            id="upload-product-image"
                            style={{ display: "none" }}
                            onChange={onImageChange}
                            accept="image/*"
                        />
                    </div>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="Nom du produit"
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input-form-area p-2 mt-3"
                        rows="4"
                        cols="50"
                        placeholder="Description du produit"
                    />
                    <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        type="number"
                        className="input-form d-block mt-3 px-3"
                        placeholder="Prix (MAD)"
                    />
                    <input
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        type="number"
                        className="input-form d-block mt-3 px-3"
                        placeholder="Quantité en stock"
                    />
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="select input-form-area mt-3 px-2">
                        <option value="">Sélectionner une catégorie</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    <select
                        value={brandId}
                        onChange={(e) => setBrandId(e.target.value)}
                        className="select input-form-area mt-3 px-2">
                        <option value="">Sélectionner une marque</option>
                        {brands.map((b) => (
                            <option key={b._id} value={b._id}>
                                {b.name}
                            </option>
                        ))}
                    </select>
                </Col>
            </Row>

            {message && (
                <Row className="mt-2">
                    <Col sm="8">
                        <div className={`alert alert-${variant} py-2`}>{message}</div>
                    </Col>
                </Row>
            )}

            <Row>
                <Col sm="8" className="d-flex justify-content-end ">
                    <button onClick={handleSubmit} className="btn-save d-inline mt-2">
                        {saving ? <Spinner animation="border" size="sm" /> : "Enregistrer les modifications"}
                    </button>
                </Col>
            </Row>
        </div>
    );
};

export default AdminEditProducts;
