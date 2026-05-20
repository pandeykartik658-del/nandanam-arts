import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Endpoint to save image links and process local file uploads
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { frame1, frame2, frame3, leela, uploadFile, uploadFileName } = body;

    // 1. Process optional local file upload
    let fileUrl = "";
    if (uploadFile && uploadFileName) {
      try {
        // Create public/uploads directory if not exists
        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }

        // Convert base64 data to buffer
        const base64Data = uploadFile.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");

        // Save file with a timestamp to prevent overwriting
        const ext = path.extname(uploadFileName) || ".jpg";
        const baseName = path.basename(uploadFileName, ext).replace(/[^a-zA-Z0-9]/g, "_");
        const savedFileName = `${baseName}_${Date.now()}${ext}`;
        const filePath = path.join(uploadsDir, savedFileName);

        fs.writeFileSync(filePath, buffer);
        fileUrl = `/uploads/${savedFileName}`;
      } catch (err: any) {
        console.error("Failed to write uploaded file to filesystem:", err);
        const isReadOnly = err.code === "EROFS" || err.message?.includes("read-only") || err.message?.includes("permission");
        if (isReadOnly) {
          return NextResponse.json({ 
            success: false, 
            error: "Local file uploads are not supported in production on Vercel (read-only filesystem). Please upload your image to Cloudinary (or another host) and paste the URL instead." 
          }, { status: 400 });
        } else {
          return NextResponse.json({ 
            success: false, 
            error: `Failed to save file: ${err.message}` 
          }, { status: 500 });
        }
      }
    }

    // 2. Load current config
    const configPath = path.join(process.cwd(), "public", "data", "custom-images.json");
    let currentConfig: any = { frame1: [], frame2: [], frame3: [], leela: [] };
    
    if (fs.existsSync(configPath)) {
      try {
        const fileContent = fs.readFileSync(configPath, "utf8");
        currentConfig = JSON.parse(fileContent);
      } catch (e) {
        console.error("Error reading config", e);
      }
    }

    // 3. Update configuration lists if provided
    if (frame1) currentConfig.frame1 = frame1;
    if (frame2) currentConfig.frame2 = frame2;
    if (frame3) currentConfig.frame3 = frame3;
    if (leela) currentConfig.leela = leela;

    // Write updated config back to JSON
    let isReadOnlyFilesystem = false;
    try {
      const dataDir = path.join(process.cwd(), "public", "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(configPath, JSON.stringify(currentConfig, null, 2), "utf8");
    } catch (err: any) {
      console.warn("Dashboard API: Server filesystem is read-only (Vercel). Config will be persisted client-side only:", err.message);
      isReadOnlyFilesystem = true;
    }

    return NextResponse.json({ 
      success: true, 
      config: currentConfig,
      uploadedUrl: fileUrl,
      isReadOnlyFilesystem
    });
  } catch (error: any) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
