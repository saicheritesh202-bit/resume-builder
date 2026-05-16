import { useState, useRef } from "react";

const defaultData = {
  name: "Alexandra Chen",
  title: "Senior Product Designer",
  email: "alex.chen@email.com",
  phone: "+1 (555) 234-5678",
  location: "San Francisco, CA",
  website: "alexchen.design",
  summary:
    "Creative product designer with 7+ years crafting human-centered digital experiences. Passionate about the intersection of design and technology.",
  experience: [
    {
      id: 1,
      role: "Senior Product Designer",
      company: "Figma",
      period: "2021 – Present",
      bullets: [
        "Led redesign of core editor tools, improving task completion by 34%",
        "Managed design system used by 200+ engineers across 12 product teams",
        "Collaborated with PM and engineering on 0-to-1 features shipped to 4M users",
      ],
    },
    {
      id: 2,
      role: "Product Designer",
      company: "Airbnb",
      period: "2018 – 2021",
      bullets: [
        "Designed host onboarding flow, increasing completion rate from 52% to 79%",
        "Prototyped and shipped new messaging UI for iOS and Android",
        "Ran 20+ usability studies and synthesized findings into actionable insights",
      ],
    },
  ],
  education: [
    {
      id: 1,
      degree: "B.F.A. Graphic Design",
      school: "Rhode Island School of Design",
      period: "2014 – 2018",
    },
  ],
  skills: ["Figma", "Prototyping", "User Research", "Design Systems", "React", "Framer"],
};

const accentColors = [
  { name: "Slate", value: "#1e293b" },
  { name: "Indigo", value: "#3730a3" },
  { name: "Rose", value: "#9f1239" },
  { name: "Teal", value: "#0f766e" },
  { name: "Amber", value: "#92400e" },
  { name: "Violet", value: "#5b21b6" },
];

function EditableText({ value, onChange, placeholder, className, multiline }) {
  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={className}
        rows={3}
        style={{ resize: "vertical", width: "100%", fontFamily: "inherit", fontSize: "inherit", lineHeight: "inherit", color: "inherit", background: "transparent", border: "1px dashed #cbd5e1", borderRadius: "4px", padding: "4px 6px", outline: "none" }}
      />
    );
  }
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={className}
      style={{ width: "100%", fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit", color: "inherit", background: "transparent", border: "1px dashed #cbd5e1", borderRadius: "4px", padding: "2px 6px", outline: "none" }}
    />
  );
}

export default function ResumeBuilder() {
  const [data, setData] = useState(defaultData);
  const [accent, setAccent] = useState(accentColors[0].value);
  const [activeTab, setActiveTab] = useState("edit");
  const [downloading, setDownloading] = useState(false);
  const resumeRef = useRef(null);

  const updateField = (field, value) => setData((d) => ({ ...d, [field]: value }));

  const updateExp = (id, field, value) =>
    setData((d) => ({
      ...d,
      experience: d.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));

  const updateBullet = (expId, idx, value) =>
    setData((d) => ({
      ...d,
      experience: d.experience.map((e) =>
        e.id === expId
          ? { ...e, bullets: e.bullets.map((b, i) => (i === idx ? value : b)) }
          : e
      ),
    }));

  const addBullet = (expId) =>
    setData((d) => ({
      ...d,
      experience: d.experience.map((e) =>
        e.id === expId ? { ...e, bullets: [...e.bullets, "New achievement"] } : e
      ),
    }));

  const removeBullet = (expId, idx) =>
    setData((d) => ({
      ...d,
      experience: d.experience.map((e) =>
        e.id === expId ? { ...e, bullets: e.bullets.filter((_, i) => i !== idx) } : e
      ),
    }));

  const addExperience = () =>
    setData((d) => ({
      ...d,
      experience: [
        ...d.experience,
        { id: Date.now(), role: "New Role", company: "Company", period: "Year – Year", bullets: ["Achievement"] },
      ],
    }));

  const removeExperience = (id) =>
    setData((d) => ({ ...d, experience: d.experience.filter((e) => e.id !== id) }));

  const updateEdu = (id, field, value) =>
    setData((d) => ({
      ...d,
      education: d.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));

  const addEducation = () =>
    setData((d) => ({
      ...d,
      education: [
        ...d.education,
        { id: Date.now(), degree: "Degree", school: "School", period: "Year – Year" },
      ],
    }));

  const removeEducation = (id) =>
    setData((d) => ({ ...d, education: d.education.filter((e) => e.id !== id) }));

  const updateSkills = (value) =>
    setData((d) => ({ ...d, skills: value.split(",").map((s) => s.trim()).filter(Boolean) }));

  const handleDownload = async () => {
    setDownloading(true);
    await new Promise((r) => setTimeout(r, 100));

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${data.name} – Resume</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: #f8f7f4; display: flex; justify-content: center; padding: 40px 20px; min-height: 100vh; }
  .page { background: white; width: 794px; min-height: 1123px; padding: 0; box-shadow: 0 20px 60px rgba(0,0,0,0.15); }
  .header { background: ${accent}; color: white; padding: 48px 52px 40px; position: relative; overflow: hidden; }
  .header::after { content: ''; position: absolute; top: -60px; right: -60px; width: 200px; height: 200px; border-radius: 50%; background: rgba(255,255,255,0.06); }
  .header::before { content: ''; position: absolute; bottom: -80px; right: 80px; width: 160px; height: 160px; border-radius: 50%; background: rgba(255,255,255,0.04); }
  .name { font-family: 'DM Serif Display', serif; font-size: 42px; letter-spacing: -1px; line-height: 1; margin-bottom: 6px; }
  .title { font-size: 14px; font-weight: 300; letter-spacing: 3px; text-transform: uppercase; opacity: 0.8; margin-bottom: 24px; }
  .contact-row { display: flex; flex-wrap: wrap; gap: 20px; font-size: 12.5px; opacity: 0.85; }
  .contact-item { display: flex; align-items: center; gap: 6px; }
  .contact-dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(255,255,255,0.5); }
  .body { padding: 40px 52px; display: grid; grid-template-columns: 1fr 220px; gap: 40px; }
  .main { }
  .sidebar { }
  .section { margin-bottom: 32px; }
  .section-label { font-size: 10px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: ${accent}; margin-bottom: 14px; padding-bottom: 8px; border-bottom: 2px solid ${accent}; }
  .summary { font-size: 13.5px; line-height: 1.7; color: #374151; }
  .exp-item { margin-bottom: 22px; }
  .exp-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px; }
  .exp-role { font-size: 14.5px; font-weight: 600; color: #111827; }
  .exp-company { font-size: 13px; color: ${accent}; font-weight: 500; margin-bottom: 8px; }
  .exp-period { font-size: 11.5px; color: #9ca3af; letter-spacing: 0.5px; }
  .bullets { list-style: none; padding: 0; }
  .bullets li { font-size: 12.5px; line-height: 1.6; color: #4b5563; padding-left: 14px; position: relative; margin-bottom: 4px; }
  .bullets li::before { content: '▸'; position: absolute; left: 0; color: ${accent}; font-size: 10px; top: 2px; }
  .edu-item { margin-bottom: 16px; }
  .edu-degree { font-size: 13px; font-weight: 600; color: #111827; }
  .edu-school { font-size: 12px; color: #6b7280; margin-top: 2px; }
  .edu-period { font-size: 11px; color: #9ca3af; margin-top: 2px; }
  .skills-wrap { display: flex; flex-wrap: wrap; gap: 8px; }
  .skill-tag { background: #f3f4f6; color: #374151; font-size: 11.5px; font-weight: 500; padding: 5px 12px; border-radius: 20px; border-left: 3px solid ${accent}; }
  @media print { body { padding: 0; background: white; } .page { box-shadow: none; } }
</style>
</head>
<body>
<div class="page">
  <div class="header">
    <div class="name">${data.name}</div>
    <div class="title">${data.title}</div>
    <div class="contact-row">
      <span class="contact-item">${data.email}</span>
      <span class="contact-dot"></span>
      <span class="contact-item">${data.phone}</span>
      <span class="contact-dot"></span>
      <span class="contact-item">${data.location}</span>
      ${data.website ? `<span class="contact-dot"></span><span class="contact-item">${data.website}</span>` : ""}
    </div>
  </div>
  <div class="body">
    <div class="main">
      ${data.summary ? `<div class="section">
        <div class="section-label">Profile</div>
        <p class="summary">${data.summary}</p>
      </div>` : ""}
      <div class="section">
        <div class="section-label">Experience</div>
        ${data.experience.map((e) => `
          <div class="exp-item">
            <div class="exp-header">
              <span class="exp-role">${e.role}</span>
              <span class="exp-period">${e.period}</span>
            </div>
            <div class="exp-company">${e.company}</div>
            <ul class="bullets">
              ${e.bullets.map((b) => `<li>${b}</li>`).join("")}
            </ul>
          </div>
        `).join("")}
      </div>
    </div>
    <div class="sidebar">
      <div class="section">
        <div class="section-label">Education</div>
        ${data.education.map((e) => `
          <div class="edu-item">
            <div class="edu-degree">${e.degree}</div>
            <div class="edu-school">${e.school}</div>
            <div class="edu-period">${e.period}</div>
          </div>
        `).join("")}
      </div>
      <div class="section">
        <div class="section-label">Skills</div>
        <div class="skills-wrap">
          ${data.skills.map((s) => `<span class="skill-tag">${s}</span>`).join("")}
        </div>
      </div>
    </div>
  </div>
</div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.name.replace(/\s+/g, "_")}_Resume.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloading(false);
  };

  const containerStyle = {
    minHeight: "100vh",
    background: "#0f0f0f",
    fontFamily: "'DM Sans', sans-serif",
    color: "#e2e8f0",
  };

  const headerStyle = {
    background: "#1a1a1a",
    borderBottom: "1px solid #2a2a2a",
    padding: "16px 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 50,
  };

  return (
    <div style={containerStyle}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #0f0f0f; } ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        .tab-btn { background: none; border: none; cursor: pointer; padding: 8px 20px; border-radius: 6px; font-size: 13px; font-family: 'DM Sans', sans-serif; font-weight: 500; transition: all 0.2s; }
        .tab-active { background: #fff; color: #0f0f0f; }
        .tab-inactive { color: #94a3b8; }
        .tab-inactive:hover { color: #e2e8f0; }
        .panel { background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 10px; padding: 20px; margin-bottom: 14px; }
        .panel-title { font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: #64748b; margin-bottom: 14px; }
        .field-label { font-size: 11px; color: #64748b; margin-bottom: 5px; font-weight: 500; }
        .field-input { width: 100%; background: #111; border: 1px solid #2a2a2a; border-radius: 6px; padding: 8px 12px; color: #e2e8f0; font-family: 'DM Sans', sans-serif; font-size: 13px; outline: none; transition: border-color 0.2s; }
        .field-input:focus { border-color: #4b5563; }
        .field-input::placeholder { color: #4b5563; }
        .field-row { margin-bottom: 12px; }
        .btn-primary { background: #e2e8f0; color: #0f0f0f; border: none; padding: 10px 24px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; display: flex; align-items: center; gap: 8px; }
        .btn-primary:hover { background: white; transform: translateY(-1px); }
        .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .btn-ghost { background: none; border: 1px dashed #2a2a2a; color: #64748b; padding: 6px 14px; border-radius: 6px; font-size: 12px; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
        .btn-ghost:hover { border-color: #4b5563; color: #94a3b8; }
        .btn-danger { background: none; border: none; color: #ef4444; font-size: 12px; cursor: pointer; padding: 2px 6px; border-radius: 4px; }
        .btn-danger:hover { background: rgba(239,68,68,0.1); }
        .exp-block { background: #111; border: 1px solid #2a2a2a; border-radius: 8px; padding: 14px; margin-bottom: 10px; }
        .color-dot { width: 24px; height: 24px; border-radius: 50%; cursor: pointer; border: 2px solid transparent; transition: all 0.2s; flex-shrink: 0; }
        .color-dot:hover { transform: scale(1.15); }
        .preview-wrap { background: #f8f7f4; border-radius: 12px; overflow: auto; padding: 24px; }
        .resume-page { background: white; width: 794px; min-height: 1000px; margin: 0 auto; box-shadow: 0 20px 60px rgba(0,0,0,0.25); font-family: 'DM Sans', sans-serif; }
        .resume-header { color: white; padding: 44px 52px 36px; position: relative; overflow: hidden; }
        .resume-name { font-family: 'DM Serif Display', serif; font-size: 40px; letter-spacing: -1px; line-height: 1; margin-bottom: 4px; }
        .resume-job-title { font-size: 12.5px; font-weight: 300; letter-spacing: 3px; text-transform: uppercase; opacity: 0.75; margin-bottom: 20px; }
        .resume-contacts { display: flex; flex-wrap: wrap; gap: 16px; font-size: 12px; opacity: 0.85; }
        .resume-body { padding: 36px 52px; display: grid; grid-template-columns: 1fr 210px; gap: 36px; }
        .resume-section { margin-bottom: 28px; }
        .resume-section-label { font-size: 9.5px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 12px; padding-bottom: 7px; border-bottom: 2px solid; }
        .resume-summary { font-size: 13px; line-height: 1.75; color: #374151; }
        .resume-exp-role { font-size: 14px; font-weight: 600; color: #111827; }
        .resume-exp-company { font-size: 12.5px; font-weight: 500; margin-bottom: 8px; }
        .resume-exp-period { font-size: 11px; color: #9ca3af; }
        .resume-bullet { font-size: 12px; line-height: 1.65; color: #4b5563; }
        .resume-skill { background: #f3f4f6; color: #374151; font-size: 11px; font-weight: 500; padding: 4px 11px; border-radius: 20px; display: inline-block; margin: 3px; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
      `}</style>

      {/* Top Bar */}
      <div style={headerStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: 28, height: 28, background: "#e2e8f0", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 14 }}>📄</span>
          </div>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: "#e2e8f0" }}>ResumeForge</span>
        </div>

        <div style={{ display: "flex", gap: 4, background: "#0f0f0f", borderRadius: 8, padding: 4 }}>
          {["edit", "preview"].map((t) => (
            <button key={t} className={`tab-btn ${activeTab === t ? "tab-active" : "tab-inactive"}`} onClick={() => setActiveTab(t)}>
              {t === "edit" ? "✏️ Edit" : "👁 Preview"}
            </button>
          ))}
        </div>

        <button className="btn-primary" onClick={handleDownload} disabled={downloading}>
          {downloading ? "⏳ Preparing..." : "⬇️ Download HTML"}
        </button>
      </div>

      {/* Main */}
      <div style={{ display: "flex", height: "calc(100vh - 65px)" }}>

        {/* Left Editor Panel */}
        <div style={{ width: 360, background: "#0f0f0f", borderRight: "1px solid #1a1a1a", overflowY: "auto", padding: "20px 16px", flexShrink: 0 }}>

          {/* Personal Info */}
          <div className="panel">
            <div className="panel-title">Personal Info</div>
            {[
              { label: "Full Name", key: "name" },
              { label: "Job Title", key: "title" },
              { label: "Email", key: "email" },
              { label: "Phone", key: "phone" },
              { label: "Location", key: "location" },
              { label: "Website", key: "website" },
            ].map(({ label, key }) => (
              <div className="field-row" key={key}>
                <div className="field-label">{label}</div>
                <input className="field-input" value={data[key]} onChange={(e) => updateField(key, e.target.value)} placeholder={label} />
              </div>
            ))}
            <div className="field-row">
              <div className="field-label">Summary</div>
              <textarea className="field-input" value={data.summary} onChange={(e) => updateField("summary", e.target.value)} rows={3} style={{ resize: "vertical" }} />
            </div>
          </div>

          {/* Accent Color */}
          <div className="panel">
            <div className="panel-title">Accent Color</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              {accentColors.map((c) => (
                <div
                  key={c.value}
                  className="color-dot"
                  style={{ background: c.value, borderColor: accent === c.value ? "#e2e8f0" : "transparent", boxShadow: accent === c.value ? `0 0 0 3px rgba(255,255,255,0.15)` : "none" }}
                  onClick={() => setAccent(c.value)}
                  title={c.name}
                />
              ))}
              <input type="color" value={accent} onChange={(e) => setAccent(e.target.value)} style={{ width: 24, height: 24, border: "none", borderRadius: "50%", cursor: "pointer", background: "none" }} title="Custom color" />
            </div>
          </div>

          {/* Experience */}
          <div className="panel">
            <div className="panel-title">Experience</div>
            {data.experience.map((exp) => (
              <div className="exp-block" key={exp.id}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: "#64748b" }}>Position</span>
                  <button className="btn-danger" onClick={() => removeExperience(exp.id)}>✕</button>
                </div>
                <div className="grid-2">
                  <div className="field-row">
                    <div className="field-label">Role</div>
                    <input className="field-input" value={exp.role} onChange={(e) => updateExp(exp.id, "role", e.target.value)} />
                  </div>
                  <div className="field-row">
                    <div className="field-label">Company</div>
                    <input className="field-input" value={exp.company} onChange={(e) => updateExp(exp.id, "company", e.target.value)} />
                  </div>
                </div>
                <div className="field-row">
                  <div className="field-label">Period</div>
                  <input className="field-input" value={exp.period} onChange={(e) => updateExp(exp.id, "period", e.target.value)} />
                </div>
                <div className="field-label">Bullets</div>
                {exp.bullets.map((b, i) => (
                  <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                    <input className="field-input" value={b} onChange={(e) => updateBullet(exp.id, i, e.target.value)} style={{ flex: 1 }} />
                    <button className="btn-danger" onClick={() => removeBullet(exp.id, i)}>✕</button>
                  </div>
                ))}
                <button className="btn-ghost" onClick={() => addBullet(exp.id)}>+ Add bullet</button>
              </div>
            ))}
            <button className="btn-ghost" style={{ width: "100%" }} onClick={addExperience}>+ Add Experience</button>
          </div>

          {/* Education */}
          <div className="panel">
            <div className="panel-title">Education</div>
            {data.education.map((edu) => (
              <div className="exp-block" key={edu.id}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: "#64748b" }}>Degree</span>
                  <button className="btn-danger" onClick={() => removeEducation(edu.id)}>✕</button>
                </div>
                {[
                  { label: "Degree", key: "degree" },
                  { label: "School", key: "school" },
                  { label: "Period", key: "period" },
                ].map(({ label, key }) => (
                  <div className="field-row" key={key}>
                    <div className="field-label">{label}</div>
                    <input className="field-input" value={edu[key]} onChange={(e) => updateEdu(edu.id, key, e.target.value)} />
                  </div>
                ))}
              </div>
            ))}
            <button className="btn-ghost" style={{ width: "100%" }} onClick={addEducation}>+ Add Education</button>
          </div>

          {/* Skills */}
          <div className="panel">
            <div className="panel-title">Skills</div>
            <div className="field-label">Comma-separated list</div>
            <textarea className="field-input" value={data.skills.join(", ")} onChange={(e) => updateSkills(e.target.value)} rows={3} style={{ resize: "vertical" }} />
          </div>
        </div>

        {/* Right Preview */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          <div className="preview-wrap">
            <div className="resume-page" ref={resumeRef}>
              {/* Header */}
              <div className="resume-header" style={{ background: accent }}>
                <div style={{ position: "absolute", top: -50, right: -50, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
                <div className="resume-name">{data.name || "Your Name"}</div>
                <div className="resume-job-title">{data.title || "Your Title"}</div>
                <div className="resume-contacts">
                  {data.email && <span>{data.email}</span>}
                  {data.phone && <><span style={{ opacity: 0.4 }}>·</span><span>{data.phone}</span></>
                  {data.location && <><span style={{ opacity: 0.4 }}>·</span><span>{data.location}</span></>
                  {data.website && <><span style={{ opacity: 0.4 }}>·</span><span>{data.website}</span></>
                </div>
              </div>

              {/* Body */}
              <div className="resume-body">
                {/* Main Column */}
                <div>
                  {data.summary && (
                    <div className="resume-section">
                      <div className="resume-section-label" style={{ color: accent, borderColor: accent }}>Profile</div>
                      <p className="resume-summary">{data.summary}</p>
                    </div>
                  )}

                  <div className="resume-section">
                    <div className="resume-section-label" style={{ color: accent, borderColor: accent }}>Experience</div>
                    {data.experience.map((exp) => (
                      <div key={exp.id} style={{ marginBottom: 20 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                          <span className="resume-exp-role">{exp.role}</span>
                          <span className="resume-exp-period">{exp.period}</span>
                        </div>
                        <div className="resume-exp-company" style={{ color: accent }}>{exp.company}</div>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                          {exp.bullets.map((b, i) => (
                            <li key={i} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                              <span style={{ color: accent, fontSize: 10, marginTop: 3, flexShrink: 0 }}>▸</span>
                              <span className="resume-bullet">{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sidebar */}
                <div>
                  <div className="resume-section">
                    <div className="resume-section-label" style={{ color: accent, borderColor: accent }}>Education</div>
                    {data.education.map((edu) => (
                      <div key={edu.id} style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{edu.degree}</div>
                        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{edu.school}</div>
                        <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{edu.period}</div>
                      </div>
                    ))}
                  </div>

                  <div className="resume-section">
                    <div className="resume-section-label" style={{ color: accent, borderColor: accent }}>Skills</div>
                    <div>
                      {data.skills.map((s, i) => (
                        <span key={i} className="resume-skill" style={{ borderLeft: `3px solid ${accent}` }}>{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}