"use client";

import { useCallback, useRef, useState } from "react";
import { FileText, Upload, X } from "lucide-react";

import { Button } from "@/src/views/components/ui/button";
import { Label } from "@/src/views/components/ui/form";

type ReceiptUploadProps = {
  value?: string;
  onChange: (base64: string | undefined) => void;
};

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const MAX_SIZE = 5 * 1024 * 1024;

export function ReceiptUpload({ value, onChange }: ReceiptUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        alert("Formato não suportado. Use JPG, PNG, WEBP ou PDF.");
        return;
      }

      if (file.size > MAX_SIZE) {
        alert("Arquivo deve ter no máximo 5MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setFileName(file.name);
        onChange(base64);
      };
      reader.readAsDataURL(file);
    },
    [onChange],
  );

  const handleRemove = () => {
    setFileName(null);
    onChange(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const hasReceipt = Boolean(value);

  return (
    <div className="space-y-2">
      <Label htmlFor="receipt-upload">Comprovante (opcional)</Label>

      {hasReceipt ? (
        <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2">
          <div className="flex items-center gap-2 text-sm text-foreground">
            <FileText size={16} className="text-primary" />
            <span>{fileName ?? "Comprovante anexado"}</span>
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={handleRemove} aria-label="Remover comprovante">
            <X size={14} />
          </Button>
        </div>
      ) : (
        <div
          className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border px-4 py-6 transition-colors hover:border-primary/50 hover:bg-muted/30"
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Enviar comprovante"
        >
          <Upload size={20} className="mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Clique para anexar recibo ou documento</p>
          <p className="text-xs text-muted-foreground">JPG, PNG, WEBP ou PDF — máx. 5MB</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        id="receipt-upload"
        type="file"
        accept=".jpg,.jpeg,.png,.webp,.pdf"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
}
