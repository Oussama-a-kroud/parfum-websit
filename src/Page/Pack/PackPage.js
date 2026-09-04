import React, { useEffect } from 'react';
import CategoryHeader from '../../Components/Category/CategoryHeader';
import PackBuilder from '../../Components/Pack/PackBuilder';

const PackPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ minHeight: '670px', backgroundColor: '#faf8f5' }}>
            <CategoryHeader />
            <PackBuilder />
        </div>
    );
};

export default PackPage;
