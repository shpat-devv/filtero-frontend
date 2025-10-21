import React, { useState, useRef } from "react";
import Styles from "../styles/pages/Home.module.css";
import api from "../api.js";

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';
type Filter = 'blur' | 'grayscale' | 'sepia' | 'invert';

interface FileUploaderProps {
    onImageChange: (imageUrl: string) => void;
}

const filters: Filter[] = ['blur', 'grayscale', 'sepia', 'invert'];

const FileUploader: React.FC<FileUploaderProps> = ({ onImageChange }) => {
    const [status, setStatus] = useState<UploadStatus>('idle');
    const [showFilterPopup, setShowFilterPopup] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState<Filter | null>(null);
    const fileRef = useRef<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;

        fileRef.current = selectedFile;
        const previewUrl = URL.createObjectURL(selectedFile);
        onImageChange(previewUrl);
    };

    const handleFileUpload = async () => {
        const file = fileRef.current;

        if (!file) {
            console.error("No file selected for upload.");
            return;
        }

        if (!selectedFilter) {
            alert("No filter selected.");
            return;
        }
    
        setStatus('uploading');
        const formData = new FormData();
        formData.append('image', file);
        formData.append('filter', selectedFilter || '');

        try {
            const response = await api.post('/api/image/', formData, {
                responseType: 'blob',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
                }
            });

            const imageBlob = response.data;
            console.log("Received image blob:", imageBlob);
            const imageUrl = URL.createObjectURL(imageBlob);
            console.log("Created image URL:", imageUrl);
            onImageChange(imageUrl);

            if (response.status === 200) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    function handleApplyFilterClick() {
        setShowFilterPopup(true);
    }

    function handleDrawModeClick() {
        console.log("Draw Mode button clicked");
    }

    function handleFilterSelect(filter: Filter) {
        setSelectedFilter(filter);
    }

    function handleFilterSave() {
        setShowFilterPopup(false);
        console.log("Selected filter:", selectedFilter);
    }

    function handleFilterCancel() {
        setShowFilterPopup(false);
    }

    return (
        <div className={Styles.contentRight}>
            <input
                onChange={handleFileChange}
                className={Styles.ctaButton}
                type="file"
                id="fileInput"
                accept="image/*"
                style={{ display: 'none' }}
            />
            <label htmlFor="fileInput" className={Styles.ctaButton}>
                {status === 'uploading' ? 'Uploading...' : 'Select Image'}
            </label>

            <button className={Styles.ctaButton} onClick={handleApplyFilterClick}>Apply Filter</button>
            <button className={Styles.ctaButton} onClick={handleDrawModeClick}>Draw Mode</button>
            <button onClick={handleFileUpload} className={Styles.ctaButton}>
                Upload
            </button>

            {showFilterPopup && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: '#121212',
                        padding: 24,
                        borderRadius: 8,
                        minWidth: 300,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                    }}>
                        <h3>Select a Filter</h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {filters.map((filter) => (
                                <li key={filter} style={{ margin: '8px 0' }}>
                                    <label>
                                        <input
                                            type="radio"
                                            name="filter"
                                            value={filter}
                                            checked={selectedFilter === filter}
                                            onChange={() => handleFilterSelect(filter)}
                                        />
                                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                            <button onClick={handleFilterSave} className={Styles.ctaButton}>Save</button>
                            <button onClick={handleFilterCancel} className={Styles.ctaButton}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUploader;
