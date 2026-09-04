import React, { useState, useEffect } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import avatar from '../../images/avatar.png';
import baseUrl from '../../Api/baseURL';

const AdminAddProducts = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('10');
    const [categoryId, setCategoryId] = useState('');
    const [brandId, setBrandId] = useState('');
    const [img, setImg] = useState(avatar);
    const [base64Image, setBase64Image] = useState(null);

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('success');

    // Fetch Categories and Brands on Mount
    useEffect(() => {
        const getCategoriesAndBrands = async () => {
            try {
                const resCat = await baseUrl.get('/api/v1/categories');
                const catData = resCat.data?.data || resCat.data || [];
                setCategories(Array.isArray(catData) ? catData : []);
            } catch (e) {
                console.error("Error fetching categories:", e);
            }

            try {
                const resBrand = await baseUrl.get('/api/v1/brands');
                const brandData = resBrand.data?.data || resBrand.data || [];
                setBrands(Array.isArray(brandData) ? brandData : []);
            } catch (e) {
                console.error("Error fetching brands:", e);
            }
        };

        getCategoriesAndBrands();
    }, []);

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImg(reader.result);
                setBase64Image(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description || !price || !categoryId) {
            setMessage("Veuillez remplir tous les champs obligatoires (Titre, Description, Prix, Catégorie)");
            setVariant("danger");
            return;
        }

        try {
            setLoading(true);
            const payload = {
                title,
                description,
                price: Number(price),
                quantity: Number(quantity || 10),
                category: categoryId,
                brand: brandId || undefined,
                imageCover: base64Image || avatar
            };

            const res = await baseUrl.post('/api/v1/products', payload);
            setLoading(false);
            if (res.status === 201 || res.status === 200) {
                setMessage("Produit ajouté avec succès !");
                setVariant("success");
                setTitle('');
                setDescription('');
                setPrice('');
                setQuantity('10');
                setCategoryId('');
                setBrandId('');
                setImg(avatar);
                setBase64Image(null);
            }
        } catch (err) {
            console.error("Error adding product:", err);
            setLoading(false);
            setMessage("Erreur lors de l'ajout du produit");
            setVariant("danger");
        }
    };

    return (
        <div>
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-4">Ajouter un produit</div>
                <Col sm="8">
                    <div className="text-form pb-2">Photo du produit</div>
                    <div>
                        <label htmlFor="upload-product-image" style={{ cursor: "pointer" }}>
                            <img src={img} alt="product" height="100px" width="120px" style={{ objectFit: "cover", borderRadius: "8px", border: "1px solid #ddd" }} />
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
                        <option value="">Sélectionner une marque (Optionnel)</option>
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
                    <button onClick={handleSubmit} className="btn-save d-inline mt-2" disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : "Enregistrer les modifications"}
                    </button>
                </Col>
            </Row>
        </div>
    );
};

export default AdminAddProducts;
