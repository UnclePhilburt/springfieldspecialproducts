"use client";

import { useMemo, useRef, useState } from "react";
import { cn, formatPrice } from "@/lib/utils";

type ProductKey = "custom-tarp" | "rv-skirt" | "trailer-cover" | "straps" | "repair";
type ShapeKey = "rectangle" | "l-shape" | "t-shape" | "notched" | "flap";
type VinylKey = "18oz" | "22oz";
type GrommetKey = "24" | "18" | "12" | "none";
type MeasurementUnit = "feet" | "inches";

type Point = {
  x: number;
  y: number;
};

const products: Array<{ key: ProductKey; label: string; helper: string }> = [
  { key: "custom-tarp", label: "Custom Tarp", helper: "Build shape, choose material, quote price" },
  { key: "rv-skirt", label: "RV Skirt", helper: "Perimeter, height, fifth-wheel add-on" },
  { key: "trailer-cover", label: "Trailer Cover", helper: "Trailer size, cover type, nose/end gate" },
  { key: "straps", label: "Ratchet Straps", helper: "Length, hooks, rating, quantity" },
  { key: "repair", label: "Repair", helper: "Damage type, photos, shop review" },
];

const vinylOptions: Array<{ key: VinylKey; label: string; helper: string; rate: number }> = [
  { key: "18oz", label: "18 oz", helper: "Standard flexible tarp vinyl", rate: 1.9 },
  { key: "22oz", label: "22 oz", helper: "Heavier-duty vinyl", rate: 2.1 },
];

const colors = [
  { name: "Black", bg: "#111827" },
  { name: "White", bg: "#f9fafb" },
  { name: "Gray", bg: "#9ca3af" },
  { name: "Tan", bg: "#d7c3a3" },
  { name: "Red", bg: "#dc2626" },
  { name: "Blue", bg: "#2563eb" },
];

const grommetOptions: Array<{ key: GrommetKey; label: string; add: number; helper: string }> = [
  { key: "24", label: 'Every 24"', add: 0, helper: "Free - normal spacing" },
  { key: "18", label: 'Every 18"', add: 0, helper: "Free - more tie-down points" },
  { key: "12", label: 'Every 12"', add: 0, helper: "Free - best for wind" },
  { key: "none", label: "None", add: 0, helper: "No grommets" },
];

const shapeOptions: Array<{ key: ShapeKey; label: string; factor: number; helper: string }> = [
  { key: "rectangle", label: "Rectangle", factor: 1, helper: "Most common" },
  { key: "l-shape", label: "L-Shape", factor: 0.74, helper: "One corner missing" },
  { key: "t-shape", label: "T-Shape", factor: 0.62, helper: "Wide top, narrow middle" },
  { key: "notched", label: "Notched", factor: 0.88, helper: "Small cutout" },
  { key: "flap", label: "With Flap", factor: 1.18, helper: "Adds extra material" },
];

const quickSizes = [
  { label: "8 x 10", width: 8, length: 10 },
  { label: "10 x 12", width: 10, length: 12 },
  { label: "12 x 16", width: 12, length: 16 },
  { label: "16 x 20", width: 16, length: 20 },
  { label: "20 x 30", width: 20, length: 30 },
];

function buildShape(shape: ShapeKey, width: number, length: number): Point[] {
  if (shape === "l-shape") {
    return [
      { x: 0, y: 0 },
      { x: width, y: 0 },
      { x: width, y: length * 0.58 },
      { x: width * 0.55, y: length * 0.58 },
      { x: width * 0.55, y: length },
      { x: 0, y: length },
    ];
  }

  if (shape === "t-shape") {
    return [
      { x: 0, y: 0 },
      { x: width, y: 0 },
      { x: width, y: length * 0.32 },
      { x: width * 0.68, y: length * 0.32 },
      { x: width * 0.68, y: length },
      { x: width * 0.32, y: length },
      { x: width * 0.32, y: length * 0.32 },
      { x: 0, y: length * 0.32 },
    ];
  }

  if (shape === "notched") {
    return [
      { x: 0, y: 0 },
      { x: width, y: 0 },
      { x: width, y: length },
      { x: width * 0.72, y: length },
      { x: width * 0.72, y: length * 0.78 },
      { x: width * 0.52, y: length * 0.78 },
      { x: width * 0.52, y: length },
      { x: 0, y: length },
    ];
  }

  if (shape === "flap") {
    return [
      { x: 0, y: 0 },
      { x: width, y: 0 },
      { x: width, y: length },
      { x: width * 0.68, y: length },
      { x: width * 0.68, y: length * 1.18 },
      { x: width * 0.32, y: length * 1.18 },
      { x: width * 0.32, y: length },
      { x: 0, y: length },
    ];
  }

  return [
    { x: 0, y: 0 },
    { x: width, y: 0 },
    { x: width, y: length },
    { x: 0, y: length },
  ];
}

function getPerimeter(points: Point[]) {
  return points.reduce((sum, point, index) => {
    const next = points[(index + 1) % points.length];
    return sum + Math.hypot(next.x - point.x, next.y - point.y);
  }, 0);
}

function getArea(points: Point[]) {
  const total = points.reduce((sum, point, index) => {
    const next = points[(index + 1) % points.length];
    return sum + point.x * next.y - next.x * point.y;
  }, 0);
  return Math.abs(total / 2);
}

function getInteriorAngle(prev: Point, current: Point, next: Point) {
  const ax = prev.x - current.x;
  const ay = prev.y - current.y;
  const bx = next.x - current.x;
  const by = next.y - current.y;
  const dot = ax * bx + ay * by;
  const cross = ax * by - ay * bx;
  return Math.round(Math.atan2(Math.abs(cross), dot) * (180 / Math.PI));
}

function getBounds(points: Point[]) {
  const minX = Math.min(...points.map((point) => point.x));
  const maxX = Math.max(...points.map((point) => point.x));
  const minY = Math.min(...points.map((point) => point.y));
  const maxY = Math.max(...points.map((point) => point.y));

  return {
    minX,
    maxX,
    minY,
    maxY,
    width: maxX - minX,
    length: maxY - minY,
  };
}

function snapHalfFoot(value: number) {
  return Math.round(value * 2) / 2;
}

function snapByUnit(value: number, unit: MeasurementUnit) {
  return unit === "inches" ? Math.round(value * 12) / 12 : snapHalfFoot(value);
}

function formatMeasurement(feet: number, unit: MeasurementUnit) {
  if (unit === "inches") return `${Math.round(feet * 12)}"`;
  return `${feet.toFixed(1)}'`;
}

export default function CodyCallHelper() {
  const [activeProduct, setActiveProduct] = useState<ProductKey>("custom-tarp");
  const [shape, setShape] = useState<ShapeKey>("rectangle");
  const [width, setWidth] = useState(10);
  const [length, setLength] = useState(12);
  const [points, setPoints] = useState<Point[]>(() => buildShape("rectangle", 10, 12));
  const [measurementUnit, setMeasurementUnit] = useState<MeasurementUnit>("feet");
  const [parallelSides, setParallelSides] = useState(true);
  const [vinyl, setVinyl] = useState<VinylKey>("18oz");
  const [color, setColor] = useState("Black");
  const [grommets, setGrommets] = useState<GrommetKey>("24");
  const [rush, setRush] = useState(false);
  const [needsPhotos, setNeedsPhotos] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const area = useMemo(() => getArea(points), [points]);
  const bounds = useMemo(() => getBounds(points), [points]);
  const perimeter = useMemo(() => getPerimeter(points), [points]);
  const hemAllowanceFt = 4 / 12;
  const pricedWidth = bounds.width + hemAllowanceFt;
  const pricedLength = bounds.length + hemAllowanceFt;
  const hemAllowanceArea = Math.max(0, pricedWidth * pricedLength - bounds.width * bounds.length);
  const pricedArea = area + hemAllowanceArea;
  const vinylRate = vinylOptions.find((option) => option.key === vinyl)?.rate ?? 1.9;
  const grommetAdd = grommetOptions.find((option) => option.key === grommets)?.add ?? 0;
  const basePrice = pricedArea * (vinylRate + grommetAdd);
  const rushAdd = rush ? Math.max(25, basePrice * 0.15) : 0;
  const estimatedPrice = basePrice + rushAdd;
  const selectedColor = colors.find((option) => option.name === color) ?? colors[0];

  function setPreset(nextShape: ShapeKey) {
    setShape(nextShape);
    setPoints(buildShape(nextShape, width, length));
  }

  function applySize(nextWidth: number, nextLength: number) {
    setWidth(nextWidth);
    setLength(nextLength);
    setPoints(buildShape(shape, nextWidth, nextLength));
  }

  function applyPoints(nextPoints: Point[]) {
    const nextBounds = getBounds(nextPoints);
    setPoints(nextPoints);
    setWidth(snapByUnit(nextBounds.width, measurementUnit));
    setLength(snapByUnit(nextBounds.length, measurementUnit));

    if (nextPoints.length !== 4) {
      setParallelSides(false);
    }
  }

  const quoteSummary = [
    "Custom tarp phone estimate",
    `Shape: ${shapeOptions.find((option) => option.key === shape)?.label}`,
    `Finished bounding size: ${bounds.width.toFixed(1)}' x ${bounds.length.toFixed(1)}'`,
    `Hemmed pricing size: ${pricedWidth.toFixed(2)}' x ${pricedLength.toFixed(2)}'`,
    `Shape area: ${area.toFixed(1)} sq ft`,
    `Hem allowance area: ${hemAllowanceArea.toFixed(1)} sq ft`,
    `Priced area: ${pricedArea.toFixed(1)} sq ft`,
    `Perimeter: ${perimeter.toFixed(1)} ft`,
    `Vinyl: ${vinylOptions.find((option) => option.key === vinyl)?.label}`,
    `Color: ${color}`,
    `Grommets: ${grommetOptions.find((option) => option.key === grommets)?.label}`,
    "Edges: 2 inch hem per side included",
    `Parallel sides: ${parallelSides ? "on" : "off"}`,
    rush ? "Rush: yes" : "Rush: no",
    needsPhotos ? "Photos/sketch: needed before final quote" : "Photos/sketch: not marked needed",
    `Estimate: ${formatPrice(estimatedPrice)}`,
  ].join("\n");

  async function submitQuote() {
    setSubmitStatus("sending");

    try {
      const res = await fetch("/api/cody-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerPhone,
          customerEmail,
          product: "Custom Tarp",
          estimate: formatPrice(estimatedPrice),
          quoteSummary,
        }),
      });

      if (!res.ok) throw new Error("Quote email failed");
      setSubmitStatus("sent");
    } catch {
      setSubmitStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-dark-50">
      <section className="bg-dark-900 text-white border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
          <p className="text-brand-300 text-sm font-semibold uppercase tracking-wide">Employee Pricing Tool</p>
          <div className="mt-2 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Cody&apos;s Click Quote Desk</h1>
              <p className="mt-3 max-w-2xl text-dark-200">
                Click through the product, size, material, color, and shop options while the customer is on the phone.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <Metric label="Priced Area" value={`${pricedArea.toFixed(0)} sf`} />
              <Metric label="Perimeter" value={`${perimeter.toFixed(0)} ft`} />
              <Metric label="Estimate" value={formatPrice(estimatedPrice)} />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-[260px_minmax(0,1fr)_340px] gap-6">
          <aside className="space-y-4">
            <Panel title="Product">
              <div className="grid gap-2">
                {products.map((product) => (
                  <button
                    key={product.key}
                    type="button"
                    onClick={() => setActiveProduct(product.key)}
                    className={cn(
                      "text-left rounded-md border px-3 py-3 transition-colors",
                      activeProduct === product.key
                        ? "border-brand-500 bg-brand-50 text-dark-900"
                        : "border-dark-200 bg-white hover:border-dark-400"
                    )}
                  >
                    <span className="block text-sm font-bold">{product.label}</span>
                    <span className="mt-1 block text-xs text-dark-500">{product.helper}</span>
                  </button>
                ))}
              </div>
            </Panel>

            <Panel title="Call flags">
              <ToggleButton active={rush} onClick={() => setRush(!rush)} label="Rush job" helper="+15% or $25 minimum" />
              <ToggleButton
                active={needsPhotos}
                onClick={() => setNeedsPhotos(!needsPhotos)}
                label="Needs photo/sketch"
                helper="Mark when shape is odd"
              />
            </Panel>
          </aside>

          {activeProduct === "custom-tarp" ? (
            <main className="space-y-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <Panel title="Shape">
                  <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-2 gap-2">
                    {shapeOptions.map((option) => (
                      <OptionButton
                        key={option.key}
                        active={shape === option.key}
                        label={option.label}
                        helper={option.helper}
                        onClick={() => setPreset(option.key)}
                      />
                    ))}
                  </div>
                </Panel>

                <Panel title="Quick sizes">
                  <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-2 gap-2">
                    {quickSizes.map((size) => (
                      <button
                        key={size.label}
                        type="button"
                        onClick={() => {
                          applySize(size.width, size.length);
                        }}
                        className="rounded-md border border-dark-200 bg-white px-3 py-3 text-sm font-bold text-dark-800 hover:border-brand-500 hover:bg-brand-50"
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </Panel>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_260px] gap-5">
                <Panel title="Sizing grid">
                  <div className="mb-3 inline-grid grid-cols-2 rounded-md border border-dark-300 bg-dark-50 p-1">
                    <button
                      type="button"
                      onClick={() => setMeasurementUnit("feet")}
                      className={cn(
                        "rounded px-3 py-1.5 text-sm font-bold",
                        measurementUnit === "feet" ? "bg-dark-900 text-white" : "text-dark-600 hover:bg-white"
                      )}
                    >
                      Feet
                    </button>
                    <button
                      type="button"
                      onClick={() => setMeasurementUnit("inches")}
                      className={cn(
                        "rounded px-3 py-1.5 text-sm font-bold",
                        measurementUnit === "inches" ? "bg-dark-900 text-white" : "text-dark-600 hover:bg-white"
                      )}
                    >
                      Inches
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setParallelSides(!parallelSides)}
                    className={cn(
                      "mb-3 ml-0 block rounded-md border px-3 py-2 text-left text-sm font-bold sm:ml-3 sm:inline-block",
                      parallelSides
                        ? "border-brand-500 bg-brand-50 text-dark-900"
                        : "border-dark-300 bg-white text-dark-700 hover:bg-dark-50"
                    )}
                  >
                    Parallel sides {parallelSides ? "on" : "off"}
                    <span className="block text-xs font-medium text-dark-500">
                      {parallelSides ? "Keeps 4-corner tarps square" : "Allows slanted custom corners"}
                    </span>
                  </button>
                  <TarpPreview
                    points={points}
                    setPoints={applyPoints}
                    color={selectedColor.bg}
                    grommets={grommets}
                    unit={measurementUnit}
                    parallelSides={parallelSides}
                  />
                  <p className="mt-3 text-xs text-dark-500">
                    Drag yellow points to adjust the tarp. Parallel sides keeps normal 4-corner tarps square; turn it
                    off for slanted sides and angle labels. Feet mode snaps by half-feet; inches mode snaps by 1 inch.
                    Pricing adds 2 inches of hem per side, so 4 inches total to the priced width and length.
                  </p>
                </Panel>

                <div className="space-y-5">
                  <Panel title="Vinyl">
                    <div className="grid gap-2">
                      {vinylOptions.map((option) => (
                        <OptionButton
                          key={option.key}
                          active={vinyl === option.key}
                          label={option.label}
                          helper={`${option.helper} - ${formatPrice(option.rate)} / sq ft`}
                          onClick={() => setVinyl(option.key)}
                        />
                      ))}
                    </div>
                  </Panel>

                  <Panel title="Color">
                    <div className="grid grid-cols-3 gap-2">
                      {colors.map((option) => (
                        <button
                          key={option.name}
                          type="button"
                          onClick={() => setColor(option.name)}
                          className={cn(
                            "rounded-md border px-2 py-3 text-xs font-semibold transition-colors",
                            color === option.name
                              ? "border-brand-500 bg-brand-50 text-dark-900"
                              : "border-dark-200 bg-white text-dark-700 hover:border-dark-400"
                          )}
                        >
                          <span
                            className="mx-auto mb-2 block h-7 w-7 rounded-full border border-dark-300"
                            style={{ background: option.bg }}
                          />
                          {option.name}
                        </button>
                      ))}
                    </div>
                  </Panel>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5">
                <Panel title="Grommets">
                  <div className="grid grid-cols-2 gap-2">
                    {grommetOptions.map((option) => (
                      <OptionButton
                        key={option.key}
                        active={grommets === option.key}
                        label={option.label}
                        helper={option.helper}
                        onClick={() => setGrommets(option.key)}
                      />
                    ))}
                  </div>
                </Panel>
              </div>
            </main>
          ) : (
            <main>
              <Panel title={`${products.find((product) => product.key === activeProduct)?.label} click tool`}>
                <div className="rounded-md bg-brand-50 border border-brand-200 p-5">
                  <h2 className="text-xl font-bold text-dark-900">Next up after the tarp tool</h2>
                  <p className="mt-2 text-dark-700">
                    This section is ready for its own click-based builder. The tarp quote station is the first full one,
                    then we can add the same damn style for this product.
                  </p>
                </div>
              </Panel>
            </main>
          )}

          <aside className="space-y-5 xl:sticky xl:top-24 self-start">
            <Panel title="Customer">
              <div className="space-y-3">
                <TextInput label="Name" value={customerName} onChange={setCustomerName} placeholder="Customer name" />
                <TextInput label="Phone" value={customerPhone} onChange={setCustomerPhone} placeholder="Phone number" />
                <TextInput label="Email" value={customerEmail} onChange={setCustomerEmail} placeholder="Email if given" />
              </div>
            </Panel>

            <div className="rounded-lg bg-dark-900 text-white p-5">
              <h2 className="text-sm font-bold uppercase tracking-wide text-brand-300">Phone price</h2>
              <div className="mt-3 text-4xl font-extrabold">{formatPrice(estimatedPrice)}</div>
              <div className="mt-4 space-y-2 text-sm text-dark-100">
                <PriceRow label="Shape area" value={`${area.toFixed(1)} sq ft`} />
                <PriceRow label="Hem allowance" value={`${hemAllowanceArea.toFixed(1)} sq ft`} />
                <PriceRow label="Priced area" value={`${pricedArea.toFixed(1)} sq ft`} />
                <PriceRow label="Vinyl rate" value={`${formatPrice(vinylRate)} / sq ft`} />
                <PriceRow label="Grommets" value="Free" />
                <PriceRow label="Hemmed edges" value="Included" />
                {rush && <PriceRow label="Rush add" value={formatPrice(rushAdd)} />}
              </div>
              <p className="mt-4 text-xs text-dark-300">
                Estimate only. Final quote can change after shop review, measurements, and photos.
              </p>
            </div>

            <Panel title="What to tell the customer">
              <div className="space-y-3 text-sm text-dark-700">
                <p>Estimated price is {formatPrice(estimatedPrice)} before final shop review.</p>
                <p>
                  Good pick: {vinyl === "22oz" ? "22 oz for tougher use." : "18 oz for standard flexible coverage."}
                </p>
                {grommets === "12" && <p>12 inch grommets are a good call when wind is a problem.</p>}
                <p>The 2 inch hem on each side is included and covers the normal edge reinforcement.</p>
                {needsPhotos && <p>Ask them to send a photo or sketch before promising the final number.</p>}
              </div>
            </Panel>

            <Panel title="Shop summary">
              <textarea
                readOnly
                value={quoteSummary}
                rows={13}
                className="w-full rounded-md border border-dark-300 bg-dark-50 px-3 py-2 text-sm text-dark-900 outline-none"
              />
              <button
                type="button"
                onClick={submitQuote}
                disabled={submitStatus === "sending"}
                className="mt-3 w-full rounded-md bg-brand-500 px-4 py-3 text-sm font-extrabold text-dark-900 transition-colors hover:bg-brand-400 disabled:cursor-not-allowed disabled:bg-dark-300 disabled:text-dark-600"
              >
                {submitStatus === "sending" ? "Sending..." : "Submit Quote Email"}
              </button>
              {submitStatus === "sent" && (
                <p className="mt-2 rounded-md bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">
                  Quote email sent.
                </p>
              )}
              {submitStatus === "error" && (
                <p className="mt-2 rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
                  Could not send quote email. Check Brevo settings.
                </p>
              )}
            </Panel>
          </aside>
        </div>
      </section>
    </div>
  );
}

function TarpPreview({
  points,
  setPoints,
  color,
  grommets,
  unit,
  parallelSides,
}: {
  points: Point[];
  setPoints: (points: Point[]) => void;
  color: string;
  grommets: GrommetKey;
  unit: MeasurementUnit;
  parallelSides: boolean;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const dragState = useRef<{
    index: number;
    startClientX: number;
    startClientY: number;
    startPoint: Point;
    startPoints: Point[];
    rectWidth: number;
    rectHeight: number;
    viewW: number;
    viewH: number;
  } | null>(null);
  const bounds = getBounds(points);
  const pad = 4;
  const scale = 12;
  const viewMinXFt = Math.min(-pad, bounds.minX - pad);
  const viewMinYFt = Math.min(-pad, bounds.minY - pad);
  const viewMaxXFt = Math.max(20, bounds.maxX + pad);
  const viewMaxYFt = Math.max(20, bounds.maxY + pad);
  const viewX = viewMinXFt * scale;
  const viewY = viewMinYFt * scale;
  const viewW = (viewMaxXFt - viewMinXFt) * scale;
  const viewH = (viewMaxYFt - viewMinYFt) * scale;
  const poly = points.map((point) => `${point.x * scale},${point.y * scale}`).join(" ");
  const gridLines = [];
  const gridStepFt = unit === "inches" ? 0.5 : 2;
  const majorEveryFt = unit === "inches" ? 1 : 10;

  const gridStartX = Math.floor(viewMinXFt / gridStepFt) * gridStepFt;
  const gridEndX = Math.ceil(viewMaxXFt / gridStepFt) * gridStepFt;
  const gridStartY = Math.floor(viewMinYFt / gridStepFt) * gridStepFt;
  const gridEndY = Math.ceil(viewMaxYFt / gridStepFt) * gridStepFt;

  for (let x = gridStartX; x <= gridEndX; x += gridStepFt) {
    const isMajor = Math.abs(x % majorEveryFt) < 0.001;
    gridLines.push(
      <line
        key={`x-${x.toFixed(2)}`}
        x1={x * scale}
        y1={viewY}
        x2={x * scale}
        y2={viewY + viewH}
        stroke={isMajor ? "#d1d5db" : "#e5e7eb"}
        strokeWidth={isMajor ? "1" : "0.6"}
      />,
    );
  }
  for (let y = gridStartY; y <= gridEndY; y += gridStepFt) {
    const isMajor = Math.abs(y % majorEveryFt) < 0.001;
    gridLines.push(
      <line
        key={`y-${y.toFixed(2)}`}
        x1={viewX}
        y1={y * scale}
        x2={viewX + viewW}
        y2={y * scale}
        stroke={isMajor ? "#d1d5db" : "#e5e7eb"}
        strokeWidth={isMajor ? "1" : "0.6"}
      />,
    );
  }

  const spacingFt = grommets === "none" ? 0 : Number(grommets) / 12;

  function toScreen(point: Point) {
    return {
      x: point.x * scale,
      y: point.y * scale,
    };
  }

  function updateDrag(clientX: number, clientY: number) {
    if (!dragState.current) return;
    const drag = dragState.current;
    const deltaX = ((clientX - drag.startClientX) * drag.viewW) / drag.rectWidth / scale;
    const deltaY = ((clientY - drag.startClientY) * drag.viewH) / drag.rectHeight / scale;
    const nextPoint = {
      x: Math.max(-60, Math.min(60, snapByUnit(drag.startPoint.x + deltaX, unit))),
      y: Math.max(-60, Math.min(60, snapByUnit(drag.startPoint.y + deltaY, unit))),
    };

    if (parallelSides && drag.startPoints.length === 4) {
      setPoints(resizeRectangleFromCorner(drag.startPoints, drag.index, nextPoint));
      return;
    }

    setPoints(drag.startPoints.map((point, index) => (index === drag.index ? nextPoint : point)));
  }

  function endDrag() {
    dragState.current = null;
  }

  function addPointOnEdge(edgeIndex: number) {
    const start = points[edgeIndex];
    const end = points[(edgeIndex + 1) % points.length];
    const midpoint = {
      x: snapByUnit((start.x + end.x) / 2, unit),
      y: snapByUnit((start.y + end.y) / 2, unit),
    };
    const nextPoints = [...points];
    nextPoints.splice(edgeIndex + 1, 0, midpoint);
    setPoints(nextPoints);
  }

  function removePoint(pointIndex: number) {
    if (points.length <= 3) return;
    setPoints(points.filter((_, index) => index !== pointIndex));
  }

  return (
    <div className="relative overflow-hidden rounded-lg border border-dark-200 bg-white">
      <svg
        ref={svgRef}
        viewBox={`${viewX} ${viewY} ${viewW} ${viewH}`}
        className="aspect-[4/3] w-full touch-none select-none"
        onPointerMove={(event) => updateDrag(event.clientX, event.clientY)}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <rect x={viewX} y={viewY} width={viewW} height={viewH} fill="#f9fafb" />
        {gridLines}
        <polygon points={poly} fill={color} fillOpacity="0.42" stroke="#374151" strokeWidth="3" strokeDasharray="8 5" />
        {points.map((point, index) => {
          const next = points[(index + 1) % points.length];
          const a = toScreen(point);
          const b = toScreen(next);
          const ax = a.x;
          const ay = a.y;
          const bx = b.x;
          const by = b.y;
          const len = Math.hypot(next.x - point.x, next.y - point.y);
          const midX = (ax + bx) / 2;
          const midY = (ay + by) / 2;
          const grommetCount = spacingFt > 0 ? Math.max(2, Math.floor(len / spacingFt) + 1) : 0;

          return (
            <g key={`edge-${index}`}>
              <line
                x1={ax}
                y1={ay}
                x2={bx}
                y2={by}
                stroke="transparent"
                strokeWidth="18"
                className="cursor-copy"
                onDoubleClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  addPointOnEdge(index);
                }}
              />
              <text x={midX} y={midY - 8} textAnchor="middle" fontSize="12" fontWeight="700" fill="#111827">
                {formatMeasurement(len, unit)}
              </text>
              {Array.from({ length: grommetCount }).map((_, grommetIndex) => {
                const t = grommetIndex / Math.max(grommetCount - 1, 1);
                return (
                  <circle
                    key={`g-${index}-${grommetIndex}`}
                    cx={ax + (bx - ax) * t}
                    cy={ay + (by - ay) * t}
                    r="2"
                    fill="#4b5563"
                  />
                );
              })}
            </g>
          );
        })}
        {points.map((point, index) => {
          const screenPoint = toScreen(point);
          const prev = points[(index - 1 + points.length) % points.length];
          const next = points[(index + 1) % points.length];
          const angle = getInteriorAngle(prev, point, next);

          return (
            <g key={`handle-${index}`}>
              <circle
                cx={screenPoint.x}
                cy={screenPoint.y}
                r="13"
                fill="transparent"
                className="cursor-grab active:cursor-grabbing"
                onPointerDown={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  const rect = svgRef.current?.getBoundingClientRect();
                  if (!rect) return;
                  dragState.current = {
                    index,
                    startClientX: event.clientX,
                    startClientY: event.clientY,
                    startPoint: point,
                    startPoints: points,
                    rectWidth: rect.width,
                    rectHeight: rect.height,
                    viewW,
                    viewH,
                  };
                  (event.currentTarget as SVGCircleElement).setPointerCapture(event.pointerId);
                }}
                onPointerMove={(event) => {
                  if (dragState.current?.index !== index) return;
                  event.preventDefault();
                  event.stopPropagation();
                  updateDrag(event.clientX, event.clientY);
                }}
                onPointerUp={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  (event.currentTarget as SVGCircleElement).releasePointerCapture(event.pointerId);
                  endDrag();
                }}
                onPointerCancel={endDrag}
                onLostPointerCapture={endDrag}
                onDoubleClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  removePoint(index);
                }}
              />
              <circle
                cx={screenPoint.x}
                cy={screenPoint.y}
                r="5"
                fill="#ffffff"
                stroke="#eab308"
                strokeWidth="2"
                className="pointer-events-none"
              />
              {!parallelSides && (
                <text
                  x={screenPoint.x + 10}
                  y={screenPoint.y - 10}
                  fontSize="10"
                  fontWeight="700"
                  fill="#854d0e"
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

function resizeRectangleFromCorner(points: Point[], cornerIndex: number, nextPoint: Point) {
  const opposite = points[(cornerIndex + 2) % 4];

  if (cornerIndex === 0) {
    return [
      { x: nextPoint.x, y: nextPoint.y },
      { x: opposite.x, y: nextPoint.y },
      opposite,
      { x: nextPoint.x, y: opposite.y },
    ];
  }

  if (cornerIndex === 1) {
    return [
      { x: opposite.x, y: nextPoint.y },
      { x: nextPoint.x, y: nextPoint.y },
      { x: nextPoint.x, y: opposite.y },
      opposite,
    ];
  }

  if (cornerIndex === 2) {
    return [
      opposite,
      { x: nextPoint.x, y: opposite.y },
      { x: nextPoint.x, y: nextPoint.y },
      { x: opposite.x, y: nextPoint.y },
    ];
  }

  return [
    { x: nextPoint.x, y: opposite.y },
    opposite,
    { x: opposite.x, y: nextPoint.y },
    { x: nextPoint.x, y: nextPoint.y },
  ];
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-dark-200 bg-white p-4">
      <h2 className="text-sm font-bold uppercase tracking-wide text-dark-900">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function OptionButton({
  active,
  label,
  helper,
  onClick,
}: {
  active: boolean;
  label: string;
  helper: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-16 rounded-md border px-3 py-3 text-left transition-colors",
        active ? "border-brand-500 bg-brand-50 text-dark-900" : "border-dark-200 bg-white hover:border-dark-400"
      )}
    >
      <span className="block text-sm font-bold">{label}</span>
      <span className="mt-1 block text-xs text-dark-500">{helper}</span>
    </button>
  );
}

function ToggleButton({
  active,
  label,
  helper,
  onClick,
}: {
  active: boolean;
  label: string;
  helper: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "mb-2 w-full rounded-md border px-3 py-3 text-left transition-colors",
        active ? "border-brand-500 bg-brand-50 text-dark-900" : "border-dark-200 bg-white hover:border-dark-400"
      )}
    >
      <span className="block text-sm font-bold">{label}</span>
      <span className="mt-1 block text-xs text-dark-500">{helper}</span>
    </button>
  );
}

function TextInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-dark-500">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-md border border-dark-300 bg-white px-3 py-2 text-sm text-dark-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
      />
    </label>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-24 rounded-lg border border-dark-700 bg-dark-800 px-4 py-3">
      <div className="text-lg font-bold text-brand-300">{value}</div>
      <div className="text-xs text-dark-300">{label}</div>
    </div>
  );
}

function PriceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 border-b border-dark-700 pb-2">
      <span className="text-dark-300">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
