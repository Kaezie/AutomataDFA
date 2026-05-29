import { motion } from "framer-motion";

const MotionCircle = motion.circle;

const STATES = {
  q1:  { x: 30,   y: 210 },
  q19: { x: 110,  y: 210 },
  q24: { x: 190,  y: 210 },
  q25: { x: 270,  y: 210 },
  q26: { x: 350,  y: 150 },
  q27: { x: 350,  y: 270 },
  q28: { x: 430,  y: 150 },
  q29: { x: 510,  y: 150 },
  q30: { x: 510,  y: 270 },
  q20: { x: 590,  y: 150 },
  q21: { x: 590,  y: 270 },
  q22: { x: 670,  y: 150 },
  q23: { x: 670,  y: 270 },
  q31: { x: 750,  y: 150 },
  q32: { x: 750,  y: 270 },
  q2:  { x: 830,  y: 150 },
  q3:  { x: 830,  y: 270 },
  q9:  { x: 910,  y: 150 },
  q10: { x: 910,  y: 270 },
  q16: { x: 910,  y: 60 },
  q17: { x: 990,  y: 270 },
  q8:  { x: 1070, y: 210 },
  q15: { x: 1070, y: 330 },
  q7:  { x: 990,  y: 380 },
  q14: { x: 910,  y: 380 },
  q18: { x: 830,  y: 380 },
  q4:  { x: 750,  y: 380 },
  q11: { x: 630,  y: 330 },
  q5:  { x: 670,  y: 380 },
  q12: { x: 590,  y: 420 },
  q6:  { x: 510,  y: 340 },
  q13: { x: 430,  y: 380 },
  T:   { x: 590,  y:  40  },
};

// index → state key (matches Logic.js)
const NODE_TO_STATE = {
  1:"q1",2:"q19",3:"q24",4:"q25",5:"q26",6:"q28",7:"q27",8:"q29",
  9:"q30",10:"q20",11:"q21",12:"q22",13:"q23",14:"q31",15:"q32",
  16:"q2",17:"q3",18:"q9",19:"q10",20:"q16",21:"q17",22:"q8",
  23:"q15",24:"q7",25:"q14",26:"q18",27:"q4",28:"q11",29:"q5",
  30:"q12",31:"q6",32:"q13",T:"T",
};

const R = 16;

function edgePoint(cx, cy, tx, ty, r = R) {
  const dx = tx - cx, dy = ty - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist === 0) return [cx, cy];
  return [cx + (dx / dist) * r, cy + (dy / dist) * r];
}

function Arrow({ from, to, label, labelDx = 0, labelDy = -8, bend = 0, color}) {
  const f = STATES[from], t = STATES[to];

  
  const strokeColor = to === "T" ? "#FC8181" : (color || "#ebdcff");

  const [x1, y1] = edgePoint(f.x, f.y, t.x, t.y);
  const [x2, y2] = edgePoint(t.x, t.y, f.x, f.y);

  let d, lx, ly;

  if (bend !== 0) {
    const mx = (x1 + x2) / 2 + bend * (-(y2 - y1));
    const my = (y1 + y2) / 2 + bend * (x2 - x1);
    d = `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
    lx = (x1 + 2 * mx + x2) / 4 + labelDx;
    ly = (y1 + 2 * my + y2) / 4 + labelDy;
  } else {
    d = `M ${x1} ${y1} L ${x2} ${y2}`;
    lx = (x1 + x2) / 2 + labelDx;
    ly = (y1 + y2) / 2 + labelDy;
  }

  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={strokeColor}   // uses dynamic color
        strokeWidth="2"
        markerEnd="url(#arrow1)"
      />
      <text
        x={lx}
        y={ly}
        fontSize="14"
        fill={strokeColor}     // optional: match label color
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  );
}

// Self loop
function SelfLoop({ state, label, offsetY = -1 }) {
  const s = STATES[state];
  const x = s.x, y = s.y;
  return (
    <g>
      <path
        d={`M ${x - 12} ${y - R} C ${x - 20} ${y - R - 35} ${x + 20} ${y - R - 35} ${x + 12} ${y - R}`}
        fill="none" stroke="#ebdcff" strokeWidth="1.5" markerEnd="url(#arrow1)"
      />
      <text x={x} y={y - R - 28 + offsetY} fontSize="14" fill="#CBD5E0" textAnchor="middle">{label}</text>
    </g>
  );
}

function StateNode({ stateKey, active, label = "", accept = false }) {
  const s = STATES[stateKey];
  const isTrap = stateKey === "T";
  const color = isTrap ? "#FC8181" : accept ? "#68D391" : "#bdaff1";
  
  return (
    <g>
      <MotionCircle
        cx={s.x} cy={s.y} r={R}
        fill={active ? color : "#2D3748"}
        stroke={color} strokeWidth="1.8"
        animate={active ? { scale: [1, 1.4, 1], transition: { duration: 0.4 } } : { scale: 1 }}
        style={{ transformOrigin: `${s.x}px ${s.y}px` }}
      />

      <text x={s.x} y={s.y + 4} fontSize="12" fill={active ? "#1A202C" : "#E2E8F0"}
        textAnchor="middle" fontWeight="700">{label}</text>
    </g>
  );
}

const FirstDFA = ({ currentNode, simulatingStatus }) => {
  const activeState = NODE_TO_STATE[currentNode] || null;

  return (
    <svg viewBox="0 0 1150 430" width="100%" height="100%" style={{ overflow: "visible" }}>
      <defs>
        <marker id="arrow1" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3 z" fill="context-stroke" />
        </marker>
      </defs>

      {/* ── SELF LOOPS ── */}
      <SelfLoop state="q26" label="a" />
      <SelfLoop state="q27" label="b" side="bottom" />
      <SelfLoop state="q29" label="a" />
      <SelfLoop state="q11" label="a" />
      <SelfLoop state="q12" label="b" side="bottom" />
      <SelfLoop state="q13" label="a,b" side="bottom" />
      <SelfLoop state="T"   label="a,b" />

      {/* ── LEFT CHAIN: q1→q19→q24→q25 ── */}
      <Arrow from="q1"  to="q19" label="b" />
      <Arrow from="q1"  to="T"   label="a" labelDy={-10} bend={-0.15} />
      <Arrow from="q19" to="q24" label="a,b" />
      <Arrow from="q24" to="q25" label="b" />
      <Arrow from="q24" to="T"   label="a" labelDy={-10} bend={-0.1} />

      {/* ── q25 branches to q26(upper) and q27(lower) ── */}
      <Arrow from="q25" to="q26" label="a" labelDx={-8} labelDy={-6} />
      <Arrow from="q25" to="q27" label="b" labelDx={-8} labelDy={8} />

      {/* ── q26→q28, q28→q27, q28→q30 ── */}
      <Arrow from="q26" to="q28" label="b" />
      <Arrow from="q28" to="q27" label="b" labelDx={8} labelDy={8} />
      <Arrow from="q28" to="q30" label="a" labelDx={-8} labelDy={-6} />

      {/* ── q27→q29 ── */}
      <Arrow from="q27" to="q29" label="a" labelDy={10} />

      {/* ── q29↔q30 area ── */}
      <Arrow from="q29" to="q20" label="b" />
      <Arrow from="q30" to="q29" label="a" labelDy={10} />
      <Arrow from="q30" to="q21" label="b" />

      {/* ── q20, q21 ── */}
      <Arrow from="q20" to="q22" label="a" />
      <Arrow from="q20" to="T"   label="b" bend={-0.2} labelDy={-8} />
      <Arrow from="q21" to="q23" label="a" />
      <Arrow from="q21" to="q4"  label="b" labelDy={10} bend={0.1} />

      {/* ── q22, q23 ── */}
      <Arrow from="q22" to="q8"  label="a" />
      <Arrow from="q22" to="q31" label="b" />
      <Arrow from="q23" to="q8"  label="a" bend={0.15} labelDy={8} />
      <Arrow from="q23" to="q32" label="b" />

      {/* ── q31, q32 ── */}
      <Arrow from="q31" to="q2"  label="a" />
      <Arrow from="q31" to="q4"  label="b" labelDy={10} bend={0.12} />
      <Arrow from="q32" to="q3"  label="a" />
      <Arrow from="q32" to="q4"  label="b" labelDy={14} bend={0.15} />

      {/* ── q2, q3 ── */}
      <Arrow from="q2"  to="q8"  label="a" bend={-0.1} labelDy={-8} />
      <Arrow from="q2"  to="q9"  label="b" />
      <Arrow from="q3"  to="q8"  label="a" bend={0.1} labelDy={8} />
      <Arrow from="q3"  to="q10" label="b" />

      {/* ── q9, q10 ── */}
      <Arrow from="q9"  to="q16" label="a" labelDx={10} labelDy={10} />
      <Arrow from="q9"  to="q14" label="b" labelDy={10} bend={0.1} />
      <Arrow from="q10" to="q17" label="a" />
      <Arrow from="q10" to="q14" label="b" labelDy={14} bend={0.15} />

      {/* ── q16, q17 ── */}
      <Arrow from="q16" to="q8"  label="a" labelDx={8} labelDy={-6} />
      <Arrow from="q16" to="q20" label="b" bend={-0.2} labelDy={-8} />
      <Arrow from="q17" to="q8"  label="a" labelDx={8} labelDy={6} />
      <Arrow from="q17" to="q21" label="b" bend={0.2} labelDy={8} />

      {/* ── q8 hub ── */}
      <Arrow from="q8"  to="q15" label="b" />
      <Arrow from="q8"  to="T"   label="a" labelDy={13} bend={-0.2} />

      {/* ── q15→q7, q15→T ── */}
      <Arrow from="q15" to="q7"  label="a" />
      <Arrow from="q15" to="T"   label="b" bend={-0.2} labelDy={-8} />

      {/* ── q7→q8, q7→q14 ── */}
      <Arrow from="q7"  to="q8"  label="a" bend={0.2} labelDy={8} />
      <Arrow from="q7"  to="q14" label="b" />

      {/* ── q14→q18, q14→q4 ── */}
      <Arrow from="q14" to="q18" label="a" />
      <Arrow from="q14" to="q4"  label="b" />

      {/* ── q18→T, q18→q7 ── */}
      <Arrow from="q18" to="T"   label="a" bend={-0.15} labelDy={-8} />
      <Arrow from="q18" to="q7"  label="b" bend={-0.1} labelDy={-8} />

      {/* ── q4→q11, q4→q12 ── */}
      <Arrow from="q4"  to="q11" label="a" labelDx={-8} labelDy={-6} />
      <Arrow from="q4"  to="q12" label="b" labelDy={18} />

      {/* ── q11→q5 ── */}
      <Arrow from="q11" to="q5"  label="b" />

      {/* ── q5→q13, q5→q12 ── */}
      <Arrow from="q5"  to="q13" label="a" />
      <Arrow from="q5"  to="q12" label="b" bend={0.2} labelDy={10} />

      {/* ── q12→q6 ── */}
      <Arrow from="q12" to="q6"  label="a" />

      {/* ── q6→q11, q6→q13 ── */}
      <Arrow from="q6"  to="q11" label="a" bend={-0.2} labelDy={-8} />
      <Arrow from="q6"  to="q13" label="b" />

      {/* STATE NODES tama na pls huhu */}
      <StateNode stateKey="q1"  active={activeState==="q1"}  label="-" />
      <StateNode stateKey="q19" active={activeState==="q19"} label="" />
      <StateNode stateKey="q24" active={activeState==="q24"} label="" />
      <StateNode stateKey="q25" active={activeState==="q25"} label="" />
      <StateNode stateKey="q26" active={activeState==="q26"} label="" />
      <StateNode stateKey="q27" active={activeState==="q27"} label="" />
      <StateNode stateKey="q28" active={activeState==="q28"} label="" />
      <StateNode stateKey="q29" active={activeState==="q29"} label="" />
      <StateNode stateKey="q30" active={activeState==="q30"} label="" />
      <StateNode stateKey="q20" active={activeState==="q20"} label="" />
      <StateNode stateKey="q21" active={activeState==="q21"} label="" />
      <StateNode stateKey="q22" active={activeState==="q22"} label="" />
      <StateNode stateKey="q23" active={activeState==="q23"} label="" />
      <StateNode stateKey="q31" active={activeState==="q31"} label="" />
      <StateNode stateKey="q32" active={activeState==="q32"} label="" />
      <StateNode stateKey="q2"  active={activeState==="q2"}  label="" />
      <StateNode stateKey="q3"  active={activeState==="q3"}  label="" />
      <StateNode stateKey="q9"  active={activeState==="q9"}  label="" />
      <StateNode stateKey="q10" active={activeState==="q10"} label="" />
      <StateNode stateKey="q16" active={activeState==="q16"} label="" />
      <StateNode stateKey="q17" active={activeState==="q17"} label="" />
      <StateNode stateKey="q8"  active={activeState==="q8"}  label="" />
      <StateNode stateKey="q15" active={activeState==="q15"} label="" />
      <StateNode stateKey="q7"  active={activeState==="q7"}  label="" />
      <StateNode stateKey="q14" active={activeState==="q14"} label="" />
      <StateNode stateKey="q18" active={activeState==="q18"} label="" />
      <StateNode stateKey="q4"  active={activeState==="q4"}  label="" />
      <StateNode stateKey="q11" active={activeState==="q11"} label="" />
      <StateNode stateKey="q5"  active={activeState==="q5"}  label="" />
      <StateNode stateKey="q12" active={activeState==="q12"} label="" />
      <StateNode stateKey="q6"  active={activeState==="q6"}  label="" />
      <StateNode stateKey="q13" active={activeState==="q13"} label="+" accept />
      <StateNode stateKey="T"   active={activeState==="T"}   label="T" />
    </svg>
  );
};

export default FirstDFA;
