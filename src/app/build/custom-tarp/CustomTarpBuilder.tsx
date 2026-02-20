"use client";

import { useState, useRef, useCallback } from "react";
import { cn, formatPrice } from "@/lib/utils";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

// ── Types ───────────────────────────────────────────────────────
interface Point {
  x: number;
  y: number;
}

// ── Config ──────────────────────────────────────────────────────
const PRICE_PER_SQFT: Record<string, number> = {
  "18oz": 1.9,
  "22oz": 2.1,
};
const SNAP = 0.5;
const MAX_FT = 50;

const VINYL_WEIGHTS = [
  { label: "18 oz", value: "18oz", description: "Standard — flexible, UV resistant" },
  { label: "22 oz", value: "22oz", description: "Heavy-duty — maximum durability" },
];

const COLORS = [
  { name: "Black", bg: "#111827" },
  { name: "White", bg: "#f9fafb" },
  { name: "Gray", bg: "#9ca3af" },
  { name: "Tan", bg: "#d7c3a3" },
  { name: "Red", bg: "#dc2626" },
  { name: "Blue", bg: "#2563eb" },
];

const GROMMET_OPTIONS = [
  { label: 'Every 24"', value: "24", description: "Standard spacing" },
  { label: 'Every 18"', value: "18", description: "Extra secure" },
  { label: 'Every 12"', value: "12", description: "Maximum hold" },
  { label: "None", value: "none", description: "No grommets" },
];

// ── Geometry helpers ────────────────────────────────────────────
function snap(v: number) {
  return Math.round(v / SNAP) * SNAP;
}

function clampSnap(v: number) {
  return Math.max(-MAX_FT, Math.min(MAX_FT, snap(v)));
}

function shoelaceArea(pts: Point[]): number {
  let area = 0;
  for (let i = 0; i < pts.length; i++) {
    const j = (i + 1) % pts.length;
    area += pts[i].x * pts[j].y;
    area -= pts[j].x * pts[i].y;
  }
  return Math.abs(area) / 2;
}

function edgeLen(a: Point, b: Point): number {
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
}

function midpoint(a: Point, b: Point): Point {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function interiorAngle(prev: Point, curr: Point, next: Point): number {
  const ax = prev.x - curr.x;
  const ay = prev.y - curr.y;
  const bx = next.x - curr.x;
  const by = next.y - curr.y;
  const dot = ax * bx + ay * by;
  const cross = ax * by - ay * bx;
  const angle = Math.atan2(Math.abs(cross), dot) * (180 / Math.PI);
  return Math.round(angle);
}

function centroid(pts: Point[]): Point {
  const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
  const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length;
  return { x: cx, y: cy };
}

// ── Preset shapes ───────────────────────────────────────────────
function rectangle(w: number, h: number): Point[] {
  return [
    { x: 0, y: 0 },
    { x: w, y: 0 },
    { x: w, y: h },
    { x: 0, y: h },
  ];
}

function lShape(): Point[] {
  return [
    { x: 0, y: 0 },
    { x: 12, y: 0 },
    { x: 12, y: 6 },
    { x: 6, y: 6 },
    { x: 6, y: 10 },
    { x: 0, y: 10 },
  ];
}

function tShape(): Point[] {
  return [
    { x: 0, y: 0 },
    { x: 14, y: 0 },
    { x: 14, y: 4 },
    { x: 10, y: 4 },
    { x: 10, y: 12 },
    { x: 4, y: 12 },
    { x: 4, y: 4 },
    { x: 0, y: 4 },
  ];
}

function notchedCorner(): Point[] {
  return [
    { x: 0, y: 0 },
    { x: 12, y: 0 },
    { x: 12, y: 8 },
    { x: 9, y: 8 },
    { x: 9, y: 10 },
    { x: 0, y: 10 },
  ];
}

function withFlap(): Point[] {
  return [
    { x: 0, y: 0 },
    { x: 12, y: 0 },
    { x: 12, y: 4 },
    { x: 15, y: 4 },
    { x: 15, y: 7 },
    { x: 12, y: 7 },
    { x: 12, y: 10 },
    { x: 0, y: 10 },
  ];
}

// ── SVG config ──────────────────────────────────────────────────
const PX_PER_FT = 10;
const PAD_FT = 8;
const MIN_VIEW_FT = 24;

// ── Main component ──────────────────────────────────────────────
export default function CustomTarpBuilder() {
  const [points, setPoints] = useState<Point[]>(rectangle(10, 12));
  const [vinyl, setVinyl] = useState("18oz");
  const [color, setColor] = useState("Black");
  const [grommets, setGrommets] = useState("24");
  const [addedToCart, setAddedToCart] = useState(false);
  const [tool, setTool] = useState<"select" | "flap">("select");

  const area = shoelaceArea(points);
  const rate = PRICE_PER_SQFT[vinyl] ?? 1.9;
  const price = area * rate;
  const colorBg = COLORS.find((c) => c.name === color)?.bg ?? "#111827";

  const minX = Math.min(...points.map((p) => p.x));
  const maxX = Math.max(...points.map((p) => p.x));
  const minY = Math.min(...points.map((p) => p.y));
  const maxY = Math.max(...points.map((p) => p.y));

  function setPreset(pts: Point[]) {
    setPoints(pts);
    setTool("select");
  }

  function addPointOnEdge(edgeIdx: number) {
    const a = points[edgeIdx];
    const b = points[(edgeIdx + 1) % points.length];
    const mid = { x: snap((a.x + b.x) / 2), y: snap((a.y + b.y) / 2) };
    const next = [...points];
    next.splice(edgeIdx + 1, 0, mid);
    setPoints(next);
  }

  function addFlapOnEdge(edgeIdx: number) {
    const a = points[edgeIdx];
    const b = points[(edgeIdx + 1) % points.length];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len < 1) return;

    const c = centroid(points);
    const mid = midpoint(a, b);
    let nx = -dy / len;
    let ny = dx / len;
    const toCenter = { x: c.x - mid.x, y: c.y - mid.y };
    if (nx * toCenter.x + ny * toCenter.y > 0) {
      nx = -nx;
      ny = -ny;
    }

    const flapDepth = Math.max(2, snap(len * 0.2));
    const inset = len * 0.25;
    const p1 = { x: snap(a.x + (dx / len) * inset), y: snap(a.y + (dy / len) * inset) };
    const p2 = { x: snap(p1.x + nx * flapDepth), y: snap(p1.y + ny * flapDepth) };
    const p4 = { x: snap(b.x - (dx / len) * inset), y: snap(b.y - (dy / len) * inset) };
    const p3 = { x: snap(p4.x + nx * flapDepth), y: snap(p4.y + ny * flapDepth) };

    const next = [...points];
    next.splice(edgeIdx + 1, 0, p1, p2, p3, p4);
    setPoints(next);
    setTool("select");
  }

  function removePoint(idx: number) {
    if (points.length <= 3) return;
    setPoints(points.filter((_, i) => i !== idx));
  }

  function resizeEdge(edgeIdx: number, newLen: number) {
    const a = points[edgeIdx];
    const bIdx = (edgeIdx + 1) % points.length;
    const b = points[bIdx];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const curLen = Math.sqrt(dx * dx + dy * dy);
    if (curLen < 0.01) return;
    const scale = newLen / curLen;
    const newB = { x: snap(a.x + dx * scale), y: snap(a.y + dy * scale) };
    setPoints(points.map((pt, i) => (i === bIdx ? newB : pt)));
  }

  function handleAddToCart() {
    const shapeDesc = points.map((p) => `(${p.x}',${p.y}')`).join(" → ");
    const btn = document.createElement("button");
    btn.className = "snipcart-add-item";
    btn.style.display = "none";
    btn.setAttribute("data-item-id", `custom-tarp-${area.toFixed(0)}sqft-${color}-${vinyl}`);
    btn.setAttribute(
      "data-item-name",
      `Custom Tarp – ${area.toFixed(1)} sq ft / ${color} / ${vinyl}`
    );
    btn.setAttribute("data-item-price", String(price.toFixed(2)));
    btn.setAttribute("data-item-url", "/build/custom-tarp");
    btn.setAttribute(
      "data-item-description",
      `Custom ${vinyl} vinyl tarp, ${area.toFixed(1)} sq ft, ${color}, grommets: ${grommets === "none" ? "none" : "every " + grommets + '"'}, reinforced edges`
    );
    btn.setAttribute("data-item-custom1-name", "Area");
    btn.setAttribute("data-item-custom1-value", `${area.toFixed(1)} sq ft`);
    btn.setAttribute("data-item-custom2-name", "Shape Coordinates (ft)");
    btn.setAttribute("data-item-custom2-value", shapeDesc);
    btn.setAttribute("data-item-custom3-name", "Vinyl / Color");
    btn.setAttribute("data-item-custom3-value", `${vinyl} / ${color}`);
    btn.setAttribute("data-item-custom4-name", "Grommets");
    btn.setAttribute(
      "data-item-custom4-value",
      grommets === "none" ? "None" : `Every ${grommets}"`
    );
    document.body.appendChild(btn);
    btn.click();
    setTimeout(() => btn.remove(), 500);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: "Custom Tarps", href: "/collections/custom-design-tarps" },
          { label: "Build Your Tarp" },
        ]}
      />

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Build Your Custom Tarp</h1>
        <p className="mt-2 text-gray-600">
          Design your shape, pick your options, and get an instant price estimate.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left: Shape Editor (3 cols) */}
        <div className="lg:col-span-3">
          {/* Toolbar */}
          <div className="bg-white border border-gray-200 rounded-t-xl p-3 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mr-1">
              Start from:
            </span>
            <ToolBtn onClick={() => setPreset(rectangle(10, 12))} label="Rectangle" />
            <ToolBtn onClick={() => setPreset(lShape())} label="L-Shape" />
            <ToolBtn onClick={() => setPreset(tShape())} label="T-Shape" />
            <ToolBtn onClick={() => setPreset(notchedCorner())} label="Notched" />
            <ToolBtn onClick={() => setPreset(withFlap())} label="With Flap" />
            <div className="w-px h-6 bg-gray-200 mx-1" />
            <ToolBtn
              onClick={() => setTool(tool === "flap" ? "select" : "flap")}
              label="+ Flap"
              active={tool === "flap"}
            />
          </div>

          {/* Canvas */}
          <ShapeCanvas
            points={points}
            setPoints={setPoints}
            tool={tool}
            colorBg={colorBg}
            grommets={grommets}
            onAddPoint={addPointOnEdge}
            onAddFlap={addFlapOnEdge}
            onRemovePoint={removePoint}
            onResizeEdge={resizeEdge}
          />

          {/* Instructions */}
          <div className="bg-gray-50 border border-t-0 border-gray-200 rounded-b-xl px-4 py-3">
            <p className="text-xs text-gray-500">
              <strong>Drag</strong> any point to reshape.{" "}
              <strong>Hover</strong> an edge and click <strong>+</strong> to add a point.{" "}
              <strong>Click</strong> a measurement to type an exact length.{" "}
              <strong>Double-click</strong> a point to remove it.
            </p>
          </div>

          {/* Dimensions readout */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
            <span>
              Bounding box:{" "}
              <strong className="text-gray-900">
                {(maxX - minX).toFixed(1)}&apos; &times; {(maxY - minY).toFixed(1)}&apos;
              </strong>
            </span>
            <span>
              Points: <strong className="text-gray-900">{points.length}</strong>
            </span>
            <span>
              Edges: <strong className="text-gray-900">{points.length}</strong>
            </span>
          </div>
        </div>

        {/* Right: Options & Price (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Vinyl Weight */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Vinyl Weight</h3>
            <div className="grid grid-cols-2 gap-3">
              {VINYL_WEIGHTS.map((v) => (
                <button
                  key={v.value}
                  onClick={() => setVinyl(v.value)}
                  className={cn(
                    "border rounded-lg p-3 text-left cursor-pointer transition-all",
                    vinyl === v.value
                      ? "border-brand-500 bg-brand-50 ring-1 ring-brand-500"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <div className="text-sm font-medium text-gray-900">{v.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{v.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Color</h3>
            <div className="flex flex-wrap gap-3">
              {COLORS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  className="flex flex-col items-center gap-1.5 cursor-pointer group"
                >
                  <div
                    className={cn(
                      "w-9 h-9 rounded-full border-2 transition-all shadow-sm",
                      color === c.name
                        ? "border-brand-500 ring-2 ring-brand-300 scale-110"
                        : "border-gray-300 group-hover:border-gray-400 group-hover:scale-105"
                    )}
                    style={{ background: c.bg }}
                  />
                  <span
                    className={cn(
                      "text-xs font-medium",
                      color === c.name ? "text-gray-900" : "text-gray-500"
                    )}
                  >
                    {c.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Grommets */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Grommet Spacing</h3>
            <div className="grid grid-cols-2 gap-3">
              {GROMMET_OPTIONS.map((g) => (
                <button
                  key={g.value}
                  onClick={() => setGrommets(g.value)}
                  className={cn(
                    "border rounded-lg p-3 text-left cursor-pointer transition-all",
                    grommets === g.value
                      ? "border-brand-500 bg-brand-50 ring-1 ring-brand-500"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <div className="text-sm font-medium text-gray-900">{g.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{g.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Shape Area</span>
              <span className="font-medium text-gray-900">{area.toFixed(1)} sq ft</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-3">
              <span>Rate ({vinyl})</span>
              <span className="font-medium text-gray-900">${rate.toFixed(2)} / sq ft</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Estimated Price</span>
              <span className="text-2xl font-extrabold text-gray-900">
                {formatPrice(price)}
              </span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full py-3 bg-brand-500 text-dark-900 font-semibold rounded-lg hover:bg-brand-400 transition-colors cursor-pointer"
          >
            {addedToCart ? "Added!" : "Add to Cart"}
          </button>

          <p className="text-xs text-gray-400 text-center">
            Need something more complex?{" "}
            <a href="/contact" className="text-brand-700 hover:text-brand-800 font-medium">
              Contact us
            </a>{" "}
            for a free quote.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Toolbar button ──────────────────────────────────────────────
function ToolBtn({
  onClick,
  label,
  active,
}: {
  onClick: () => void;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer transition-colors",
        active
          ? "bg-brand-500 text-dark-900"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      )}
    >
      {label}
    </button>
  );
}

// ── Shape Canvas (SVG) ──────────────────────────────────────────
function ShapeCanvas({
  points,
  setPoints,
  tool,
  colorBg,
  grommets,
  onAddPoint,
  onAddFlap,
  onRemovePoint,
  onResizeEdge,
}: {
  points: Point[];
  setPoints: (pts: Point[]) => void;
  tool: "select" | "flap";
  colorBg: string;
  grommets: string;
  onAddPoint: (edgeIdx: number) => void;
  onAddFlap: (edgeIdx: number) => void;
  onRemovePoint: (idx: number) => void;
  onResizeEdge: (edgeIdx: number, newLen: number) => void;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [editingEdge, setEditingEdge] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  // Dynamic viewBox centered on shape
  const pMaxX = Math.max(...points.map((p) => p.x));
  const pMaxY = Math.max(...points.map((p) => p.y));
  const pMinX = Math.min(...points.map((p) => p.x));
  const pMinY = Math.min(...points.map((p) => p.y));

  const shapeW = pMaxX - pMinX;
  const shapeH = pMaxY - pMinY;
  const shapeCX = (pMinX + pMaxX) / 2;
  const shapeCY = (pMinY + pMaxY) / 2;

  const rawViewW = Math.max(shapeW + PAD_FT * 2, MIN_VIEW_FT);
  const rawViewH = Math.max(shapeH + PAD_FT * 2, MIN_VIEW_FT);
  const viewW = Math.ceil(rawViewW / 5) * 5;
  const viewH = Math.ceil(rawViewH / 5) * 5;
  const viewMinX = Math.round((shapeCX - viewW / 2) * 2) / 2;
  const viewMinY = Math.round((shapeCY - viewH / 2) * 2) / 2;

  const vbX = viewMinX * PX_PER_FT;
  const vbY = viewMinY * PX_PER_FT;
  const vbW = viewW * PX_PER_FT;
  const vbH = viewH * PX_PER_FT;

  function toSvgLocal(p: Point): { x: number; y: number } {
    return { x: p.x * PX_PER_FT, y: p.y * PX_PER_FT };
  }

  const clientToFt = useCallback(
    (clientX: number, clientY: number): Point => {
      if (!svgRef.current) return { x: 0, y: 0 };
      const rect = svgRef.current.getBoundingClientRect();
      const svgX = vbX + ((clientX - rect.left) / rect.width) * vbW;
      const svgY = vbY + ((clientY - rect.top) / rect.height) * vbH;
      return { x: clampSnap(svgX / PX_PER_FT), y: clampSnap(svgY / PX_PER_FT) };
    },
    [vbX, vbY, vbW, vbH]
  );

  const onPointerDown = useCallback(
    (idx: number) => (e: React.PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      (e.target as SVGElement).setPointerCapture(e.pointerId);
      dragging.current = idx;
      setIsDragging(true);
    },
    []
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (dragging.current === null) return;
      const p = clientToFt(e.clientX, e.clientY);
      const idx = dragging.current;
      setPoints(points.map((pt, i) => (i === idx ? p : pt)));
    },
    [points, setPoints, clientToFt]
  );

  const onPointerUp = useCallback(() => {
    dragging.current = null;
    setIsDragging(false);
  }, []);

  const onDoubleClick = useCallback(
    (idx: number) => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onRemovePoint(idx);
    },
    [onRemovePoint]
  );

  function startEditing(edgeIdx: number, currentLen: number) {
    setEditingEdge(edgeIdx);
    setEditValue(currentLen.toFixed(1));
  }

  function commitEdit() {
    if (editingEdge === null) return;
    const val = parseFloat(editValue);
    if (!isNaN(val) && val >= 0.5 && val <= MAX_FT * 2) {
      onResizeEdge(editingEdge, val);
    }
    setEditingEdge(null);
  }

  // Build polygon path string
  const polyPoints = points
    .map((p) => {
      const s = toSvgLocal(p);
      return `${s.x},${s.y}`;
    })
    .join(" ");

  // Grommet spacing in feet
  const grommetFt = grommets === "none" ? 0 : parseInt(grommets) / 12;

  // Grid
  const gridStart = Math.floor(Math.min(viewMinX, viewMinY) / 5) * 5;
  const gridEnd = Math.ceil(Math.max(viewMinX + viewW, viewMinY + viewH) / 5) * 5;

  const gridLines: React.ReactNode[] = [];
  for (let i = gridStart; i <= gridEnd; i += 5) {
    const px = i * PX_PER_FT;
    if (i >= -MAX_FT && i <= MAX_FT) {
      gridLines.push(
        <line key={`gv-${i}`} x1={px} y1={vbY} x2={px} y2={vbY + vbH} stroke={i % 10 === 0 ? "#d1d5db" : "#e5e7eb"} strokeWidth={i % 10 === 0 ? 0.8 : 0.4} />
      );
      gridLines.push(
        <line key={`gh-${i}`} x1={vbX} y1={px} x2={vbX + vbW} y2={px} stroke={i % 10 === 0 ? "#d1d5db" : "#e5e7eb"} strokeWidth={i % 10 === 0 ? 0.8 : 0.4} />
      );
    }
  }

  const gridLabels: React.ReactNode[] = [];
  for (let i = gridStart; i <= gridEnd; i += 10) {
    if (i === 0) continue;
    if (i < -MAX_FT || i > MAX_FT) continue;
    const px = i * PX_PER_FT;
    gridLabels.push(
      <text key={`lx-${i}`} x={px} y={vbY + 12} textAnchor="middle" fontSize="8" fill="#9ca3af">{i}&apos;</text>
    );
    gridLabels.push(
      <text key={`ly-${i}`} x={vbX + 10} y={px + 3} textAnchor="start" fontSize="8" fill="#9ca3af">{i}&apos;</text>
    );
  }

  const aspectRatio = vbW / vbH;

  return (
    <div
      className={cn(
        "bg-white border border-t-0 border-gray-200 overflow-hidden",
        !isDragging && "transition-all duration-300 ease-in-out"
      )}
      style={{ paddingBottom: `${(1 / aspectRatio) * 100}%`, position: "relative" }}
    >
      <svg
        ref={svgRef}
        viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
        className="absolute inset-0 w-full h-full touch-none select-none"
        preserveAspectRatio="xMidYMid meet"
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {gridLines}
        {gridLabels}

        {/* Tarp shape fill — #8: stronger opacity */}
        <polygon points={polyPoints} fill={colorBg} fillOpacity={0.4} stroke="none" />

        {/* Tarp shape outline */}
        <polygon
          points={polyPoints}
          fill="none"
          stroke="#374151"
          strokeWidth={1.5}
          strokeDasharray="6 3"
        />

        {/* #5: Grommet dots along edges */}
        {grommetFt > 0 &&
          points.map((a, i) => {
            const b = points[(i + 1) % points.length];
            const len = edgeLen(a, b);
            if (len < grommetFt) return null;
            const count = Math.floor(len / grommetFt) + 1;
            return Array.from({ length: count }).map((_, gi) => {
              const t = gi / Math.max(count - 1, 1);
              const gx = (a.x + (b.x - a.x) * t) * PX_PER_FT;
              const gy = (a.y + (b.y - a.y) * t) * PX_PER_FT;
              return (
                <circle
                  key={`grom-${i}-${gi}`}
                  cx={gx}
                  cy={gy}
                  r={1.2}
                  fill="#6b7280"
                  className="pointer-events-none"
                />
              );
            });
          })}

        {/* Edge labels + hover-only add buttons */}
        {points.map((a, i) => {
          const b = points[(i + 1) % points.length];
          const sa = toSvgLocal(a);
          const sb = toSvgLocal(b);
          const mx = (sa.x + sb.x) / 2;
          const my = (sa.y + sb.y) / 2;
          const len = edgeLen(a, b);
          if (len < 0.5) return null;

          const dx = sb.x - sa.x;
          const dy = sb.y - sa.y;
          let angle = (Math.atan2(dy, dx) * 180) / Math.PI;
          if (angle > 90) angle -= 180;
          if (angle < -90) angle += 180;

          const c = centroid(points);
          const sc = toSvgLocal(c);
          const nx = -(sb.y - sa.y);
          const ny = sb.x - sa.x;
          const nLen = Math.sqrt(nx * nx + ny * ny);
          let offX = (nx / nLen) * 14;
          let offY = (ny / nLen) * 14;
          const toC = { x: sc.x - mx, y: sc.y - my };
          if (offX * toC.x + offY * toC.y > 0) {
            offX = -offX;
            offY = -offY;
          }

          // + button offset: opposite side of label (inward)
          let btnOffX = -offX * 0.9;
          let btnOffY = -offY * 0.9;

          return (
            <g key={`edge-${i}`} className="group/edge">
              {/* Wider invisible hover area along the edge */}
              <line
                x1={sa.x}
                y1={sa.y}
                x2={sb.x}
                y2={sb.y}
                stroke="transparent"
                strokeWidth={20}
                className="pointer-events-auto"
              />

              {/* #4: Clickable edge length label */}
              {editingEdge === i ? (
                <foreignObject
                  x={mx + offX - 25}
                  y={my + offY - 10}
                  width={50}
                  height={20}
                >
                  <input
                    type="number"
                    autoFocus
                    step="0.5"
                    min="0.5"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={commitEdit}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") commitEdit();
                      if (e.key === "Escape") setEditingEdge(null);
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      fontSize: "9px",
                      textAlign: "center",
                      border: "1px solid #eab308",
                      borderRadius: "3px",
                      outline: "none",
                      background: "white",
                      padding: 0,
                    }}
                  />
                </foreignObject>
              ) : (
                <text
                  x={mx + offX}
                  y={my + offY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="9"
                  fontWeight="600"
                  fill="#4b5563"
                  transform={`rotate(${angle}, ${mx + offX}, ${my + offY})`}
                  className="cursor-pointer hover:fill-brand-600"
                  onClick={() => startEditing(i, len)}
                >
                  {len.toFixed(1)}&apos;
                </text>
              )}

              {/* #3: + button hidden until edge hover */}
              <g
                className="cursor-pointer opacity-0 group-hover/edge:opacity-100 transition-opacity"
                onClick={() => {
                  if (tool === "flap") {
                    onAddFlap(i);
                  } else {
                    onAddPoint(i);
                  }
                }}
              >
                <circle
                  cx={mx + btnOffX}
                  cy={my + btnOffY}
                  r={7}
                  fill="white"
                  stroke={tool === "flap" ? "#eab308" : "#d1d5db"}
                  strokeWidth={1}
                />
                <text
                  x={mx + btnOffX}
                  y={my + btnOffY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="10"
                  fontWeight="bold"
                  fill={tool === "flap" ? "#a16207" : "#9ca3af"}
                >
                  +
                </text>
              </g>
            </g>
          );
        })}

        {/* Vertex handles + #2: angle labels only for non-90° */}
        {points.map((p, i) => {
          const s = toSvgLocal(p);
          const prev = points[(i - 1 + points.length) % points.length];
          const next = points[(i + 1) % points.length];
          const angle = interiorAngle(prev, p, next);
          const showAngle = angle !== 90;

          const c = centroid(points);
          const sc = toSvgLocal(c);
          const toCx = sc.x - s.x;
          const toCy = sc.y - s.y;
          const dist = Math.sqrt(toCx * toCx + toCy * toCy) || 1;
          const labelX = s.x + (toCx / dist) * 16;
          const labelY = s.y + (toCy / dist) * 16;

          return (
            <g key={`v-${i}`}>
              <circle
                cx={s.x}
                cy={s.y}
                r={10}
                fill="transparent"
                className="cursor-grab active:cursor-grabbing"
                onPointerDown={onPointerDown(i)}
                onDoubleClick={onDoubleClick(i)}
              />
              <circle
                cx={s.x}
                cy={s.y}
                r={3}
                fill="white"
                stroke="#eab308"
                strokeWidth={1.5}
                className="pointer-events-none"
              />
              {showAngle && (
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="7"
                  fill="#6b7280"
                  className="pointer-events-none"
                >
                  {angle}°
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
