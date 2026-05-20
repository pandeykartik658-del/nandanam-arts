const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "";
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "nandanam_unsigned";

/**
 * Fetch image URLs from Cloudinary's resource list API by tag.
 * Requires "Resource list" to be enabled in Cloudinary Security settings.
 */
export async function fetchFrameImages(tag: string): Promise<string[]> {
  if (!CLOUD_NAME) return [];
  try {
    const res = await fetch(
      `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${tag}.json`
    );
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.resources || data.resources.length === 0) return [];
    return data.resources.map(
      (r: { public_id: string; format: string }) =>
        `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_800/${r.public_id}.${r.format}`
    );
  } catch {
    return [];
  }
}

/**
 * Open the Cloudinary Upload Widget for a specific frame tag.
 */
export function openUploadWidget(
  tag: string,
  onSuccess: () => void
): void {
  const cloudinary = (window as any).cloudinary;
  if (!cloudinary) {
    alert("Cloudinary widget not loaded. Please refresh and try again.");
    return;
  }

  const widget = cloudinary.createUploadWidget(
    {
      cloudName: CLOUD_NAME,
      uploadPreset: UPLOAD_PRESET,
      sources: ["local", "url", "camera"],
      multiple: true,
      maxFiles: 4,
      tags: [tag],
      resourceType: "image",
      clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
      maxFileSize: 5000000, // 5MB
      styles: {
        palette: {
          window: "#1a1a2e",
          windowBorder: "#6b2fa0",
          tabIcon: "#d4a5ff",
          menuIcons: "#d4a5ff",
          textDark: "#1a1a2e",
          textLight: "#e0e0e0",
          link: "#b388ff",
          action: "#7c3aed",
          inactiveTabIcon: "#8b8b9e",
          error: "#ff6b6b",
          inProgress: "#7c3aed",
          complete: "#4ade80",
          sourceBg: "#16162a",
        },
        fonts: {
          default: null,
          "'Inter', sans-serif": {
            url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap",
            active: true,
          },
        },
      },
    },
    (error: any, result: any) => {
      if (!error && result && result.event === "success") {
        // Image uploaded successfully
      }
      if (!error && result && result.event === "close") {
        onSuccess();
      }
    }
  );

  widget.open();
}

export { CLOUD_NAME };
