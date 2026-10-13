// One-off spot check: resolve specific part names to their structure owner.
import fs from "node:fs";
const atlas = JSON.parse(fs.readFileSync("src/models/atlas.json", "utf8"));
const pm = JSON.parse(fs.readFileSync("src/part-map.json", "utf8"));
const rev = {};
for (const [k, v] of Object.entries(pm)) for (const p of v) rev[p] = k;
const names = [
  "skin", "Urinary bladder", "Ureter", "Appendix", "Tongue",
  "Septal nasal cartilage", "Pharyngeal constrictor",
  "Right common carotid", "Middle cerebral artery", "Anterior cerebral artery",
  "Right internal carotid", "Hepatic duct", "Cystic duct",
  "Corpus cavernosum", "Epididymis",
  "Right tibialis anterior", "Right gastrocnemius lateral head",
  "Right quadriceps femoris", "Wall of atrium",
  "Right pulmonary artery", "Right pulmonary vein",
  "Esophagus", "Trachea", "Right main bronchus", "Diaphragm",
  "Right femoral nerve", "Vagus nerve", "Right phrenic nerve",
  "Pancreas", "Gallbladder", "Right adrenal gland", "Left kidney",
  "Prostate", "Right seminal vesicle",
  "Hair", "Nail of right thumb", "Right eyelid", "Lower lip",
  "Right lacrimal gland", "Left inferior rectus", "Left lateral rectus",
  "Left inferior oblique", "Left superior oblique", "Left frontal nerve",
  "Left cornea", "Linea alba", "Right calcaneal tendon",
];
for (const n of names) {
  const hits = [];
  atlas.parts.forEach((p, i) => {
    if ((p.name || "").toLowerCase() === n.toLowerCase()) {
      hits.push(`#${i} [${p.chunk}] -> ${rev[i] || "NONE"}`);
    }
  });
  console.log(n.padEnd(32), hits.join(" , ") || "(no exact part)");
}
