import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CameraOutlined } from "@ant-design/icons";
import styles from "./DragNDropImageUploader.module.less";

interface DragNDropImageUploaderProps {
    value?: File;
    onChange?: (file: File) => void;
    defaultPreview?: string;
    alt?: string;
}

const DragNDropImageUploader: React.FC<DragNDropImageUploaderProps> = ({ onChange, value, defaultPreview, alt }) => {
    const [preview, setPreview] = useState<string>(defaultPreview || "");
    const onDrop = useCallback(
        async ([file]: File[]) => {
            onChange?.(file);
            const base64 = await toBase64(file);
            if (base64) {
                setPreview(base64);
            }
        },
        [onChange]
    );
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    function toBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    }

    return (
        <div {...getRootProps()} className={styles.upload}>
            {preview ? (
                <>
                    <div className={styles.uploadOverlay}>
                        <CameraOutlined />
                    </div>
                    <img src={preview} alt={alt} className={styles.preview} />
                </>
            ) : (
                <div>
                    <CameraOutlined />
                </div>
            )}
            <input {...getInputProps()} hidden accept="image/*" />
        </div>
    );
};

export default DragNDropImageUploader;
