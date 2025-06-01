import { useState } from 'react';
import { db } from '../api/supa';

interface UploadOptions {
  bucket?: string;
  folder?: string;
  onProgress?: (progress: number) => void;
}

interface UploadResult {
  url: string;
  path: string;
}

export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const uploadFile = async (
    file: File,
    options: UploadOptions = {}
  ): Promise<UploadResult> => {
    const { bucket = 'documents', folder = '' } = options;
    setIsUploading(true);
    setError(null);

    try {
      // Generate a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = folder ? `${folder}/${fileName}` : fileName;

      // Upload the file
      const { error: uploadError } = await db.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = db.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return {
        url: publicUrl,
        path: filePath,
      };
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Upload failed'));
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  const deleteFile = async (path: string, bucket: string = 'documents'): Promise<void> => {
    try {
      const { error } = await db.storage
        .from(bucket)
        .remove([path]);

      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Delete failed'));
      throw err;
    }
  };

  return {
    uploadFile,
    deleteFile,
    isUploading,
    error,
  };
} 