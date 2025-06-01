import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { supabase } from '../lib/supabaseClient';

interface UploadDropzoneProps {
  onUploadComplete: (fileUrl: string) => void;
  onUploadError: (error: Error) => void;
  bucket?: string;
  folder?: string;
}

export function UploadDropzone({
  onUploadComplete,
  onUploadError,
  bucket = 'documents',
  folder = '',
}: UploadDropzoneProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingFile, setUploadingFile] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      setUploadingFile(file.name);
      setUploadProgress(0);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = folder ? `${folder}/${fileName}` : fileName;

      const { error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      onUploadComplete(publicUrl);
    } catch (error) {
      onUploadError(error instanceof Error ? error : new Error('Upload failed'));
    } finally {
      setUploadingFile(null);
      setUploadProgress(0);
    }
  }, [bucket, folder, onUploadComplete, onUploadError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
        isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'
      }`}
    >
      <input {...getInputProps()} />
      {uploadingFile ? (
        <div className="space-y-2">
          <p className="text-sm text-gray-600">{uploadingFile}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">{uploadProgress}%</p>
        </div>
      ) : (
        <div className="space-y-2">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="text-sm text-gray-600">
            <span className="font-medium text-indigo-600 hover:text-indigo-500">
              Upload a file
            </span>{' '}
            or drag and drop
          </div>
          <p className="text-xs text-gray-500">Any file up to 10MB</p>
        </div>
      )}
    </div>
  );
} 