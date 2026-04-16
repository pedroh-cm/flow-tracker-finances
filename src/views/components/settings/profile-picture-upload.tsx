"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, X } from "lucide-react";

import { Button } from "@/src/views/components/ui/button";

type ProfilePictureUploadProps = {
  currentImage?: string;
  onImageChange: (base64: string) => void;
};

export function ProfilePictureUpload({ currentImage, onImageChange }: ProfilePictureUploadProps) {
  const [preview, setPreview] = useState<string | undefined>(currentImage);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      // Validar tipo de arquivo
      if (!file.type.startsWith("image/")) {
        alert("Por favor, selecione uma imagem válida");
        return;
      }

      // Validar tamanho (máx 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Imagem deve ter no máximo 5MB");
        return;
      }

      // Converter para base64
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        onImageChange(base64String);
      };
      reader.readAsDataURL(file);
    },
    [onImageChange],
  );

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemove = () => {
    setPreview(undefined);
    onImageChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      {/* Preview */}
      {preview ? (
        <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4">
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Profile preview" className="h-16 w-16 rounded-full object-cover" />
            <div>
              <p className="text-sm font-medium text-foreground">Foto de perfil</p>
              <p className="text-xs text-muted-foreground">Clique em remover para alterar</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleRemove} className="cursor-pointer text-destructive hover:bg-destructive/10">
            <X size={18} />
          </Button>
        </div>
      ) : (
        /* Drag and drop area */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
            isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30"
          }`}
        >
          <Upload className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
          <p className="font-medium text-foreground">Arraste uma imagem aqui</p>
          <p className="text-sm text-muted-foreground">ou clique para selecionar</p>
          <p className="mt-2 text-xs text-muted-foreground">JPG, PNG, GIF (máx 5MB)</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        aria-label="Selecionar foto de perfil"
      />
    </div>
  );
}
