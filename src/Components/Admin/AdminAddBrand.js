import React, { useState } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import avatar from '../../images/avatar.png';
import baseUrl from '../../Api/baseURL';

const AdminAddBrand = () => {
    const [img, setImg] = useState(avatar);
    const [name, setName] = useState('');
    const [base64Image, setBase64Image] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('success');

    // Convert uploaded image to Base64 Data URL
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

    // Save brand
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
            setMessage("Veuillez saisir le nom de la marque");
            setVariant("danger");
            return;
        }

        try {
            setLoading(true);
            const payload = {
                name,
                image: base64Image || avatar
            };

            const res = await baseUrl.post('/api/v1/brands', payload);
            setLoading(false);
            if (res.status === 201 || res.status === 200) {
                setMessage("Marque ajoutée avec succès !");
                setVariant("success");
                setName("");
                setImg(avatar);
                setBase64Image(null);
            }
        } catch (err) {
            console.error("Error creating brand:", err);
            setLoading(false);
            setMessage("Erreur lors de l'ajout de la marque");
            setVariant("danger");
        }
    };

    return (
        <div>
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-4">Ajouter une marque</div>
                <Col sm="8">
                    <div className="text-form pb-2">Photo de la marque</div>
                    <div>
                        <label htmlFor="upload-brand-image" style={{ cursor: "pointer" }}>
                            <img src={img} alt="brand" height="100px" width="120px" style={{ objectFit: "cover", borderRadius: "8px", border: "1px solid #ddd" }} />
                        </label>
                        <input
                            type="file"
                            id="upload-brand-image"
                            style={{ display: "none" }}
                            onChange={onImageChange}
                            accept="image/*"
                        />
                    </div>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="Nom de la marque"
                    />
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

export default AdminAddBrand;
