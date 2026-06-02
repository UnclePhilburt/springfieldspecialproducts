"use client";

import { useMemo, useRef, useState } from "react";
import { cn, formatPrice } from "@/lib/utils";

type ProductKey = "custom-tarp" | "rv-skirt" | "trailer-cover" | "straps" | "repair";
type VinylKey = "18oz" | "22oz";
type GrommetKey = "24" | "18" | "12" | "none";
type MeasurementUnit = "feet" | "inches";
type RigType = "travel_trailer" | "fifth_wheel" | "motorhome";

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

const rvMainPrices: Record<number, number> = {
  50: 610,
  55: 670,
  60: 730,
  65: 790,
  70: 850,
  75: 910,
  80: 960,
  85: 1020,
  90: 1070,
  95: 1130,
  100: 1180,
};

const fifthWheelSkirtPrice = 345;

const rigOptions: Array<{ key: RigType; label: string; helper: string }> = [
  { key: "travel_trailer", label: "Travel Trailer", helper: "Standard bumper pull" },
  { key: "fifth_wheel", label: "5th Wheel", helper: "Gooseneck hitch" },
  { key: "motorhome", label: "Motorhome", helper: "Class A, B, or C" },
];

const rvPerimeterOptions = [
  { value: 50, helper: "Small trailer" },
  { value: 60, helper: "Average" },
  { value: 70, helper: "Larger rig" },
  { value: 80, helper: "Big 5th wheel" },
  { value: 90, helper: "Extra large" },
  { value: 100, helper: "Maximum" },
];

const rvClearanceOptions = [
  { value: 10, helper: "Low profile" },
  { value: 12, helper: "Standard" },
  { value: 14, helper: "Common" },
  { value: 16, helper: "Above average" },
  { value: 18, helper: "High clearance" },
  { value: 20, helper: "Extra high" },
];

const rvColors = [
  { name: "Black", bg: "#111827" },
  { name: "Light Gray", bg: "#cbd5e1" },
  { name: "Tan", bg: "#d7c3a3" },
  { name: "White", bg: "#f9fafb" },
];

function buildRectangle(width: number, length: number): Point[] {
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

function calculateRVSkirt(perimeter: number, clearance: number) {
  const bufferFt = Math.round(perimeter * 0.05 * 100) / 100;
  const neededFt = perimeter + bufferFt;
  const roundedFt = Math.max(Math.ceil(neededFt / 5) * 5, 50);
  const cappedFt = Math.min(roundedFt, 100);
  const height = clearance + 6 <= 20 ? '27"' : '44"';

  return { bufferFt, roundedFt: cappedFt, height };
}

export default function CodyCallHelper() {
  const [activeProduct, setActiveProduct] = useState<ProductKey>("custom-tarp");
  const [points, setPoints] = useState<Point[]>(() => buildRectangle(10, 12));
  const [measurementUnit, setMeasurementUnit] = useState<MeasurementUnit>("feet");
  const [parallelSides, setParallelSides] = useState(true);
  const [vinyl, setVinyl] = useState<VinylKey>("22oz");
  const [color, setColor] = useState("Black");
  const [grommets, setGrommets] = useState<GrommetKey>("24");
  const [rvRig, setRvRig] = useState<RigType>("travel_trailer");
  const [rvPerimeter, setRvPerimeter] = useState(60);
  const [rvClearance, setRvClearance] = useState(12);
  const [rvColor, setRvColor] = useState("Black");
  const [includeFifthWheelSkirt, setIncludeFifthWheelSkirt] = useState(false);
  const [rvFifthWheelColor, setRvFifthWheelColor] = useState("Black");
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
  const estimatedPrice = pricedArea * (vinylRate + grommetAdd);
  const selectedColor = colors.find((option) => option.name === color) ?? colors[0];
  const selectedProduct = products.find((product) => product.key === activeProduct) ?? products[0];
  const rvCalc = calculateRVSkirt(rvPerimeter, rvClearance);
  const rvBasePrice = rvMainPrices[rvCalc.roundedFt] ?? rvMainPrices[100];
  const rvEstimatedPrice = rvBasePrice + (includeFifthWheelSkirt ? fifthWheelSkirtPrice : 0);
  const rvRigLabel = rigOptions.find((option) => option.key === rvRig)?.label ?? "RV";
  const activeEstimate = activeProduct === "rv-skirt" ? rvEstimatedPrice : estimatedPrice;
  const activeMetrics =
    activeProduct === "rv-skirt"
      ? [
          { label: "Kit Length", value: `${rvCalc.roundedFt} ft` },
          { label: "Height", value: rvCalc.height },
          { label: "Estimate", value: formatPrice(rvEstimatedPrice) },
        ]
      : [
          { label: "Priced Area", value: `${pricedArea.toFixed(0)} sf` },
          { label: "Perimeter", value: `${perimeter.toFixed(0)} ft` },
          { label: "Estimate", value: formatPrice(estimatedPrice) },
        ];

  function applyPoints(nextPoints: Point[]) {
    setPoints(nextPoints);

    if (nextPoints.length !== 4) {
      setParallelSides(false);
    }
  }

  const tarpQuoteSummary = [
    "Custom tarp phone estimate",
    "Shape: Custom drawn",
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
    `Estimate: ${formatPrice(estimatedPrice)}`,
  ].join("\n");

  const rvQuoteSummary = [
    "RV skirt phone estimate",
    `RV type: ${rvRigLabel}`,
    `Measured perimeter: ${rvPerimeter} ft`,
    `5% buffer: ${rvCalc.bufferFt.toFixed(2)} ft`,
    `Kit length: ${rvCalc.roundedFt} ft`,
    `Ground clearance: ${rvClearance}"`,
    `Skirt height: ${rvCalc.height}`,
    `Color: ${rvColor}`,
    includeFifthWheelSkirt
      ? `Fifth-wheel hitch skirt: yes, ${rvFifthWheelColor} (+${formatPrice(fifthWheelSkirtPrice)})`
      : "Fifth-wheel hitch skirt: no",
    `Estimate: ${formatPrice(rvEstimatedPrice)}`,
  ].join("\n");

  const quoteSummary = activeProduct === "rv-skirt" ? rvQuoteSummary : tarpQuoteSummary;

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
          product: selectedProduct.label,
          estimate: formatPrice(activeEstimate),
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
        <div className="mx-auto max-w-[1800px] px-4 py-7 sm:px-6 lg:px-8">
          <p className="text-brand-300 text-sm font-semibold uppercase tracking-wide">Employee Pricing Tool</p>
          <div className="mt-2 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(260px,380px)_minmax(300px,auto)] xl:items-end">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Cody&apos;s Click Quote Desk</h1>
              <p className="mt-3 text-dark-200">
                Click through the product, size, material, color, and shop options while the customer is on the phone.
              </p>
            </div>
            <label className="w-full max-w-sm">
              <span className="text-xs font-bold uppercase tracking-wide text-dark-300">Product</span>
              <select
                value={activeProduct}
                onChange={(event) => setActiveProduct(event.target.value as ProductKey)}
                className="mt-1 w-full rounded-md border border-dark-600 bg-dark-800 px-3 py-3 text-sm font-bold text-white outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-300/30"
              >
                {products.map((product) => (
                  <option key={product.key} value={product.key}>
                    {product.label}
                  </option>
                ))}
              </select>
              <span className="mt-1 block text-xs text-dark-300">{selectedProduct.helper}</span>
            </label>
            <div className="grid grid-cols-1 gap-3 text-center sm:grid-cols-3 xl:min-w-[300px]">
              {activeMetrics.map((metric) => (
                <Metric key={metric.label} label={metric.label} value={metric.value} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1800px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 min-[1500px]:grid-cols-[minmax(0,1fr)_minmax(300px,360px)]">
          {activeProduct === "custom-tarp" ? (
            <main className="grid min-w-0 gap-5">
              <div className="grid min-w-0 grid-cols-1 gap-5 min-[1700px]:grid-cols-[minmax(0,1fr)_minmax(230px,280px)]">
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
                    <ColorSwatchGrid options={colors} selected={color} onSelect={setColor} />
                  </Panel>
                </div>
              </div>

              <div className="order-3 grid grid-cols-1 gap-5">
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
          ) : activeProduct === "rv-skirt" ? (
            <main className="grid min-w-0 gap-5">
              <RVSkirtTool
                rig={rvRig}
                setRig={(nextRig) => {
                  setRvRig(nextRig);
                  setIncludeFifthWheelSkirt(nextRig === "fifth_wheel");
                }}
                perimeter={rvPerimeter}
                setPerimeter={setRvPerimeter}
                clearance={rvClearance}
                setClearance={setRvClearance}
                color={rvColor}
                setColor={setRvColor}
                includeFifthWheelSkirt={includeFifthWheelSkirt}
                setIncludeFifthWheelSkirt={setIncludeFifthWheelSkirt}
                fifthWheelColor={rvFifthWheelColor}
                setFifthWheelColor={setRvFifthWheelColor}
                calc={rvCalc}
                price={rvEstimatedPrice}
              />
            </main>
          ) : (
            <main className="min-w-0">
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

          <aside className="self-start space-y-5 md:grid md:grid-cols-2 md:gap-5 md:space-y-0 min-[1500px]:sticky min-[1500px]:top-24 min-[1500px]:block min-[1500px]:space-y-5">
            <Panel title="Customer">
              <div className="space-y-3">
                <TextInput label="Name" value={customerName} onChange={setCustomerName} placeholder="Customer name" />
                <TextInput label="Phone" value={customerPhone} onChange={setCustomerPhone} placeholder="Phone number" />
                <TextInput label="Email" value={customerEmail} onChange={setCustomerEmail} placeholder="Email if given" />
              </div>
            </Panel>

            <div className="rounded-lg bg-dark-900 text-white p-5">
              <h2 className="text-sm font-bold uppercase tracking-wide text-brand-300">Phone price</h2>
              <div className="mt-3 text-4xl font-extrabold">{formatPrice(activeEstimate)}</div>
              <div className="mt-4 space-y-2 text-sm text-dark-100">
                {activeProduct === "rv-skirt" ? (
                  <>
                    <PriceRow label="RV type" value={rvRigLabel} />
                    <PriceRow label="Measured perimeter" value={`${rvPerimeter} ft`} />
                    <PriceRow label="With buffer" value={`${rvCalc.roundedFt} ft`} />
                    <PriceRow label="Skirt height" value={rvCalc.height} />
                    <PriceRow label="Base kit" value={formatPrice(rvBasePrice)} />
                    {includeFifthWheelSkirt && <PriceRow label="Hitch skirt" value={formatPrice(fifthWheelSkirtPrice)} />}
                  </>
                ) : (
                  <>
                    <PriceRow label="Shape area" value={`${area.toFixed(1)} sq ft`} />
                    <PriceRow label="Hem allowance" value={`${hemAllowanceArea.toFixed(1)} sq ft`} />
                    <PriceRow label="Priced area" value={`${pricedArea.toFixed(1)} sq ft`} />
                    <PriceRow label="Vinyl rate" value={`${formatPrice(vinylRate)} / sq ft`} />
                    <PriceRow label="Grommets" value="Free" />
                    <PriceRow label="Hemmed edges" value="Included" />
                  </>
                )}
              </div>
              <p className="mt-4 text-xs text-dark-300">
                Estimate only. Final quote can change after shop review, measurements, and photos.
              </p>
            </div>

            <Panel title="What to tell the customer">
              <div className="space-y-3 text-sm text-dark-700">
                {activeProduct === "rv-skirt" ? (
                  <>
                    <p>Estimated RV skirt price is {formatPrice(rvEstimatedPrice)} before final shop review.</p>
                    <p>Measured perimeter gets a 5% buffer and rounds up to a {rvCalc.roundedFt} ft kit.</p>
                    <p>Clearance of {rvClearance}&quot; uses the {rvCalc.height} skirt height.</p>
                    {includeFifthWheelSkirt && <p>Price includes the fifth-wheel hitch skirt add-on.</p>}
                  </>
                ) : (
                  <>
                    <p>Estimated price is {formatPrice(estimatedPrice)} before final shop review.</p>
                    <p>
                      Good pick: {vinyl === "22oz" ? "22 oz for tougher use." : "18 oz for standard flexible coverage."}
                    </p>
                    {grommets === "12" && <p>12 inch grommets are a good call when wind is a problem.</p>}
                    <p>The 2 inch hem on each side is included and covers the normal edge reinforcement.</p>
                  </>
                )}
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

function RVSkirtTool({
  rig,
  setRig,
  perimeter,
  setPerimeter,
  clearance,
  setClearance,
  color,
  setColor,
  includeFifthWheelSkirt,
  setIncludeFifthWheelSkirt,
  fifthWheelColor,
  setFifthWheelColor,
  calc,
  price,
}: {
  rig: RigType;
  setRig: (rig: RigType) => void;
  perimeter: number;
  setPerimeter: (perimeter: number) => void;
  clearance: number;
  setClearance: (clearance: number) => void;
  color: string;
  setColor: (color: string) => void;
  includeFifthWheelSkirt: boolean;
  setIncludeFifthWheelSkirt: (include: boolean) => void;
  fifthWheelColor: string;
  setFifthWheelColor: (color: string) => void;
  calc: ReturnType<typeof calculateRVSkirt>;
  price: number;
}) {
  return (
    <div className="grid gap-5">
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Panel title="RV type">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 xl:grid-cols-1">
            {rigOptions.map((option) => (
              <OptionButton
                key={option.key}
                active={rig === option.key}
                label={option.label}
                helper={option.helper}
                onClick={() => setRig(option.key)}
              />
            ))}
          </div>
        </Panel>

        <Panel title="Perimeter">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {rvPerimeterOptions.map((option) => (
              <OptionButton
                key={option.value}
                active={perimeter === option.value}
                label={`${option.value} ft`}
                helper={option.helper}
                onClick={() => setPerimeter(option.value)}
              />
            ))}
          </div>
          <p className="mt-3 text-xs text-dark-500">
            Customer should measure around the RV at ground level with slide-outs extended.
          </p>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Panel title="Ground clearance">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {rvClearanceOptions.map((option) => (
              <OptionButton
                key={option.value}
                active={clearance === option.value}
                label={`${option.value}"`}
                helper={option.helper}
                onClick={() => setClearance(option.value)}
              />
            ))}
          </div>
          <div className="mt-3 rounded-md bg-dark-50 px-3 py-2 text-sm text-dark-700">
            Uses <strong>{calc.height}</strong> skirt height. Adds 6&quot; to clearance when choosing height.
          </div>
        </Panel>

        <Panel title="Skirt color">
          <ColorSwatchGrid options={rvColors} selected={color} onSelect={setColor} />
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <Panel title="Fifth-wheel hitch skirt">
          <div className="grid grid-cols-2 gap-2">
            <OptionButton
              active={includeFifthWheelSkirt}
              label="Add hitch skirt"
              helper={`Adds ${formatPrice(fifthWheelSkirtPrice)}`}
              onClick={() => setIncludeFifthWheelSkirt(true)}
            />
            <OptionButton
              active={!includeFifthWheelSkirt}
              label="No hitch skirt"
              helper="Main skirt only"
              onClick={() => setIncludeFifthWheelSkirt(false)}
            />
          </div>
          {includeFifthWheelSkirt && (
            <div className="mt-4">
              <h3 className="text-xs font-bold uppercase tracking-wide text-dark-500">Hitch skirt color</h3>
              <div className="mt-2">
                <ColorSwatchGrid options={rvColors} selected={fifthWheelColor} onSelect={setFifthWheelColor} />
              </div>
            </div>
          )}
        </Panel>

        <div className="rounded-lg bg-dark-900 p-5 text-white">
          <h2 className="text-sm font-bold uppercase tracking-wide text-brand-300">RV skirt estimate</h2>
          <div className="mt-3 text-4xl font-extrabold">{formatPrice(price)}</div>
          <div className="mt-4 space-y-2 text-sm text-dark-100">
            <PriceRow label="Measured" value={`${perimeter} ft`} />
            <PriceRow label="5% buffer" value={`${calc.bufferFt.toFixed(2)} ft`} />
            <PriceRow label="Kit length" value={`${calc.roundedFt} ft`} />
            <PriceRow label="Height" value={calc.height} />
          </div>
        </div>
      </div>
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
        className="h-[380px] w-full touch-none select-none sm:h-[460px] lg:h-[560px] 2xl:h-[620px]"
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

function ColorSwatchGrid({
  options,
  selected,
  onSelect,
}: {
  options: Array<{ name: string; bg: string }>;
  selected: string;
  onSelect: (color: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-2">
      {options.map((option) => (
        <button
          key={option.name}
          type="button"
          onClick={() => onSelect(option.name)}
          className={cn(
            "rounded-md border px-2 py-3 text-xs font-semibold transition-colors",
            selected === option.name
              ? "border-brand-500 bg-brand-50 text-dark-900"
              : "border-dark-200 bg-white text-dark-700 hover:border-dark-400"
          )}
        >
          <span className="mx-auto mb-2 block h-7 w-7 rounded-full border border-dark-300" style={{ background: option.bg }} />
          {option.name}
        </button>
      ))}
    </div>
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
