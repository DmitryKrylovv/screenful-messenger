import { useState } from "react";
import {
  Cloud, FolderOpen, FileText, Image, Film, Music,
  Upload, Download, MoreHorizontal, Search, Grid, List,
  ChevronRight, HardDrive,
} from "lucide-react";

interface StorageFile {
  id: string;
  name: string;
  type: "folder" | "image" | "document" | "video" | "audio" | "archive";
  size?: string;
  modified: string;
  items?: number;
}

const mockFiles: StorageFile[] = [
  { id: "1", name: "Design Assets", type: "folder", modified: "Today", items: 24 },
  { id: "2", name: "Project Files", type: "folder", modified: "Yesterday", items: 12 },
  { id: "3", name: "Recordings", type: "folder", modified: "Mar 18", items: 8 },
  { id: "4", name: "brand-guidelines.pdf", type: "document", size: "4.2 MB", modified: "Today" },
  { id: "5", name: "hero-banner.png", type: "image", size: "2.8 MB", modified: "Today" },
  { id: "6", name: "product-demo.mp4", type: "video", size: "148 MB", modified: "Yesterday" },
  { id: "7", name: "podcast-ep12.mp3", type: "audio", size: "32 MB", modified: "Mar 18" },
  { id: "8", name: "wireframes-v3.fig", type: "document", size: "8.1 MB", modified: "Mar 17" },
  { id: "9", name: "meeting-notes.md", type: "document", size: "12 KB", modified: "Mar 16" },
  { id: "10", name: "intro-animation.mp4", type: "video", size: "24 MB", modified: "Mar 15" },
];

const typeIcons: Record<string, React.ElementType> = {
  folder: FolderOpen,
  image: Image,
  document: FileText,
  video: Film,
  audio: Music,
  archive: FileText,
};

const typeColors: Record<string, string> = {
  folder: "bg-accent text-accent-foreground",
  image: "bg-accent text-accent-foreground",
  document: "bg-accent text-accent-foreground",
  video: "bg-accent text-accent-foreground",
  audio: "bg-accent text-accent-foreground",
  archive: "bg-accent text-accent-foreground",
};

const CloudStoragePanel = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [path] = useState(["Cloud Storage"]);

  const usedStorage = 2.4;
  const totalStorage = 10;
  const usagePercent = (usedStorage / totalStorage) * 100;

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Header */}
      <header className="h-16 border-b border-foreground/5 flex items-center px-6 justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Cloud className="w-4 h-4 text-muted-foreground" />
          <div className="flex items-center gap-1.5 text-sm">
            {path.map((p, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="w-3 h-3 text-muted-foreground" />}
                <span className={i === path.length - 1 ? "font-bold" : "text-muted-foreground cursor-pointer hover:text-foreground"}>{p}</span>
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-mid transition-colors"
          >
            {viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
          </button>
          <button className="h-8 px-3 bg-primary text-primary-foreground rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:scale-[0.97] transition-transform">
            <Upload className="w-3.5 h-3.5" />
            Upload
          </button>
        </div>
      </header>

      {/* Search */}
      <div className="px-6 py-3 shrink-0">
        <div className="bg-surface-low rounded-lg flex items-center gap-2 px-3 py-2">
          <Search className="w-3.5 h-3.5 text-muted-foreground" />
          <input className="bg-transparent flex-1 text-body outline-none placeholder:text-muted-foreground" placeholder="Search files..." />
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto px-6">
        {viewMode === "list" ? (
          <div className="space-y-0.5">
            {mockFiles.map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {mockFiles.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
        )}
      </div>

      {/* Storage usage footer */}
      <footer className="p-4 border-t border-foreground/5 shrink-0">
        <div className="flex items-center gap-3">
          <HardDrive className="w-4 h-4 text-muted-foreground shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline mb-1.5">
              <span className="text-[11px] font-medium">{usedStorage} GB used</span>
              <span className="font-mono-tabular text-[10px] text-muted-foreground">{totalStorage} GB total</span>
            </div>
            <div className="h-1.5 bg-surface-mid rounded-full overflow-hidden">
              <div className="h-full bg-foreground rounded-full transition-all" style={{ width: `${usagePercent}%` }} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FileRow = ({ file }: { file: StorageFile }) => {
  const Icon = typeIcons[file.type] || FileText;

  return (
    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-low cursor-pointer transition-colors group">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${typeColors[file.type]}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-semibold truncate">{file.name}</p>
        <p className="text-[10px] text-muted-foreground font-mono-tabular">
          {file.type === "folder" ? `${file.items} items` : file.size} · {file.modified}
        </p>
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {file.type !== "folder" && (
          <button className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-mid">
            <Download className="w-3.5 h-3.5" />
          </button>
        )}
        <button className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-mid">
          <MoreHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

const FileCard = ({ file }: { file: StorageFile }) => {
  const Icon = typeIcons[file.type] || FileText;

  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-xl border border-foreground/5 hover:border-foreground/15 cursor-pointer transition-colors bg-background">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${typeColors[file.type]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-center w-full">
        <p className="text-[11px] font-semibold truncate">{file.name}</p>
        <p className="text-[9px] text-muted-foreground font-mono-tabular">
          {file.type === "folder" ? `${file.items} items` : file.size}
        </p>
      </div>
    </div>
  );
};

export default CloudStoragePanel;
