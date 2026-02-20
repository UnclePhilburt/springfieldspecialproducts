"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

// ── Types ───────────────────────────────────────────────────────
type RigType = "travel_trailer" | "fifth_wheel" | "motorhome" | "";

interface BuilderState {
  rig: RigType;
  includeFW: boolean;
  perimeter: number;
  clearance: number;
  mainColor: string;
  fwColor: string;
}

// ── Pricing ─────────────────────────────────────────────────────
const MAIN_PRICES: Record<number, number> = {
  50: 610, 55: 670, 60: 730, 65: 790, 70: 850,
  75: 910, 80: 960, 85: 1020, 90: 1070, 95: 1130, 100: 1180,
};
const FW_PRICE = 345;

function calculate(perimeter: number, clearance: number) {
  const bufferFt = Math.round(perimeter * 0.05 * 100) / 100;
  const neededFt = perimeter + bufferFt;
  const roundedFt = Math.max(Math.ceil(neededFt / 5) * 5, 50);
  const capped = Math.min(roundedFt, 100);
  const height = clearance + 6 <= 20 ? '27"' : '44"';
  return { bufferFt, roundedFt: capped, height };
}

function getPrice(state: BuilderState) {
  const { roundedFt } = calculate(state.perimeter, state.clearance);
  const base = MAIN_PRICES[roundedFt] ?? MAIN_PRICES[100];
  return base + (state.includeFW ? FW_PRICE : 0);
}

// ── Steps ───────────────────────────────────────────────────────
const STEPS = [
  { num: 1, label: "RV Type" },
  { num: 2, label: "Perimeter" },
  { num: 3, label: "Clearance" },
  { num: 4, label: "Color" },
  { num: 5, label: "Review" },
];

const FW_STEPS = [
  { num: 1, label: "RV Type" },
  { num: 2, label: "Perimeter" },
  { num: 3, label: "Clearance" },
  { num: 4, label: "Color" },
  { num: 5, label: "Hitch Color" },
  { num: 6, label: "Review" },
];

// ── Component ───────────────────────────────────────────────────
export default function RVSkirtBuilder() {
  const [scene, setScene] = useState(1);
  const [history, setHistory] = useState([1]);
  const [state, setState] = useState<BuilderState>({
    rig: "", includeFW: false, perimeter: 0, clearance: 0, mainColor: "", fwColor: "Black",
  });
  const [showFWModal, setShowFWModal] = useState(false);

  const goTo = useCallback((s: number) => {
    setScene(s);
    setHistory((h) => [...h, s]);
  }, []);

  const goBack = useCallback(() => {
    setHistory((h) => {
      if (h.length <= 1) return h;
      const next = h.slice(0, -1);
      setScene(next[next.length - 1]);
      return next;
    });
  }, []);

  function handleAddToCart() {
    const calc = calculate(state.perimeter, state.clearance);
    const price = getPrice(state);

    const btn = document.createElement("button");
    btn.className = "snipcart-add-item";
    btn.style.display = "none";
    btn.setAttribute("data-item-id", `rv-skirt-${calc.roundedFt}-${state.mainColor}`);
    btn.setAttribute("data-item-name", `Custom RV Skirt Kit – ${calc.roundedFt} ft / ${calc.height} / ${state.mainColor}`);
    btn.setAttribute("data-item-price", String(price));
    btn.setAttribute("data-item-url", "/build/rv-skirt");
    btn.setAttribute("data-item-description", `${state.rig.replace("_", " ")} RV skirt, ${calc.roundedFt} ft, ${calc.height} height, ${state.mainColor}`);
    btn.setAttribute("data-item-custom1-name", "RV Type");
    btn.setAttribute("data-item-custom1-value", state.rig.replace("_", " "));
    btn.setAttribute("data-item-custom2-name", "Perimeter");
    btn.setAttribute("data-item-custom2-value", `${state.perimeter} ft (+ ${calc.bufferFt} ft buffer = ${calc.roundedFt} ft)`);
    btn.setAttribute("data-item-custom3-name", "Height");
    btn.setAttribute("data-item-custom3-value", calc.height);
    btn.setAttribute("data-item-custom4-name", "Color");
    btn.setAttribute("data-item-custom4-value", state.mainColor);
    document.body.appendChild(btn);
    btn.click();
    setTimeout(() => btn.remove(), 500);

    if (state.includeFW) {
      setTimeout(() => {
        const fwBtn = document.createElement("button");
        fwBtn.className = "snipcart-add-item";
        fwBtn.style.display = "none";
        fwBtn.setAttribute("data-item-id", `fw-skirt-${state.fwColor}`);
        fwBtn.setAttribute("data-item-name", `Fifth-Wheel Hitch Skirt – ${state.fwColor}`);
        fwBtn.setAttribute("data-item-price", String(FW_PRICE));
        fwBtn.setAttribute("data-item-url", "/build/rv-skirt");
        fwBtn.setAttribute("data-item-description", `Fifth-wheel hitch skirt add-on, ${state.fwColor}`);
        document.body.appendChild(fwBtn);
        fwBtn.click();
        setTimeout(() => fwBtn.remove(), 500);
      }, 300);
    }
  }

  const calc = state.perimeter > 0 && state.clearance > 0
    ? calculate(state.perimeter, state.clearance) : null;

  const rigLabels: Record<string, string> = {
    travel_trailer: "Travel Trailer", fifth_wheel: "5th Wheel", motorhome: "Motorhome",
  };

  // Map scene number to step number for progress display
  const steps = state.includeFW ? FW_STEPS : STEPS;
  const currentStep = (() => {
    if (scene <= 4) return scene;
    if (scene === 5 && state.includeFW) return 5;
    return steps.length; // review
  })();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: "RV Skirts", href: "/collections/rv-skirts" },
          { label: "Build Your RV Skirt" },
        ]}
      />

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Build Your RV Skirt</h1>
        <p className="mt-2 text-gray-600">
          Configure your custom RV skirt in a few easy steps. We&apos;ll handle the rest.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-10">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {steps.map((step, i) => (
            <div key={step.num} className="flex items-center flex-1 last:flex-0">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors",
                    currentStep > step.num
                      ? "bg-brand-500 text-dark-900"
                      : currentStep === step.num
                        ? "bg-dark-800 text-brand-400 ring-2 ring-brand-400"
                        : "bg-gray-200 text-gray-500"
                  )}
                >
                  {currentStep > step.num ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.num
                  )}
                </div>
                <span className={cn(
                  "text-xs mt-1.5 font-medium hidden sm:block",
                  currentStep >= step.num ? "text-gray-900" : "text-gray-400"
                )}>
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={cn(
                  "flex-1 h-0.5 mx-2 mt-[-1.25rem] sm:mt-[-0.25rem]",
                  currentStep > step.num ? "bg-brand-500" : "bg-gray-200"
                )} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Back Button */}
      {history.length > 1 && scene !== 6 && !(scene === 5 && !state.includeFW) && (
        <button
          onClick={goBack}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      )}

      {/* Content Area */}
      <div className="max-w-2xl mx-auto">

        {/* Scene 1: RV Type */}
        {scene === 1 && (
          <div>
            <StepHeading>What type of RV do you have?</StepHeading>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {([
                ["travel_trailer", "Travel Trailer", "Standard bumper pull"],
                ["fifth_wheel", "5th Wheel", "Gooseneck hitch"],
                ["motorhome", "Motorhome", "Class A, B, or C"],
              ] as const).map(([val, title, desc]) => (
                <OptionCard key={val} onClick={() => {
                  setState((s) => ({ ...s, rig: val as RigType }));
                  if (val === "fifth_wheel") {
                    setShowFWModal(true);
                  } else {
                    setState((s) => ({ ...s, rig: val as RigType, includeFW: false }));
                    goTo(2);
                  }
                }}>
                  <div className="text-lg font-semibold text-gray-900">{title}</div>
                  <div className="text-sm text-gray-500 mt-1">{desc}</div>
                </OptionCard>
              ))}
            </div>
          </div>
        )}

        {/* Scene 2: Perimeter */}
        {scene === 2 && (
          <div>
            <StepHeading>What is your RV&apos;s perimeter?</StepHeading>
            <p className="text-sm text-gray-500 mb-6">Measure around the entire RV at ground level with slide-outs extended.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {([
                [50, "Small trailer"], [60, "Average"], [70, "Larger rig"],
                [80, "Big 5th wheel"], [90, "Extra large"], [100, "Maximum"],
              ] as const).map(([val, desc]) => (
                <OptionCard key={val} onClick={() => {
                  setState((s) => ({ ...s, perimeter: val }));
                  goTo(3);
                }}>
                  <div className="text-xl font-bold text-gray-900">{val} ft</div>
                  <div className="text-sm text-gray-500 mt-1">{desc}</div>
                </OptionCard>
              ))}
            </div>
            <Link
              href="/guides/rv-measuring"
              className="inline-flex items-center gap-1 text-sm text-brand-700 hover:text-brand-800 font-medium mt-6"
            >
              Need help measuring?
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}

        {/* Scene 3: Ground Clearance */}
        {scene === 3 && (
          <div>
            <StepHeading>What is your ground clearance?</StepHeading>
            <p className="text-sm text-gray-500 mb-6">Measure from the bottom edge of the RV straight down to the ground.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {([
                [10, "Low profile"], [12, "Standard"], [14, "Common"],
                [16, "Above average"], [18, "High clearance"], [20, "Extra high"],
              ] as const).map(([val, desc]) => (
                <OptionCard key={val} onClick={() => {
                  setState((s) => ({ ...s, clearance: val }));
                  goTo(4);
                }}>
                  <div className="text-xl font-bold text-gray-900">{val}&quot;</div>
                  <div className="text-sm text-gray-500 mt-1">{desc}</div>
                </OptionCard>
              ))}
            </div>
          </div>
        )}

        {/* Scene 4: Main Color */}
        {scene === 4 && (
          <div>
            <StepHeading>Choose your skirt color</StepHeading>
            <ColorPicker
              selected={state.mainColor}
              onSelect={(c) => {
                setState((s) => ({ ...s, mainColor: c }));
                if (state.includeFW) {
                  goTo(5);
                } else {
                  goTo(6);
                }
              }}
            />
          </div>
        )}

        {/* Scene 5: FW Color */}
        {scene === 5 && (
          <div>
            <StepHeading>Choose your hitch skirt color</StepHeading>
            <p className="text-sm text-gray-500 mb-6">This covers the area between your truck bed and trailer.</p>
            <ColorPicker
              selected={state.fwColor}
              onSelect={(c) => {
                setState((s) => ({ ...s, fwColor: c }));
                goTo(6);
              }}
            />
          </div>
        )}

        {/* Scene 6: Review */}
        {scene === 6 && calc && (
          <div>
            <StepHeading>Review your configuration</StepHeading>

            <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">
              <SummaryRow label="RV Type" value={rigLabels[state.rig] || state.rig} onEdit={() => goTo(1)} />
              <SummaryRow label="Perimeter" value={`${state.perimeter} ft (${calc.roundedFt} ft with buffer)`} onEdit={() => goTo(2)} />
              <SummaryRow label="Skirt Height" value={calc.height} onEdit={() => goTo(3)} />
              <SummaryRow label="Color" value={state.mainColor} onEdit={() => goTo(4)} />
              {state.includeFW && (
                <SummaryRow label="Hitch Skirt Color" value={state.fwColor} onEdit={() => goTo(5)} />
              )}
            </div>

            {/* Price & CTA */}
            <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
              <div className="text-sm text-gray-500 mb-1">Total Price</div>
              <div className="text-4xl font-extrabold text-gray-900 mb-1">
                {formatPrice(getPrice(state))}
              </div>
              {state.includeFW && (
                <div className="text-sm text-gray-500 mb-4">
                  Includes ${FW_PRICE} fifth-wheel hitch skirt
                </div>
              )}
              <div className="mt-4 bg-brand-50 rounded-lg p-4">
                <p className="text-sm font-medium text-dark-800 mb-2">
                  Ready to order? Call us with your configuration:
                </p>
                <a
                  href="tel:4178648461"
                  className="inline-flex items-center gap-2 text-xl font-bold text-dark-900 hover:text-brand-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (417) 864-8461
                </a>
              </div>
            </div>

            {/* Included items */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                ["Industrial-grade 18 oz vinyl", "Stays flexible in freezing temps"],
                ['Full 2" hem all around', "Reinforced corners for tear resistance"],
                ["Pipe pocket included", "For easy installation and structure"],
                ["Velcro fastening kit", "Draft-tight seal without messy adhesives"],
              ].map(([title, desc]) => (
                <div key={title} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{title}</div>
                    <div className="text-xs text-gray-500">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fifth Wheel Modal */}
      {showFWModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-xl">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Add a hitch skirt?</h2>
            <p className="text-gray-600 mb-6">
              A fifth-wheel hitch skirt covers the gap between your truck bed and trailer for complete protection. (+${FW_PRICE})
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setState((s) => ({ ...s, includeFW: true }));
                  setShowFWModal(false);
                  goTo(2);
                }}
                className="flex-1 py-3 bg-brand-500 text-dark-900 font-semibold rounded-lg hover:bg-brand-400 transition-colors cursor-pointer"
              >
                Yes, Add It
              </button>
              <button
                onClick={() => {
                  setState((s) => ({ ...s, includeFW: false }));
                  setShowFWModal(false);
                  goTo(2);
                }}
                className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                No Thanks
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Sub-components ──────────────────────────────────────────────

function StepHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-semibold text-gray-900 mb-6">{children}</h2>
  );
}

function OptionCard({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-xl p-5 text-center cursor-pointer transition-all hover:border-brand-400 hover:shadow-md hover:-translate-y-0.5"
    >
      {children}
    </button>
  );
}

const COLORS = [
  { name: "Black", bg: "#111827" },
  { name: "Light Gray", bg: "#cbd5e1" },
  { name: "Tan", bg: "#d7c3a3" },
  { name: "White", bg: "#f9fafb" },
];

function ColorPicker({ selected, onSelect }: { selected: string; onSelect: (c: string) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {COLORS.map((c) => (
        <button
          key={c.name}
          onClick={() => onSelect(c.name)}
          className="flex flex-col items-center gap-2 cursor-pointer group"
        >
          <div
            className={cn(
              "w-16 h-16 rounded-full border-2 transition-all shadow-sm",
              selected === c.name
                ? "border-brand-500 ring-2 ring-brand-300 scale-110"
                : "border-gray-300 group-hover:border-gray-400 group-hover:scale-105"
            )}
            style={{ background: c.bg }}
          />
          <span className={cn(
            "text-sm font-medium",
            selected === c.name ? "text-gray-900" : "text-gray-500"
          )}>
            {c.name}
          </span>
        </button>
      ))}
    </div>
  );
}

function SummaryRow({ label, value, onEdit }: { label: string; value: string; onEdit: () => void }) {
  return (
    <div className="flex items-center justify-between px-5 py-4">
      <div>
        <div className="text-sm text-gray-500">{label}</div>
        <div className="font-medium text-gray-900">{value}</div>
      </div>
      <button
        onClick={onEdit}
        className="text-sm text-brand-700 hover:text-brand-800 font-medium cursor-pointer"
      >
        Edit
      </button>
    </div>
  );
}
