"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getGalleryImages, addGalleryImage, deleteGalleryImage, GalleryImage } from "@/lib/admin-store";

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    getGalleryImages().then((imgs) => { setImages(imgs); setLoading(false); });
  }, []);

  function handleFileChange(f: File | null) {
    setFile(f);
    if (!f) { setPreview(null); return; }
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(f);
  }

  async function handleUpload() {
    if (!file || !title) return;
    const reader = new FileReader();
    reader.onload = async () => {
      await addGalleryImage({ title, description, image: reader.result as string });
      setImages(await getGalleryImages());
      setTitle("");
      setDescription("");
      setFile(null);
      setPreview(null);
    };
    reader.readAsDataURL(file);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this image?")) return;
    await deleteGalleryImage(id);
    setImages(await getGalleryImages());
  }

  return (
    <div className="mx-auto flex max-w-full flex-col items-center px-4 sm:px-6 py-10 text-center lg:px-8">
      <Link href="/admin" className="text-sm font-medium text-mist transition hover:text-red">
        ← Dashboard
      </Link>
      <h1 className="mt-4 font-display text-4xl text-navy">Gallery</h1>
      <p className="mt-2 text-sm text-mist">Upload images to showcase your work.</p>

      <div className="neu-card mt-8 w-full max-w-2xl p-6 text-left">
        <h2 className="font-display text-xl text-navy">Upload new image</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-mist">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="neu-pressed mt-1 w-full rounded-xl px-4 py-3 text-sm text-navy outline-none"
              placeholder="e.g. Completed compound in Entebbe"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-mist">Description (optional)</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="neu-pressed mt-1 w-full rounded-xl px-4 py-3 text-sm text-navy outline-none"
              placeholder="Brief description of the work"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="text-xs font-semibold uppercase tracking-wide text-mist">Image</label>
          <div className="mt-1 flex items-center gap-4">
            <label className="neu-raised-sm flex cursor-pointer items-center gap-2 px-6 py-3 text-sm font-semibold text-navy">
              {preview ? "Change file" : "Choose file"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
              />
            </label>
            {file && <span className="text-xs text-mist">{file.name}</span>}
          </div>
          {preview && (
            <div className="mt-3 max-w-xs overflow-hidden rounded-xl">
              <img src={preview} alt="Preview" className="w-full object-cover" />
            </div>
          )}
        </div>

        <button
          onClick={handleUpload}
          disabled={!file || !title}
          className="neu-btn mt-4 px-6 py-3 text-sm font-semibold text-red disabled:opacity-50"
        >
          Upload
        </button>
      </div>

      {loading ? (
        <div className="mt-8 grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="neu-card overflow-hidden">
              <div className="aspect-[4/3] w-full animate-pulse bg-base-light" />
              <div className="p-4">
                <div className="h-4 w-32 animate-pulse rounded bg-base-light" />
                <div className="mt-2 h-3 w-48 animate-pulse rounded bg-base-light" />
                <div className="neu-btn mt-3 h-8 w-full animate-pulse opacity-50" />
              </div>
            </div>
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className="neu-card mt-8 p-10 text-center">
          <p className="text-mist">No gallery images yet.</p>
        </div>
      ) : (
        <div className="mt-8 grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img) => (
            <div key={img.id} className="neu-card overflow-hidden">
              <div className="relative aspect-[4/3] w-full">
                <img src={img.image} alt={img.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-navy">{img.title}</h3>
                {img.description && <p className="mt-1 text-xs text-mist">{img.description}</p>}
                <p className="mt-1 text-[10px] text-mist/50">{new Date(img.createdAt).toLocaleDateString()}</p>
                <button
                  onClick={() => handleDelete(img.id)}
                  className="neu-btn mt-3 w-full px-4 py-2 text-xs font-semibold text-red"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
