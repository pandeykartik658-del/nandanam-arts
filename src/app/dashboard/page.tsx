"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Upload, Save, Check, Image as ImageIcon, Sparkles, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ImageConfig {
  frame1: string[];
  frame2: string[];
  frame3: string[];
}

export default function DashboardPage() {
  const [config, setConfig] = useState<ImageConfig>({
    frame1: [],
    frame2: [],
    frame3: []
  });
  
  const [activeTab, setActiveTab] = useState<keyof ImageConfig>("frame1");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [uploadStatus, setUploadStatus] = useState<{ [key: number]: "idle" | "uploading" | "done" }>({});
  const [errorMessage, setErrorMessage] = useState("");

  // Load configuration from local JSON database on mount
  useEffect(() => {
    async function loadConfig() {
      try {
        const res = await fetch("/data/custom-images.json");
        if (res.ok) {
          const data = await res.json();
          setConfig(data);
        }
      } catch (err) {
        console.error("Failed to load images config:", err);
      }
    }
    loadConfig();
  }, []);

  // Update a single image URL in the active frame list
  const handleUrlChange = (index: number, value: string) => {
    setConfig(prev => {
      const newList = [...prev[activeTab]];
      newList[index] = value;
      return { ...prev, [activeTab]: newList };
    });
  };

  // Add a new image placeholder to the active list
  const addImagePlaceholder = () => {
    if (config[activeTab].length >= 8) {
      alert("A maximum of 8 images is recommended per frame to maintain optimal loading speed.");
      return;
    }
    setConfig(prev => ({
      ...prev,
      [activeTab]: [...prev[activeTab], ""]
    }));
  };

  // Remove an image from the active list
  const removeImage = (index: number) => {
    setConfig(prev => {
      const newList = [...prev[activeTab]];
      newList.splice(index, 1);
      return { ...prev, [activeTab]: newList };
    });
  };

  // Process and upload a local file to the server's public/uploads/ directory
  const handleFileUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    setUploadStatus(prev => ({ ...prev, [index]: "uploading" }));

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        
        const response = await fetch("/api/save-images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uploadFile: base64,
            uploadFileName: file.name
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.uploadedUrl) {
            handleUrlChange(index, data.uploadedUrl);
            setUploadStatus(prev => ({ ...prev, [index]: "done" }));
            setTimeout(() => {
              setUploadStatus(prev => ({ ...prev, [index]: "idle" }));
            }, 2000);
          } else {
            throw new Error(data.error || "Failed to parse saved URL");
          }
        } else {
          throw new Error("Server responded with error status");
        }
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      console.error("File upload error:", err);
      alert(`Upload failed: ${err.message}`);
      setUploadStatus(prev => ({ ...prev, [index]: "idle" }));
    }
  };

  // Submit and save configuration changes to database
  const saveConfiguration = async () => {
    setStatus("saving");
    try {
      const response = await fetch("/api/save-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config)
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setStatus("saved");
          // Persist in localStorage for instant front-end client updates
          localStorage.setItem("custom_nca_images", JSON.stringify(config));
          setTimeout(() => setStatus("idle"), 3000);
        } else {
          throw new Error(data.error);
        }
      } else {
        throw new Error("HTTP connection error");
      }
    } catch (err: any) {
      console.error("Save config failed:", err);
      setErrorMessage(err.message || "An unexpected error occurred");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <div className="noise-overlay min-h-screen relative text-foreground selection:bg-primary/30 py-16 px-4 sm:px-8 md:px-12 flex flex-col items-center justify-start bg-radial-gradient-nca">
      
      {/* Background Ornaments */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,_hsl(300,25%,8%),_hsl(300,20%,5%))]" />
      
      {/* Container */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col gap-8">
        
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
          <div className="flex flex-col gap-2">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary/70 hover:text-primary transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Sanctum
            </Link>
            <h1 className="font-display text-3xl sm:text-4xl tracking-[4px] text-gradient-wine uppercase">
              Curator Dashboard
            </h1>
            <p className="font-body text-xs text-white/55">
              Upload images directly to the server or map Cloudinary URLs to configure home frames and Leela carousels.
            </p>
          </div>

          <button
            onClick={saveConfiguration}
            disabled={status === "saving"}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-wine hover:glow-wine text-white font-display text-xs uppercase tracking-[2px] px-8 py-3.5 rounded-full transition-all duration-300 disabled:opacity-50"
          >
            {status === "saving" ? (
              <span className="animate-pulse">Saving changes...</span>
            ) : status === "saved" ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Saved successfully!</span>
              </>
            ) : status === "error" ? (
              <>
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span>Error saving</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Publish updates</span>
              </>
            )}
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2 border-b border-white/5 pb-2">
          {(["frame1", "frame2", "frame3"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-display text-xs tracking-widest uppercase rounded-t-lg transition-all duration-300 ${
                activeTab === tab
                  ? "bg-white/10 border-t border-x border-primary text-primary"
                  : "bg-transparent text-muted-foreground hover:text-white hover:bg-white/5"
              }`}
            >
              {tab === "frame1" && "About Us - Frame 1"}
              {tab === "frame2" && "About Us - Frame 2"}
              {tab === "frame3" && "About Us - Frame 3"}
            </button>
          ))}
        </div>

        {/* Image Grid panel */}
        <div className="glass-surface border border-primary/20 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 bg-black/40 backdrop-blur-md">
          
          <div className="flex justify-between items-center">
            <span className="font-display text-xs tracking-[4px] uppercase text-primary/80 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Manage Carousel List ({config[activeTab]?.length || 0} items)
            </span>

            <button
              onClick={addImagePlaceholder}
              className="text-[10px] tracking-widest font-display uppercase border border-primary/45 px-4 py-2 rounded-full hover:bg-primary/10 transition-colors"
            >
              + Add Image Slot
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {config[activeTab]?.map((url, i) => (
              <div 
                key={i} 
                className="flex flex-col gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-white/40">Slot {String(i + 1).padStart(2, "0")}</span>
                  <button
                    onClick={() => removeImage(i)}
                    className="text-red-400 hover:text-red-300 font-mono text-[10px] uppercase tracking-wider transition-colors"
                  >
                    Delete Slot
                  </button>
                </div>

                {/* Upload & pasting wrapper */}
                <div className="flex gap-4 items-start">
                  
                  {/* Thumbnail Preview Box */}
                  <div className="relative w-28 h-20 shrink-0 overflow-hidden rounded-lg bg-black/60 border border-white/10 flex items-center justify-center">
                    {url ? (
                      <Image
                        src={url}
                        alt={`Preview ${i+1}`}
                        fill
                        sizes="112px"
                        className="object-contain p-1"
                        unoptimized
                      />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-white/20" />
                    )}
                  </div>

                  {/* Controls */}
                  <div className="flex flex-col gap-2 flex-grow">
                    {/* Paste URL */}
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => handleUrlChange(i, e.target.value)}
                      placeholder="Paste Image URL (Cloudinary, etc.)"
                      className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/90 placeholder-white/20 focus:outline-none focus:border-primary/50 transition-colors font-mono"
                    />

                    {/* Local File Uploader */}
                    <div className="relative flex items-center">
                      <input
                        type="file"
                        accept="image/*"
                        id={`file-upload-${i}`}
                        onChange={(e) => handleFileUpload(i, e)}
                        className="hidden"
                      />
                      <label
                        htmlFor={`file-upload-${i}`}
                        className="inline-flex items-center gap-1.5 cursor-pointer text-[10px] font-display uppercase tracking-wider bg-white/5 border border-white/10 px-3 py-1.5 rounded-md hover:bg-white/10 text-white/80 transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        {uploadStatus[i] === "uploading" ? "Uploading file..." : uploadStatus[i] === "done" ? "Saved!" : "Upload Local Image"}
                      </label>
                    </div>
                  </div>

                </div>
              </div>
            ))}

            {(!config[activeTab] || config[activeTab].length === 0) && (
              <div className="col-span-1 md:col-span-2 py-16 flex flex-col items-center justify-center text-center gap-3">
                <ImageIcon className="w-12 h-12 text-white/15 animate-pulse" />
                <span className="font-display text-xs text-white/40 uppercase tracking-widest">
                  No image slots configured
                </span>
                <button
                  onClick={addImagePlaceholder}
                  className="mt-2 text-xs tracking-widest font-display uppercase border border-primary/45 px-5 py-2.5 rounded-full bg-primary/5 hover:bg-primary/20 text-primary transition-colors"
                >
                  Add Your First Slot
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
