import React from 'react';
import '../css/SkeletonLoader.css';

const SkeletonLoader = ({ count = 6 }) => {
    const skeletonCards = Array.from({ length: count }, (_, index) => (
        <div key={index} className="skeleton-card">
            <div className="skeleton-line-lg"></div>
            <div className="skeleton-line-md"></div>
            <div className="skeleton-line-sm"></div>
            <div className="skeleton-line-sm"></div>
        </div>
    ));

    return (
        <div className="skeleton-grid">
            {skeletonCards}
        </div>
    );
};

export default SkeletonLoader;