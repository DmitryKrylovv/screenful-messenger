import { useState, useEffect, useRef } from "react";
import {
  Music, Play, Pause, SkipBack, SkipForward,
  Shuffle, Repeat, Volume2, VolumeX, Search,
  ListMusic, Heart, MoreHorizontal,
} from "lucide-react";

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  liked: boolean;
}

const mockTracks: Track[] = [
  { id: "1", title: "Midnight Protocol", artist: "Neon Drift", album: "System Override", duration: 234, liked: true },
  { id: "2", title: "Carbon Fiber", artist: "Glass Machines", album: "Synthetic Dawn", duration: 198, liked: false },
  { id: "3", title: "Deep Structure", artist: "Void Array", album: "Binary Sunset", duration: 312, liked: true },
  { id: "4", title: "Monochrome", artist: "Pale Signal", album: "Flat Architecture", duration: 267, liked: false },
  { id: "5", title: "Surface Tension", artist: "Grid Theory", album: "Material Plane", duration: 185, liked: false },
  { id: "6", title: "Zero Index", artist: "Null Pointer", album: "Stack Overflow", duration: 290, liked: true },
  { id: "7", title: "Silent Deploy", artist: "Neon Drift", album: "System Override", duration: 203, liked: false },
  { id: "8", title: "White Noise Architecture", artist: "Glass Machines", album: "Synthetic Dawn", duration: 345, liked: false },
  { id: "9", title: "Pixel Rain", artist: "Void Array", album: "Binary Sunset", duration: 178, liked: true },
  { id: "10", title: "Terminal Velocity", artist: "Pale Signal", album: "Flat Architecture", duration: 256, liked: false },
];

const fmt = (sec: number) => `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, "0")}`;

const MusicPanel = () => {
  const [currentTrack, setCurrentTrack] = useState<Track>(mockTracks[0]);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(75);
  const [muted, setMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [likedTracks, setLikedTracks] = useState<Set<string>>(
    new Set(mockTracks.filter((t) => t.liked).map((t) => t.id))
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= currentTrack.duration) {
            setPlaying(false);
            return 0;
          }
          return p + 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing, currentTrack]);

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setProgress(0);
    setPlaying(true);
  };

  const toggleLike = (id: string) => {
    setLikedTracks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const skipNext = () => {
    const idx = mockTracks.findIndex((t) => t.id === currentTrack.id);
    const next = shuffle
      ? mockTracks[Math.floor(Math.random() * mockTracks.length)]
      : mockTracks[(idx + 1) % mockTracks.length];
    playTrack(next);
  };

  const skipPrev = () => {
    if (progress > 3) { setProgress(0); return; }
    const idx = mockTracks.findIndex((t) => t.id === currentTrack.id);
    playTrack(mockTracks[(idx - 1 + mockTracks.length) % mockTracks.length]);
  };

  const progressPercent = (progress / currentTrack.duration) * 100;

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Header */}
      <header className="h-16 border-b border-foreground/5 flex items-center px-6 justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Music className="w-4 h-4 text-muted-foreground" />
          <span className="font-bold text-sm">Music Library</span>
          <span className="font-mono-tabular text-[10px] text-muted-foreground">{mockTracks.length} tracks</span>
        </div>
        <div className="flex items-center gap-2">
          <ListMusic className="w-4 h-4 text-muted-foreground" />
        </div>
      </header>

      {/* Search */}
      <div className="px-6 py-3 shrink-0">
        <div className="bg-surface-low rounded-lg flex items-center gap-2 px-3 py-2">
          <Search className="w-3.5 h-3.5 text-muted-foreground" />
          <input className="bg-transparent flex-1 text-body outline-none placeholder:text-muted-foreground" placeholder="Search tracks..." />
        </div>
      </div>

      {/* Track List */}
      <div className="flex-1 overflow-y-auto px-6">
        <div className="space-y-0.5">
          {mockTracks.map((track, i) => (
            <div
              key={track.id}
              onClick={() => playTrack(track)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors group ${
                currentTrack.id === track.id ? "bg-primary text-primary-foreground" : "hover:bg-surface-low"
              }`}
            >
              <span className={`font-mono-tabular text-[10px] w-5 text-right shrink-0 ${
                currentTrack.id === track.id ? "text-primary-foreground/60" : "text-muted-foreground"
              }`}>
                {currentTrack.id === track.id && playing ? (
                  <span className="flex items-center justify-end gap-[2px]">
                    <span className="w-[2px] h-2 bg-current rounded-full animate-pulse" />
                    <span className="w-[2px] h-3 bg-current rounded-full animate-pulse" style={{ animationDelay: "150ms" }} />
                    <span className="w-[2px] h-1.5 bg-current rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
                  </span>
                ) : (
                  String(i + 1).padStart(2, "0")
                )}
              </span>

              <div className="flex-1 min-w-0">
                <p className={`text-[12px] font-semibold truncate ${currentTrack.id === track.id ? "" : ""}`}>
                  {track.title}
                </p>
                <p className={`text-[10px] truncate ${
                  currentTrack.id === track.id ? "text-primary-foreground/60" : "text-muted-foreground"
                }`}>
                  {track.artist} · {track.album}
                </p>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); toggleLike(track.id); }}
                className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-all ${
                  likedTracks.has(track.id)
                    ? currentTrack.id === track.id
                      ? "text-primary-foreground"
                      : "text-foreground"
                    : currentTrack.id === track.id
                      ? "text-primary-foreground/30 hover:text-primary-foreground/60"
                      : "text-muted-foreground/30 opacity-0 group-hover:opacity-100 hover:text-foreground"
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${likedTracks.has(track.id) ? "fill-current" : ""}`} />
              </button>

              <span className={`font-mono-tabular text-[10px] shrink-0 ${
                currentTrack.id === track.id ? "text-primary-foreground/60" : "text-muted-foreground"
              }`}>
                {fmt(track.duration)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Player */}
      <footer className="border-t border-foreground/5 shrink-0">
        {/* Progress bar */}
        <div className="px-6 pt-3">
          <div
            className="h-1 bg-surface-mid rounded-full overflow-hidden cursor-pointer group"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = ((e.clientX - rect.left) / rect.width) * 100;
              setProgress(Math.round((pct / 100) * currentTrack.duration));
            }}
          >
            <div className="h-full bg-foreground rounded-full transition-all group-hover:bg-foreground/80" style={{ width: `${progressPercent}%` }} />
          </div>
          <div className="flex justify-between mt-1">
            <span className="font-mono-tabular text-[9px] text-muted-foreground">{fmt(progress)}</span>
            <span className="font-mono-tabular text-[9px] text-muted-foreground">{fmt(currentTrack.duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="px-6 pb-4 flex items-center gap-4">
          {/* Track info */}
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold truncate">{currentTrack.title}</p>
            <p className="text-[10px] text-muted-foreground truncate">{currentTrack.artist}</p>
          </div>

          {/* Playback controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShuffle(!shuffle)}
              className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${
                shuffle ? "text-foreground" : "text-muted-foreground/40 hover:text-muted-foreground"
              }`}
            >
              <Shuffle className="w-3.5 h-3.5" />
            </button>
            <button onClick={skipPrev} className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground hover:bg-surface-low transition-colors">
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPlaying(!playing)}
              className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:scale-[0.96] transition-transform"
            >
              {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <button onClick={skipNext} className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground hover:bg-surface-low transition-colors">
              <SkipForward className="w-4 h-4" />
            </button>
            <button
              onClick={() => setRepeat(!repeat)}
              className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${
                repeat ? "text-foreground" : "text-muted-foreground/40 hover:text-muted-foreground"
              }`}
            >
              <Repeat className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2 flex-1 justify-end">
            <button
              onClick={() => setMuted(!muted)}
              className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              {muted || volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
            <div
              className="w-20 h-1 bg-surface-mid rounded-full overflow-hidden cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setVolume(Math.round(((e.clientX - rect.left) / rect.width) * 100));
                setMuted(false);
              }}
            >
              <div className="h-full bg-foreground/50 rounded-full" style={{ width: `${muted ? 0 : volume}%` }} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MusicPanel;
