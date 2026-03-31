import { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { C } from "../constants/tokens";
import { WordReveal } from "./ui";

const projects = [
  {
    id: "snakegame", title: "SNAKE\nGAME", tag: "C++ & SFML",
    desc: "Built a Snake game in C++ using SFML implementing movement through a linked list structure for dynamic body growth and control. Managed real-time collisions, sprite rendering, and seamless gameplay.",
    stack: ["C++", "SFML", "Data Structures"], year: "2025", color: C.neon, link: "https://github.com/navya21-6"
  },
  {
    id: "netflixdata", title: "NETFLIX\nDATA", tag: "DATA ANALYSIS",
    desc: "Executed data cleaning, exploratory data analysis, and visualization to derive meaningful insights and identify patterns within the Netflix dataset.",
    stack: ["Python", "Pandas", "Matplotlib"], year: "2025", color: C.red, link: "https://github.com/navya21-6"
  },
  {
    id: "routeoptimizer", title: "ROUTE\nOPTIMIZER", tag: "GRAPH ALGORITHMS",
    desc: "Built a graph-based backend system using Dijkstra’s Algorithm to compute shortest and cost-efficient travel routes, optimizing path selection through efficient use of data structures.",
    stack: ["Python", "MySQL", "Algorithms"], year: "2024", color: C.blue, link: "https://github.com/navya21-6"
  }
];

function ProjectCard({ project, layout: isGrid }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      layout layoutId={project.id} data-cursor
      onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
      onClick={() => project.link && window.open(project.link, "_blank")}
      style={{
        border: `1px solid ${C.border}`, padding: isGrid ? 32 : "24px 32px",
        display: "flex", flexDirection: isGrid ? "column" : "row",
        alignItems: isGrid ? "flex-start" : "center", gap: isGrid ? 20 : 32,
        cursor: "none", position: "relative", overflow: "hidden",
        background: hovered ? C.mid : "transparent",
      }}
      whileHover={{ borderColor: project.color }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: project.color, originY: 0 }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <div style={{ flex: isGrid ? "unset" : "0 0 200px" }}>
        <p className="mono" style={{ fontSize: 10, color: project.color, letterSpacing: 3, marginBottom: 8 }}>{project.tag}</p>
        <h3 className="bebas"
          style={{ fontSize: isGrid ? "clamp(36px,4vw,52px)" : 36, lineHeight: 0.9, whiteSpace: "pre-line", color: C.white }}>
          {project.title}
        </h3>
      </div>
      <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6, flex: isGrid ? "unset" : 1 }}>{project.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: isGrid ? "auto" : 0, flexShrink: 0 }}>
        {project.stack.map(s => (
          <span key={s} className="mono"
            style={{ fontSize: 10, border: `1px solid ${C.border}`, padding: "4px 10px", color: "#666", letterSpacing: 2 }}>
            {s}
          </span>
        ))}
      </div>
      <span className="mono" style={{
        position: isGrid ? "absolute" : "relative",
        top: isGrid ? 28 : "unset", right: isGrid ? 28 : "unset",
        fontSize: 11, color: "#333", flexShrink: 0,
      }}>{project.year}</span>
    </motion.div>
  );
}

export default function Projects() {
  const [isGrid, setIsGrid] = useState(true);
  return (
    <section style={{ padding: "14vh 6vw", borderBottom: `1px solid ${C.border}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
        <div>
          <p className="mono" style={{ color: C.neon, fontSize: 11, letterSpacing: 4, marginBottom: 16 }}>03 — WORK</p>
          <WordReveal text="SELECTED PROJECTS" className="bebas"
            style={{ fontSize: "clamp(36px,6vw,80px)", color: C.white }} stagger={0.05} />
        </div>
        <div style={{ display: "flex" }}>
          {[true, false].map((g) => (
            <motion.button key={String(g)} onClick={() => setIsGrid(g)}
              style={{
                background: isGrid === g ? C.neon : "transparent", border: `1px solid ${C.border}`,
                color: isGrid === g ? C.black : "#555", padding: "10px 20px",
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: 2, cursor: "none",
              }}
              whileTap={{ scale: 0.93 }}
            >
              {g ? "GRID" : "LIST"}
            </motion.button>
          ))}
        </div>
      </div>
      <LayoutGroup>
        <motion.div layout style={{
          display: isGrid ? "grid" : "flex",
          gridTemplateColumns: isGrid ? "repeat(auto-fill, minmax(320px, 1fr))" : undefined,
          flexDirection: isGrid ? undefined : "column", gap: 1,
        }}>
          {projects.map((p) => <ProjectCard key={p.id} project={p} layout={isGrid} />)}
        </motion.div>
      </LayoutGroup>
    </section>
  );
}
