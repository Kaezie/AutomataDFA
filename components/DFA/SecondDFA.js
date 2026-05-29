import { motion } from "framer-motion";

const MotionCircle = motion.circle;

// State positions in SVG coordinate space (viewBox 0 0 900 300)
const STATES = {
  q1: { x: 60,  y: 150, label: "-", start: true,  accept: false },
  q2: { x: 190, y: 150, label: " ", start: false, accept: false },
  q3: { x: 280, y: 230, label: " ", start: false, accept: false },
  q4: { x: 370, y: 150, label: " ", start: false, accept: false },
  q5: { x: 490, y: 70, label: " ", start: false, accept: false },
  q6: { x: 490, y: 230, label: " ", start: false, accept: false },
  q8: { x: 625, y: 160, label: " ", start: false, accept: false },
  q9: { x: 630, y: 230, label: " ", start: false, accept: false },
  q7: { x: 790, y: 150, label: "+", start: false, accept: true  },
 
};

// node index → state key (matches Logic.js ordering)
const NODE_TO_STATE = {
  1: "q1", 2: "q2", 3: "q3", 4: "q4",
  5: "q5", 6: "q6", 7: "q8", 8: "q9", 9: "q7", T: "T",
};

const R = 30; // circle radius

// Helper: point on circle edge toward (tx, ty) from center (cx, cy)
function edgePoint(cx, cy, tx, ty, r = R) {
  const dx = tx - cx, dy = ty - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  return [cx + (dx / dist) * r, cy + (dy / dist) * r];
}

// Straight arrow between two states
function Arrow({ from, to, label, labelDx = 0, labelDy = 0, bend = 0 }) {
  const f = STATES[from], t = STATES[to];
  const [x1, y1] = edgePoint(f.x, f.y, t.x, t.y);
  const [x2, y2] = edgePoint(t.x, t.y, f.x, f.y);

  let d;
  if (bend !== 0) {
    const mx = (x1 + x2) / 2 + bend * (-(y2 - y1));
    const my = (y1 + y2) / 2 + bend * (x2 - x1);
    d = `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
  } else {
    d = `M ${x1} ${y1} L ${x2} ${y2}`;
  }

  // label midpoint
  let lx, ly;
  if (bend !== 0) {
    const mx = (x1 + x2) / 2 + bend * (-(y2 - y1));
    const my = (y1 + y2) / 2 + bend * (x2 - x1);
    lx = (x1 + 2 * mx + x2) / 4 + labelDx;
    ly = (y1 + 2 * my + y2) / 4 + labelDy;
  } else {
    lx = (x1 + x2) / 2 + labelDx;
    ly = (y1 + y2) / 2 + labelDy;
  }

  return (
    <g>
      <path d={d} fill="none" stroke="#ebdcff" strokeWidth="2"
        markerEnd="url(#arrow)" />
      <text x={lx} y={ly} fontSize="14" fill="#ebdcff" textAnchor="middle">{label}</text>
    </g>
  );
}

// Self-loop arrow on a state
function SelfLoop({ state, label, offsetY = -1 }) {
  const s = STATES[state];
  const x = s.x, y = s.y;
  return (
    <g>
      <path
        d={`M ${x - 12} ${y - R} C ${x - 20} ${y - R - 35} ${x + 20} ${y - R - 35} ${x + 12} ${y - R}`}
        fill="none" stroke="#ebdcff" strokeWidth="1.5" markerEnd="url(#arrow)"
      />
      <text x={x} y={y - R - 28 + offsetY} fontSize="14" fill="#CBD5E0" textAnchor="middle">{label}</text>
    </g>
  );
}

// State circle node
function StateNode({ stateKey, active }) {
  const s = STATES[stateKey];
  const color = s.trap ? "#FC8181"
    : s.accept ? "#68D391"
    : "#bdaff1";

  return (
    <g>
      <MotionCircle
        cx={s.x} cy={s.y} r={R}
        fill={active ? color : "#352d48"}
        stroke={color}
        strokeWidth="2"
        animate={active ? { scale: [1, 1.3, 1], transition: { duration: 0.4 } } : { scale: 1 }}
        style={{ transformOrigin: `${s.x}px ${s.y}px` }}
      />

      <text x={s.x} y={s.y + 4} fontSize="14" fill={active ? "#1A202C" : "#ebdcff"}
        textAnchor="middle" fontWeight="600">
        {s.label}
      </text>
    </g>
  );
}

const SecondDFA = ({ currentNodeVal, simulatingStatus }) => {
  const activeState = NODE_TO_STATE[currentNodeVal] || null;

  return (
    <svg
      viewBox="0 0 900 300"
      width="100%"
      height="100%"
      style={{ overflow: "visible" }}
    >
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8"
          refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#ebdcff" />
        </marker>
      </defs>

      {/* ── ARROWS ── */}

      {/* q1 self-loop: 1 */}
      <SelfLoop state="q1" label="1" />

      {/* q1 → q2: 0 */}
      <Arrow from="q1" to="q2" label="0" labelDy={-10} />

      {/* q2 → q4: 1 */}
      <Arrow from="q2" to="q4" label="1" labelDy={-10} />

      {/* q2 → q3: 0 */}
      <Arrow from="q2" to="q3" label="0" labelDx={-10} labelDy={10} />

      {/* q3 → q4: 0, 1 */}
      <Arrow from="q3" to="q4" label="0, 1" labelDx={15} labelDy={15} />

      {/* q4 → q5: 0 */}
      <Arrow from="q4" to="q5" label="0" labelDx={-10} labelDy={-6} />

      {/* q4 → q6: 1 */}
      <Arrow from="q4" to="q6" label="1" labelDx={-10} labelDy={8} />

      {/* q5 → q7(accept): 0 */}
      <Arrow from="q5" to="q7" label="0" labelDy={-7} />

      {/* q5 → q6 */}
      <Arrow from="q5" to="q6" label="1" labelDx={10} labelDy={5} />

      {/* q6 → q8: 0 */}
      <Arrow from="q6" to="q8" label="0" labelDx={-12} labelDy={-6} />

      {/* q6 → q9: 1 */}
      <Arrow from="q6" to="q9" label="1" labelDy={15} />

      {/* q8 → q7: 0, 1 */}
      <Arrow from="q8" to="q7" label="0, 1" labelDx={-15} labelDy={-6} />

      {/* q9 → q7: 1 */}
      <Arrow from="q9" to="q7" label="1" labelDy={15} />

      {/* q7 self-loop: 0,1 */}
      <SelfLoop state="q7" label="0, 1" />

      {/* ── STATE NODES ── */}
      {Object.keys(STATES).map((key) => (
        <StateNode key={key} stateKey={key} active={activeState === key} />
      ))}
    </svg>
  );
};

export default SecondDFA;
