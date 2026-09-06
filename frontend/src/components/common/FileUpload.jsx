import { useRef, useState } from "react";
import { Paperclip, UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FileUpload({
  label = "Attach file",
  accept = ".pdf,.doc,.docx,.ppt,.pptx,.zip",
  onChange,
}) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="sr-only"
        aria-label={label}
        onChange={(e) => {
          const name = e.target.files?.[0]?.name ?? null;
          setFile(name);
          onChange?.(name);
        }}
      />
      {file ? (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm">
          <span className="flex min-w-0 items-center gap-2">
            <Paperclip className="h-4 w-4 shrink-0" aria-hidden />
            <span className="truncate">{file}</span>
          </span>
          <button
            type="button"
            aria-label="Remove file"
            onClick={() => {
              setFile(null);
              onChange?.(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="rounded p-1 hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          className="w-full justify-center border-dashed py-6"
          onClick={() => inputRef.current?.click()}
        >
          <UploadCloud className="h-4 w-4" aria-hidden /> {label}
        </Button>
      )}
    </div>
  );
}
