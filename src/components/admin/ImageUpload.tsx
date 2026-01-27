'use client';

import { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
    onUpload: (url: string) => void;
    defaultValue?: string;
    label?: string;
}

export default function ImageUpload({ onUpload, defaultValue, label }: ImageUploadProps) {
    const [preview, setPreview] = useState(defaultValue || '');
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        // Preview
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        try {
            setUploading(true);
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `uploads/${fileName}`;

            const { error: uploadError, data } = await supabase.storage
                .from('portfolio')
                .upload(filePath, file);

            if (uploadError) {
                if (uploadError.message.includes('Bucket not found')) {
                    alert('Configuration Error: Storage bucket "portfolio" not found. Please run the SQL setup in your Supabase dashboard.');
                }
                throw uploadError;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('portfolio')
                .getPublicUrl(filePath);

            onUpload(publicUrl);
            setPreview(publicUrl);
        } catch (error: any) {
            console.error('Upload Failed:', error);
            if (!error.message.includes('Bucket not found')) {
                alert('Error uploading image: ' + error.message);
            }
            setPreview(defaultValue || '');
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="space-y-3">
            {label && <label className="text-sm text-brand-gray uppercase tracking-widest block">{label}</label>}

            <div
                onClick={() => fileInputRef.current?.click()}
                className="relative group cursor-pointer"
            >
                <div className={`aspect-video md:aspect-[16/6] w-full rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-6 ${preview ? 'border-transparent bg-black/40' : 'border-white/10 hover:border-white/20 bg-white/5'
                    }`}>
                    {preview ? (
                        <div className="absolute inset-0 rounded-2xl overflow-hidden">
                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">Change Image</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Upload className="w-6 h-6 text-brand-gray" />
                            </div>
                            <p className="text-sm text-brand-gray font-medium">Click to upload or drag and drop</p>
                            <p className="text-[10px] text-brand-gray/50 uppercase tracking-widest mt-1">PNG, JPG or WebP (Max 5MB)</p>
                        </>
                    )}

                    {uploading && (
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl z-20">
                            <Loader2 className="w-8 h-8 text-white animate-spin mb-3" />
                            <p className="text-xs font-bold uppercase tracking-[0.2em] animate-pulse">Uploading Artifact...</p>
                        </div>
                    )}
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                />
            </div>

            {preview && (
                <button
                    type="button"
                    onClick={() => {
                        setPreview('');
                        onUpload('');
                    }}
                    className="text-[10px] text-red-500 uppercase tracking-widest flex items-center gap-1.5 hover:text-red-400 transition-colors"
                >
                    <X className="w-3.5 h-3.5" /> Remove Image
                </button>
            )}
        </div>
    );
}
