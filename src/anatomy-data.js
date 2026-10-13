// Clean-room anatomy database: standard public-domain terminology (EN/ES/FR/Latin).
// Vocabulary cross-checked against APK term lists; all descriptions original.
// Classification: system → subgroup (g) and body region (r) for grouped browsing.
export const SYSTEMS = [
  { id: "skeletal", en: "Skeletal", es: "Esquelético", fr: "Squelettique", color: "#e8e4da" },
  { id: "muscular", en: "Muscular", es: "Muscular", fr: "Musculaire", color: "#e05757" },
  { id: "cardiovascular", en: "Cardiovascular", es: "Cardiovascular", fr: "Cardiovasculaire", color: "#d63b3b" },
  { id: "nervous", en: "Nervous", es: "Nervioso", fr: "Nerveux", color: "#f2c94c" },
  { id: "respiratory", en: "Respiratory", es: "Respiratorio", fr: "Respiratoire", color: "#7cc7e8" },
  { id: "digestive", en: "Digestive", es: "Digestivo", fr: "Digestif", color: "#e8a05c" },
  { id: "urinary", en: "Urinary", es: "Urinario", fr: "Urinaire", color: "#9ad0a5" },
  { id: "reproductive", en: "Reproductive", es: "Reproductor", fr: "Reproducteur", color: "#c58af0" },
  { id: "lymphatic", en: "Lymphatic", es: "Linfático", fr: "Lymphatique", color: "#8fe3a0" },
  { id: "endocrine", en: "Endocrine", es: "Endocrino", fr: "Endocrinien", color: "#f0a6d8" },
  { id: "integumentary", en: "Integumentary", es: "Tegumentario", fr: "Tégumentaire", color: "#d9a066" },
  { id: "sectional", en: "Sections & histology", es: "Cortes e histología", fr: "Coupes et histologie", color: "#9aa7ff" },
];

// Body regions (cross-cutting view), top → bottom, plus limbs and whole-body.
export const REGIONS = [
  { id: "head_neck", en: "Head & neck", es: "Cabeza y cuello", fr: "Tête et cou", color: "#7dd3fc" },
  { id: "thorax", en: "Thorax (chest)", es: "Tórax (pecho)", fr: "Thorax (poitrine)", color: "#fda4af" },
  { id: "abdomen", en: "Abdomen", es: "Abdomen", fr: "Abdomen", color: "#fcd34d" },
  { id: "pelvis", en: "Pelvis & perineum", es: "Pelvis y periné", fr: "Bassin et périnée", color: "#c4b5fd" },
  { id: "back", en: "Back", es: "Espalda", fr: "Dos", color: "#a3e635" },
  { id: "upper_limb", en: "Upper limb", es: "Miembro superior", fr: "Membre supérieur", color: "#5eead4" },
  { id: "lower_limb", en: "Lower limb", es: "Miembro inferior", fr: "Membre inférieur", color: "#fb923c" },
  { id: "whole_body", en: "Whole body / general", es: "Cuerpo entero / general", fr: "Corps entier / général", color: "#94a3b8" },
];

// Subgroups per system (the hierarchy shown inside each system tab).
export const SUBGROUPS = {
  skeletal: [
    { id: "skull", en: "Skull & face", es: "Cráneo y cara", fr: "Crâne et face" },
    { id: "vertebrae", en: "Vertebral column", es: "Columna vertebral", fr: "Colonne vertébrale" },
    { id: "thoracic_cage", en: "Thoracic cage", es: "Caja torácica", fr: "Cage thoracique" },
    { id: "upper_limb", en: "Upper limb & shoulder", es: "Miembro superior y hombro", fr: "Membre supérieur et épaule" },
    { id: "lower_limb_pelvis", en: "Lower limb & pelvis", es: "Miembro inferior y pelvis", fr: "Membre inférieur et bassin" },
    { id: "joints_ligaments", en: "Joints & ligaments", es: "Articulaciones y ligamentos", fr: "Articulations et ligaments" },
  ],
  muscular: [
    { id: "head_neck", en: "Head & neck", es: "Cabeza y cuello", fr: "Tête et cou" },
    { id: "trunk", en: "Trunk & breathing", es: "Tronco y respiración", fr: "Tronc et respiration" },
    { id: "back", en: "Back & shoulder girdle", es: "Espalda y cintura escapular", fr: "Dos et ceinture scapulaire" },
    { id: "upper_limb", en: "Upper limb", es: "Miembro superior", fr: "Membre supérieur" },
    { id: "lower_limb", en: "Lower limb & hip", es: "Miembro inferior y cadera", fr: "Membre inférieur et hanche" },
    { id: "pelvic_floor", en: "Pelvic floor", es: "Suelo pélvico", fr: "Plancher pelvien" },
  ],
  cardiovascular: [
    { id: "heart", en: "Heart & valves", es: "Corazón y válvulas", fr: "Cœur et valves" },
    { id: "arteries", en: "Arteries", es: "Arterias", fr: "Artères" },
    { id: "veins", en: "Veins & drainage", es: "Venas y drenaje", fr: "Veines et drainage" },
  ],
  nervous: [
    { id: "brain", en: "Brain & deep structures", es: "Cerebro y estructuras profundas", fr: "Cerveau et structures profondes" },
    { id: "spinal_cord", en: "Spinal cord", es: "Médula espinal", fr: "Moelle épinière" },
    { id: "nerves", en: "Nerves & plexuses", es: "Nervios y plexos", fr: "Nerfs et plexus" },
  ],
  respiratory: [
    { id: "airway", en: "Airway", es: "Vía aérea", fr: "Voies aériennes" },
    { id: "lungs", en: "Lungs & lining", es: "Pulmones y revestimiento", fr: "Poumons et plèvre" },
    { id: "breathing_muscles", en: "Breathing muscles", es: "Músculos respiratorios", fr: "Muscles respiratoires" },
  ],
  digestive: [
    { id: "mouth", en: "Mouth & salivary", es: "Boca y glándulas salivales", fr: "Bouche et glandes salivaires" },
    { id: "glands", en: "Accessory glands", es: "Glándulas anejas", fr: "Glandes accessoires" },
    { id: "gut", en: "The gut tube", es: "Tubo digestivo", fr: "Tube digestif" },
    { id: "vessels", en: "Vessels", es: "Vasos", fr: "Vaisseaux" },
  ],
  urinary: [
    { id: "kidney", en: "Kidney & filtration", es: "Riñón y filtración", fr: "Rein et filtration" },
    { id: "excretory_path", en: "Outflow path", es: "Vía excretora", fr: "Voie excrétrice" },
  ],
  reproductive: [
    { id: "male", en: "Male", es: "Masculino", fr: "Masculin" },
    { id: "female", en: "Female", es: "Femenino", fr: "Féminin" },
  ],
  lymphatic: [
    { id: "organs", en: "Lymphoid organs", es: "Órganos linfoides", fr: "Organes lymphoïdes" },
    { id: "vessels", en: "Lymph vessels", es: "Vasos linfáticos", fr: "Vaisseaux lymphatiques" },
    { id: "nodes", en: "Nodes", es: "Ganglios", fr: "Ganglions" },
  ],
  endocrine: [
    { id: "glands", en: "Endocrine glands", es: "Glándulas endocrinas", fr: "Glandes endocrines" },
  ],
  integumentary: [
    { id: "skin", en: "Skin", es: "Piel", fr: "Peau" },
    { id: "appendages", en: "Skin appendages", es: "Anexos cutáneos", fr: "Annexes cutanées" },
  ],
  sectional: [
    { id: "sections", en: "Cross-sections", es: "Cortes", fr: "Coupes" },
    { id: "histology", en: "Histology", es: "Histología", fr: "Histologie" },
  ],
};

export const HISTOLOGY = [
  { id: "HUESO", en: "Bone", es: "Hueso", fr: "Os" },
  { id: "DIENTE", en: "Tooth", es: "Diente", fr: "Dent" },
  { id: "LIGAMENTO", en: "Ligament", es: "Ligamento", fr: "Ligament" },
  { id: "FASCIA_SIMPLE", en: "Simple fascia", es: "Fascia simple", fr: "Fascia simple" },
  { id: "ARTERIA", en: "Artery", es: "Arteria", fr: "Artère" },
  { id: "MUSCULO_ESQUELETICO", en: "Skeletal muscle", es: "Músculo esquelético", fr: "Muscle squelettique" },
  { id: "VENA", en: "Vein", es: "Vena", fr: "Veine" },
  { id: "NERVIO", en: "Nerve", es: "Nervio", fr: "Nerf" },
  { id: "SUSTANCIA_BLANCA", en: "White matter", es: "Sustancia blanca", fr: "Substance blanche" },
  { id: "SUSTANCIA_GRIS", en: "Gray matter", es: "Sustancia gris", fr: "Substance grise" },
  { id: "CARTILAGO", en: "Cartilage", es: "Cartílago", fr: "Cartilage" },
  { id: "PULMON", en: "Lung tissue", es: "Tejido pulmonar", fr: "Tissu pulmonaire" },
  { id: "GANGLIOLINFATICO", en: "Lymph node", es: "Ganglio linfático", fr: "Ganglion lymphatique" },
  { id: "GLANDULA", en: "Gland", es: "Glándula", fr: "Glande" },
  { id: "MUSCULO_LISO", en: "Smooth muscle", es: "Músculo liso", fr: "Muscle lisse" },
  { id: "PIEL", en: "Skin", es: "Piel", fr: "Peau" },
];

// id, s=system, g=subgroup, r=region, en, la, es, h=histology idx, d=en desc, de=es desc, fr, df, m=mesh key
export const STRUCTURES = [
// ── SKELETAL (41) ──
// skull & face
{id:"sk_frontal",s:"skeletal",g:"skull",r:"head_neck",en:"Frontal bone",la:"Os frontale",es:"Hueso frontal",h:0,d:"Forehead bone forming the anterior cranium and orbital roofs.",de:"Hueso de la frente que forma el cráneo anterior y el techo orbitario.",fr:"Os frontal",df:"Os du front formant l'avant du crâne et le toit des orbites.",m:"skull"},
{id:"sk_parietal",s:"skeletal",g:"skull",r:"head_neck",en:"Parietal bone",la:"Os parietale",es:"Hueso parietal",h:0,d:"Paired plate forming the sides and roof of the cranium.",de:"Hueso par que forma los lados y la bóveda craneal.",fr:"Os pariétal",df:"Plaque paire formant les côtés et la voûte du crâne.",m:"skull"},
{id:"sk_occipital",s:"skeletal",g:"skull",r:"head_neck",en:"Occipital bone",la:"Os occipitale",es:"Hueso occipital",h:0,d:"Posterior skull bone with the foramen magnum for the spinal cord.",de:"Hueso posterior con el foramen magno para la médula.",fr:"Os occipital",df:"Os postérieur percé du foramen magnum pour la moelle.",m:"skull"},
{id:"sk_temporal",s:"skeletal",g:"skull",r:"head_neck",en:"Temporal bone",la:"Os temporale",es:"Hueso temporal",h:0,d:"Houses the inner ear; its mastoid and petrous parts anchor jaw muscles.",de:"Alberga el oído interno; mastoides y peñasco anclan músculos.",fr:"Os temporal",df:"Abrite l'oreille interne ; mastoïde et rocher ancrent la mâchoire.",m:"skull"},
{id:"sk_sphenoid",s:"skeletal",g:"skull",r:"head_neck",en:"Sphenoid bone",la:"Os sphenoidale",es:"Hueso esfenoides",h:0,d:"Butterfly-shaped keystone of the cranial base holding the pituitary.",de:"Hueso en mariposa, clave de la base craneal, aloja la hipófisis.",fr:"Os sphénoïde",df:"Os en papillon, clé de la base du crâne, logeant l'hypophyse.",m:"skull"},
{id:"sk_ethmoid",s:"skeletal",g:"skull",r:"head_neck",en:"Ethmoid bone",la:"Os ethmoidale",es:"Hueso etmoides",h:0,d:"Light sievelike bone between the orbits; roof of the nasal cavity.",de:"Hueso cribiforme entre las órbitas; techo de la cavidad nasal.",fr:"Os ethmoïde",df:"Os criblé entre les orbites ; toit des fosses nasales.",m:"skull"},
{id:"sk_maxilla",s:"skeletal",g:"skull",r:"head_neck",en:"Maxilla",la:"Maxilla",es:"Maxilar superior",h:0,d:"Upper jaw holding the upper teeth and forming the midface.",de:"Maxilar superior con los dientes superiores; forma el rostro medio.",fr:"Maxillaire",df:"Mâchoire supérieure portant les dents, formant le milieu du visage.",m:"maxilla"},
{id:"sk_mandible",s:"skeletal",g:"skull",r:"head_neck",en:"Mandible",la:"Mandibula",es:"Mandíbula",h:0,d:"Lower jaw; the only movable skull bone, hinged at the TMJ.",de:"Maxilar inferior; único hueso móvil del cráneo, articulado en la ATM.",fr:"Mandibule",df:"Mâchoire inférieure ; seul os mobile du crâne, articulé à l'ATM.",m:"mandible"},
{id:"sk_zygomatic",s:"skeletal",g:"skull",r:"head_neck",en:"Zygomatic bone",la:"Os zygomaticum",es:"Hueso cigomático",h:0,d:"Cheekbone bridging face and cranium, anchoring masseter.",de:"Pómulo que une cara y cráneo y ancla el masetero.",fr:"Os zygomatique",df:"Pommette reliant face et crâne, ancrant le masséter.",m:"skull"},
{id:"sk_nasal",s:"skeletal",g:"skull",r:"head_neck",en:"Nasal bone",la:"Os nasale",es:"Hueso nasal",h:0,d:"Small paired bones forming the bridge of the nose.",de:"Pequeños huesos pares que forman el puente nasal.",fr:"Os nasal",df:"Petits os pairs formant l'arête du nez.",m:"skull"},
{id:"sk_hyoid",s:"skeletal",g:"skull",r:"head_neck",en:"Hyoid bone",la:"Os hyoideum",es:"Hueso hioides",h:0,d:"U-shaped bone in the neck suspending tongue and larynx muscles.",de:"Hueso en U del cuello que suspende lengua y laringe.",fr:"Os hyoïde",df:"Os en U du cou suspendant langue et larynx.",m:"hyoid"},
{id:"sk_nasolacrimal",s:"skeletal",g:"skull",r:"head_neck",en:"Nasolacrimal canal",la:"Canalis nasolacrimalis",es:"Conducto nasolagrimal",h:0,d:"Bony drain from the eye socket to the nasal cavity.",de:"Drenaje óseo del ojo a la cavidad nasal.",fr:"Canal nasolacrymal",df:"Drain osseux de l'œil vers les fosses nasales.",m:null},
{id:"sk_alveoli",s:"skeletal",g:"skull",r:"head_neck",en:"Mandibular dental alveoli",la:"Alveoli dentales mandibulae",es:"Alvéolos dentales mandibulares",h:1,d:"Tooth sockets of the lower jaw.",de:"Cavidades dentales del maxilar inferior.",fr:"Alvéoles mandibulaires",df:"Logettes dentaires de la mâchoire inférieure.",m:"mandible"},
{id:"sk_auricular",s:"skeletal",g:"skull",r:"head_neck",en:"Auricular cartilage",la:"Cartilago auricularis",es:"Cartílago auricular",h:10,d:"Elastic cartilage shaping the outer ear.",de:"Cartílago elástico del pabellón auricular.",fr:"Cartilage auriculaire",df:"Cartilage élastique du pavillon de l'oreille.",m:null},
// vertebral column
{id:"sk_cervical",s:"skeletal",g:"vertebrae",r:"head_neck",en:"Cervical vertebrae",la:"Vertebrae cervicales",es:"Vértebras cervicales",h:0,d:"Seven neck vertebrae (C1–C7); atlas and axis allow head rotation.",de:"Siete vértebras cervicales (C1–C7); atlas y axis rotan la cabeza.",fr:"Vertèbres cervicales",df:"Sept vertèbres du cou (C1-C7) ; atlas et axis pivotent la tête.",m:"spine_cerv"},
{id:"sk_thoracic",s:"skeletal",g:"vertebrae",r:"back",en:"Thoracic vertebrae",la:"Vertebrae thoracicae",es:"Vértebras torácicas",h:0,d:"Twelve rib-bearing vertebrae (T1–T12) forming the upper back.",de:"Doce vértebras con costillas (T1–T12) del dorso superior.",fr:"Vertèbres thoraciques",df:"Douze vertèbres costales (T1-T12) du haut du dos.",m:"spine_thor"},
{id:"sk_lumbar",s:"skeletal",g:"vertebrae",r:"back",en:"Lumbar vertebrae",la:"Vertebrae lumbales",es:"Vértebras lumbares",h:0,d:"Five massive lower-back vertebrae carrying trunk weight.",de:"Cinco vértebras lumbares macizas que cargan el tronco.",fr:"Vertèbres lombaires",df:"Cinq vertèbres massives portant le tronc.",m:"spine_lumb"},
{id:"sk_sacrum",s:"skeletal",g:"vertebrae",r:"pelvis",en:"Sacrum",la:"Os sacrum",es:"Sacro",h:0,d:"Fused triangular bone wedging the pelvis between the hips.",de:"Hueso triangular fusionado que encaja la pelvis.",fr:"Sacrum",df:"Os triangulaire soudé calant le bassin.",m:"sacrum"},
{id:"sk_coccyx",s:"skeletal",g:"vertebrae",r:"pelvis",en:"Coccyx",la:"Os coccygis",es:"Cóccix",h:0,d:"Tailbone remnant anchoring pelvic floor ligaments.",de:"Vestigio caudal que ancla el suelo pélvico.",fr:"Coccyx",df:"Vestige caudal ancrant le plancher pelvien.",m:"sacrum"},
// thoracic cage
{id:"sk_sternum",s:"skeletal",g:"thoracic_cage",r:"thorax",en:"Sternum",la:"Sternum",es:"Esternón",h:0,d:"Breastbone joining the collarbones and first seven ribs.",de:"Esternón que une clavículas y siete primeras costillas.",fr:"Sternum",df:"Os plat unissant clavicules et sept premières côtes.",m:"sternum"},
{id:"sk_ribs",s:"skeletal",g:"thoracic_cage",r:"thorax",en:"Ribs",la:"Costae",es:"Costillas",h:0,d:"Twelve pairs guarding heart and lungs; last two float free.",de:"Doce pares que protegen corazón y pulmones; dos flotantes.",fr:"Côtes",df:"Douze paires protégeant cœur et poumons ; deux flottantes.",m:"ribs"},
// upper limb
{id:"sk_clavicle",s:"skeletal",g:"upper_limb",r:"upper_limb",en:"Clavicle",la:"Clavicula",es:"Clavícula",h:0,d:"Collarbone strut from sternum to shoulder blade.",de:"Puntal entre esternón y escápula.",fr:"Clavicule",df:"Arc-boutant du sternum à l'épaule.",m:"clavicle_l"},
{id:"sk_scapula",s:"skeletal",g:"upper_limb",r:"upper_limb",en:"Scapula",la:"Scapula",es:"Escápula",h:0,d:"Shoulder blade gliding on the ribcage, socket for the humerus.",de:"Omóplato sobre las costillas, cavidad para el húmero.",fr:"Omoplate",df:"Plaque glissant sur les côtes, cavité pour l'humérus.",m:"scapula_l"},
{id:"sk_humerus",s:"skeletal",g:"upper_limb",r:"upper_limb",en:"Humerus",la:"Humerus",es:"Húmero",h:0,d:"Upper-arm bone from shoulder to elbow.",de:"Hueso del brazo, del hombro al codo.",fr:"Humérus",df:"Os du bras, de l'épaule au coude.",m:"humerus_l"},
{id:"sk_radius",s:"skeletal",g:"upper_limb",r:"upper_limb",en:"Radius",la:"Radius",es:"Radio",h:0,d:"Lateral forearm bone that rolls over the ulna in pronation.",de:"Hueso lateral del antebrazo que rota sobre el cúbito.",fr:"Radius",df:"Os latéral de l'avant-bras pivotant sur l'ulna.",m:"radius_l"},
{id:"sk_ulna",s:"skeletal",g:"upper_limb",r:"upper_limb",en:"Ulna",la:"Ulna",es:"Cúbito",h:0,d:"Medial forearm bone forming the elbow hinge with the humerus.",de:"Hueso medial que forma el codo con el húmero.",fr:"Ulna",df:"Os médial formant le coude avec l'humérus.",m:"ulna_l"},
{id:"sk_carpals",s:"skeletal",g:"upper_limb",r:"upper_limb",en:"Carpal bones",la:"Ossa carpi",es:"Huesos del carpo",h:0,d:"Eight wrist pebbles in two rows enabling hand dexterity.",de:"Ocho huesecillos de la muñeca en dos filas.",fr:"Os du carpe",df:"Huit osselets du poignet en deux rangées.",m:"hand_l"},
{id:"sk_metacarpals",s:"skeletal",g:"upper_limb",r:"upper_limb",en:"Metacarpal bones",la:"Ossa metacarpi",es:"Metacarpianos",h:0,d:"Five palm bones fanning from wrist to fingers.",de:"Cinco huesos de la palma hacia los dedos.",fr:"Métacarpiens",df:"Cinq os de la paume vers les doigts.",m:"hand_l"},
{id:"sk_phalanges_hand",s:"skeletal",g:"upper_limb",r:"upper_limb",en:"Phalanges of hand",la:"Phalanges manus",es:"Falanges de la mano",h:0,d:"Fourteen finger bones, three per finger and two in the thumb.",de:"Catorce huesos; tres por dedo y dos en el pulgar.",fr:"Phalanges de la main",df:"Quatorze os ; trois par doigt, deux pour le pouce.",m:"hand_l"},
// lower limb & pelvis
{id:"sk_coxae",s:"skeletal",g:"lower_limb_pelvis",r:"pelvis",en:"Hip bone",la:"Os coxae",es:"Hueso coxal",h:0,d:"Fused ilium, ischium and pubis forming the pelvic wall.",de:"Ilion, isquion y pubis fusionados; pared pélvica.",fr:"Os coxal",df:"Ilion, ischion et pubis soudés ; paroi pelvienne.",m:"pelvis"},
{id:"sk_femur",s:"skeletal",g:"lower_limb_pelvis",r:"lower_limb",en:"Femur",la:"Femur",es:"Fémur",h:0,d:"Longest, strongest bone: thigh from hip to knee.",de:"El hueso más largo y fuerte: del muslo.",fr:"Fémur",df:"Os le plus long et solide : la cuisse.",m:"femur_l"},
{id:"sk_patella",s:"skeletal",g:"lower_limb_pelvis",r:"lower_limb",en:"Patella",la:"Patella",es:"Rótula",h:0,d:"Kneecap sesamoid boosting quadriceps leverage.",de:"Sesamoideo que potencia el cuádriceps.",fr:"Rotule",df:"Sésamoïde démultipliant le quadriceps.",m:"patella_l"},
{id:"sk_tibia",s:"skeletal",g:"lower_limb_pelvis",r:"lower_limb",en:"Tibia",la:"Tibia",es:"Tibia",h:0,d:"Shinbone carrying most of the leg load to the ankle.",de:"Hueso de la espinilla que carga la pierna.",fr:"Tibia",df:"Os de la jambe portant la charge.",m:"tibia_l"},
{id:"sk_fibula",s:"skeletal",g:"lower_limb_pelvis",r:"lower_limb",en:"Fibula",la:"Fibula",es:"Peroné",h:0,d:"Slender lateral leg bone anchoring ankle ligaments.",de:"Delgado hueso lateral que ancla el tobillo.",fr:"Fibula",df:"Fin os latéral ancrant la cheville.",m:"fibula_l"},
{id:"sk_tarsals",s:"skeletal",g:"lower_limb_pelvis",r:"lower_limb",en:"Tarsal bones",la:"Ossa tarsi",es:"Huesos del tarso",h:0,d:"Seven ankle bones including talus and calcaneus.",de:"Siete huesos del tobillo, incluidos astrágalo y calcáneo.",fr:"Os du tarse",df:"Sept os de la cheville, dont talus et calcanéus.",m:"foot_l"},
{id:"sk_metatarsals",s:"skeletal",g:"lower_limb_pelvis",r:"lower_limb",en:"Metatarsal bones",la:"Ossa metatarsi",es:"Metatarsianos",h:0,d:"Five sole bones forming the foot arches.",de:"Cinco huesos de la planta que forman los arcos.",fr:"Métatarsiens",df:"Cinq os de la plante formant les arches.",m:"foot_l"},
{id:"sk_phalanges_foot",s:"skeletal",g:"lower_limb_pelvis",r:"lower_limb",en:"Phalanges of foot",la:"Phalanges pedis",es:"Falanges del pie",h:0,d:"Fourteen toe bones stabilizing gait and balance.",de:"Catorce huesos de los dedos del pie.",fr:"Phalanges du pied",df:"Quatorze os d'orteils stabilisant la marche.",m:"foot_l"},
// joints & ligaments
{id:"sk_suture",s:"skeletal",g:"joints_ligaments",r:"head_neck",en:"Occipitomastoid suture",la:"Sutura occipitomastoidea",es:"Sutura occipitomastoidea",h:2,d:"Fibrous joint between occipital and temporal bones.",de:"Articulación fibrosa entre occipital y temporal.",fr:"Suture occipito-mastoïdienne",df:"Joint fibreux entre occipital et temporal.",m:null},
{id:"sk_allong",s:"skeletal",g:"joints_ligaments",r:"back",en:"Anterior longitudinal ligament",la:"Ligamentum longitudinale anterius",es:"Ligamento longitudinal anterior",h:2,d:"Broad band down the front of all vertebral bodies.",de:"Banda ancha frontal de los cuerpos vertebrales.",fr:"Ligament longitudinal antérieur",df:"Large bande au-devant des corps vertébraux.",m:null},
{id:"sk_paltrans",s:"skeletal",g:"joints_ligaments",r:"head_neck",en:"Transverse palatine suture",la:"Sutura palatina transversa",es:"Sutura palatina transversa",h:0,d:"Seam joining palatine processes to the palatine bones.",de:"Unión del paladar óseo con los palatinos.",fr:"Suture palatine transverse",df:"Joint du palais osseux aux os palatins.",m:null},
{id:"sk_pterygoraphe",s:"skeletal",g:"joints_ligaments",r:"head_neck",en:"Pterygomandibular raphe",la:"Raphe pterygomandibularis",es:"Rafe pterigomandibular",h:3,d:"Tendinous seam between the two pterygoid-adjacent constrictors.",de:"Unión tendinosa de constrictores faríngeos.",fr:"Raphé ptérygo-mandibulaire",df:"Joint tendineux des constricteurs du pharynx.",m:null},

// ── MUSCULAR (39) ──
// head & neck
{id:"mu_masseter",s:"muscular",g:"head_neck",r:"head_neck",en:"Masseter muscle",la:"Musculus masseter",es:"Músculo masetero",h:5,d:"Powerful jaw closer from cheekbone to mandible.",de:"Potente cierre mandibular del cigomático a la mandíbula.",fr:"Masséter",df:"Puissant fermeur de la mâchoire, du zygomatique à la mandibule.",m:"masseter"},
{id:"mu_temporalis",s:"muscular",g:"head_neck",r:"head_neck",en:"Temporalis muscle",la:"Musculus temporalis",es:"Músculo temporal",h:5,d:"Fan on the temple driving the bite.",de:"Abanico temporal que impulsa la mordida.",fr:"Temporal",df:"Éventail de la tempe commandant la morsure.",m:null},
{id:"mu_temporoparietalis",s:"muscular",g:"head_neck",r:"head_neck",en:"Temporoparietalis muscle",la:"Musculus temporoparietalis",es:"Músculo temporoparietal",h:5,d:"Thin scalp sheet above the ear, lifting brow and ear.",de:"Lámina fina sobre la oreja que eleva ceja y oído.",fr:"Temporo-pariétal",df:"Fine lame sur l'oreille soulevant sourcil et oreille.",m:null},
{id:"mu_scm",s:"muscular",g:"head_neck",r:"head_neck",en:"Sternocleidomastoid",la:"Musculus sternocleidomastoideus",es:"Esternocleidomastoideo",h:5,d:"Neck strap turning and tilting the head.",de:"Cinta cervical que gira e inclina la cabeza.",fr:"Sterno-cléido-mastoïdien",df:"Sangle du cou tournant et inclinant la tête.",m:"scm"},
{id:"mu_mylohyoid",s:"muscular",g:"head_neck",r:"head_neck",en:"Mylohyoid muscle",la:"Musculus mylohyoideus",es:"Músculo mílohioides",h:5,d:"Diamond sheet forming the floor of the mouth.",de:"Lámina que forma el suelo de la boca.",fr:"Mylohyoïdien",df:"Plaque losange formant le plancher de la bouche.",m:"mylohyoid"},
{id:"mu_digastric",s:"muscular",g:"head_neck",r:"head_neck",en:"Digastric muscle",la:"Musculus digastricus",es:"Músculo digástrico",h:5,d:"Two-bellied strap lifting the hyoid when swallowing.",de:"Cinta de dos vientres que eleva el hioides al tragar.",fr:"Digastrique",df:"Lame à deux ventres soulevant l'hyoïde.",m:"digastric"},
// trunk & breathing
{id:"mu_pectoralis",s:"muscular",g:"trunk",r:"thorax",en:"Pectoralis major",la:"Musculus pectoralis major",es:"Pectoral mayor",h:5,d:"Chest slab pushing and hugging with the arm.",de:"Placa torácica que empuja y abraza.",fr:"Grand pectoral",df:"Plaque thoracique poussant et enlaçant.",m:"pec_l"},
{id:"mu_rectusabd",s:"muscular",g:"trunk",r:"abdomen",en:"Rectus abdominis",la:"Musculus rectus abdominis",es:"Recto abdominal",h:5,d:"Six-pack strap flexing the trunk.",de:"Cinta abdominal que flexiona el tronco.",fr:"Grand droit de l'abdomen",df:"Sangle abdominale fléchissant le tronc.",m:"rectusabd"},
{id:"mu_obliques",s:"muscular",g:"trunk",r:"abdomen",en:"External oblique",la:"Musculus obliquus externus",es:"Oblicuo externo",h:5,d:"Side-wall sheet twisting and compressing the belly.",de:"Lámina lateral que rota y comprime.",fr:"Oblique externe",df:"Lame latérale tordant et comprimant le ventre.",m:null},
{id:"mu_transvthoracis",s:"muscular",g:"trunk",r:"thorax",en:"Transversus thoracis",la:"Musculus transversus thoracis",es:"Transverso del tórax",h:5,d:"Inner rib-cage sheet aiding forced exhalation.",de:"Lámina interna que ayuda a espirar.",fr:"Transverse du thorax",df:"Lame interne aidant l'expiration forcée.",m:null},
{id:"mu_serratus",s:"muscular",g:"trunk",r:"thorax",en:"Serratus anterior",la:"Musculus serratus anterior",es:"Serrato anterior",h:5,d:"Side-wall sheet hugging the ribs; protracts the scapula.",de:"Lámina lateral que abraza las costillas y protrae la escápula.",fr:"Serratus antérieur",df:"Plaque latérale enserrant les côtes, protractrice de l'omoplate.",m:"serratus"},
{id:"mu_diaphragm",s:"muscular",g:"trunk",r:"thorax",en:"Thoracic diaphragm",la:"Diaphragma",es:"Diafragma torácico",h:5,d:"Dome-shaped breathing piston under the lungs.",de:"Cúpula respiratoria bajo los pulmones.",fr:"Diaphragme thoracique",df:"Coupole respiratoire sous les poumons.",m:"diaphragm"},
// back & shoulder girdle
{id:"mu_trapezius",s:"muscular",g:"back",r:"back",en:"Trapezius muscle",la:"Musculus trapezius",es:"Músculo trapecio",h:5,d:"Kite-shaped back sheet shrugging and steadying shoulders.",de:"Lámina dorsal que eleva y fija los hombros.",fr:"Trapèze",df:"Nappe dorsale haussant et fixant les épaules.",m:"trapezius"},
{id:"mu_spinalis",s:"muscular",g:"back",r:"back",en:"Spinalis thoracis",la:"Musculus spinalis thoracis",es:"Espinoso torácico",h:5,d:"Medial erector column holding the spine upright.",de:"Columna erecta medial que endereza.",fr:"Épineux du thorax",df:"Colonne érectrice médiale redressant le rachis.",m:null},
{id:"mu_semispinalis",s:"muscular",g:"back",r:"back",en:"Semispinalis muscle",la:"Musculus semispinalis",es:"Semiespinoso",h:5,d:"Deep back rope extending head and spine.",de:"Cuerda profunda que extiende cabeza y columna.",fr:"Semi-épineux",df:"Corde profonde étendant tête et colonne.",m:null},
{id:"mu_levator",s:"muscular",g:"back",r:"back",en:"Levator scapulae",la:"Musculus levator scapulae",es:"Elevador de la escápula",h:5,d:"Neck-to-shoulder strap hiking the blade.",de:"Cinta que eleva la escápula.",fr:"Élévateur de la scapula",df:"Sangle haussant l'omoplate.",m:null},
{id:"mu_teresmajor",s:"muscular",g:"back",r:"upper_limb",en:"Teres major muscle",la:"Musculus teres major",es:"Músculo redondo mayor",h:5,d:"Back-wall muscle pulling the arm down and in.",de:"Músculo dorsal que desciende y aduce el brazo.",fr:"Grand rond",df:"Muscle dorsal abaissant et adduisant le bras.",m:null},
// upper limb
{id:"mu_deltoid",s:"muscular",g:"upper_limb",r:"upper_limb",en:"Deltoid muscle",la:"Musculus deltoideus",es:"Músculo deltoides",h:5,d:"Shoulder cap lifting the arm in every direction.",de:"Caperuza del hombro que eleva el brazo.",fr:"Deltoïde",df:"Coiffe de l'épaule levant le bras.",m:"deltoid_l"},
{id:"mu_biceps",s:"muscular",g:"upper_limb",r:"upper_limb",en:"Biceps brachii",la:"Musculus biceps brachii",es:"Bíceps braquial",h:5,d:"Two-headed flexor of elbow and supinator of forearm.",de:"Flexor del codo y supinador con dos cabezas.",fr:"Biceps brachial",df:"Fléchisseur du coude à deux chefs, supinateur.",m:"biceps_l"},
{id:"mu_triceps",s:"muscular",g:"upper_limb",r:"upper_limb",en:"Triceps brachii",la:"Musculus triceps brachii",es:"Tríceps braquial",h:5,d:"Three-headed extensor straightening the elbow.",de:"Extensor de tres cabezas que estira el codo.",fr:"Triceps brachial",df:"Extenseur à trois chefs tendant le coude.",m:null},
{id:"mu_coracobrachialis",s:"muscular",g:"upper_limb",r:"upper_limb",en:"Coracobrachialis muscle",la:"Musculus coracobrachialis",es:"Músculo coracobraquial",h:5,d:"Small deep flexor from coracoid to mid-humerus.",de:"Pequeño flexor profundo del coracoides al húmero.",fr:"Coraco-brachial",df:"Petit fléchisseur profond du coracoïde à l'humérus.",m:null},
{id:"mu_brachialfascia",s:"muscular",g:"upper_limb",r:"upper_limb",en:"Brachial fascia",la:"Fascia brachii",es:"Fascia braquial",h:3,d:"Sleeve of deep fascia compartmenting the arm.",de:"Manga fascial que compartimenta el brazo.",fr:"Fascia brachial",df:"Manchon aponévrotique compartimentant le bras.",m:null},
{id:"mu_extretinaculum",s:"muscular",g:"upper_limb",r:"upper_limb",en:"Extensor retinaculum",la:"Retinaculum musculorum extensorum",es:"Retináculo extensor",h:3,d:"Wrist bracelet pulleying the extensor tendons.",de:"Pulsera fibrosa que guía extensores.",fr:"Rétinaculum des extenseurs",df:"Bracelet fibreux guidant les extenseurs au poignet.",m:null},
{id:"mu_fcr_sheath",s:"muscular",g:"upper_limb",r:"upper_limb",en:"Flexor carpi radialis sheath",la:"Vagina tendinis musculi flexoris carpi radialis",es:"Vaina del flexor radial del carpo",h:3,d:"Synovial tunnel for the radial wrist flexor.",de:"Túnel sinovial del flexor radial.",fr:"Gaine du fléchisseur radial du carpe",df:"Tunnel synovial du fléchisseur radial.",m:null},
// lower limb & hip
{id:"mu_gluteusmax",s:"muscular",g:"lower_limb",r:"pelvis",en:"Gluteus maximus",la:"Musculus gluteus maximus",es:"Glúteo mayor",h:5,d:"Largest muscle; stair-climbing hip extensor.",de:"El mayor; extiende la cadera al subir.",fr:"Grand fessier",df:"Le plus grand ; étend la hanche dans l'escalier.",m:"gluteus"},
{id:"mu_quadriceps",s:"muscular",g:"lower_limb",r:"lower_limb",en:"Quadriceps femoris",la:"Musculus quadriceps femoris",es:"Cuádriceps femoral",h:5,d:"Four-headed knee extensor via the patella.",de:"Extensor de rodilla de cuatro cabezas.",fr:"Quadriceps fémoral",df:"Extenseur du genou à quatre chefs.",m:"quads_l"},
{id:"mu_hamstrings",s:"muscular",g:"lower_limb",r:"lower_limb",en:"Hamstrings",la:"Musculi ischiocrurales",es:"Isquiotibiales",h:5,d:"Rear-thigh trio bending the knee.",de:"Trío posterior que flexiona la rodilla.",fr:"Ischio-jambiers",df:"Trio postérieur fléchissant le genou.",m:null},
{id:"mu_sartorius",s:"muscular",g:"lower_limb",r:"lower_limb",en:"Sartorius muscle",la:"Musculus sartorius",es:"Músculo sartorio",h:5,d:"Longest muscle: crosses the thigh to sit cross-legged.",de:"El músculo más largo; cruza el muslo para cruzar las piernas.",fr:"Sartorius",df:"Le plus long muscle ; traverse la cuisse.",m:"sartorius"},
{id:"mu_gracilis",s:"muscular",g:"lower_limb",r:"lower_limb",en:"Gracilis muscle",la:"Musculus gracilis",es:"Músculo grácil",h:5,d:"Slender inner-thigh muscle adducting the leg.",de:"Delgado aductor medial del muslo.",fr:"Gracile",df:"Fin adducteur médial de la cuisse.",m:"gracilis"},
{id:"mu_iliotibial",s:"muscular",g:"lower_limb",r:"lower_limb",en:"Iliotibial tract",la:"Tractus iliotibialis",es:"Cintilla iliotibial",h:3,d:"Lateral thigh band stabilizing the knee.",de:"Banda lateral que estabiliza la rodilla.",fr:"Bandelette ilio-tibiale",df:"Bande latérale stabilisant le genou.",m:null},
{id:"mu_fascialata",s:"muscular",g:"lower_limb",r:"lower_limb",en:"Fascia lata",la:"Fascia lata",es:"Fascia lata",h:3,d:"Deep stocking wrapping the whole thigh.",de:"Media profunda que envuelve el muslo.",fr:"Fascia lata",df:"Bas profond enveloppant la cuisse.",m:null},
{id:"mu_quadratusfem",s:"muscular",g:"lower_limb",r:"pelvis",en:"Quadratus femoris",la:"Musculus quadratus femoris",es:"Cuadrado femoral",h:5,d:"Square deep rotator of the hip.",de:"Rotador profundo cuadrado de la cadera.",fr:"Carré fémoral",df:"Rotateur profond carré de la hanche.",m:null},
{id:"mu_psoas",s:"muscular",g:"lower_limb",r:"abdomen",en:"Psoas major",la:"Musculus psoas major",es:"Psoas mayor",h:5,d:"Deep hip flexor linking spine to thigh.",de:"Flexor profundo que une columna y muslo.",fr:"Grand psoas",df:"Fléchisseur profond reliant colonne et cuisse.",m:"psoas"},
{id:"mu_iliacus",s:"muscular",g:"lower_limb",r:"pelvis",en:"Iliacus muscle",la:"Musculus iliacus",es:"Músculo ilíaco",h:5,d:"Filling of the hip socket flexing the thigh.",de:"Relleno de la fosa ilíaca que flexiona el muslo.",fr:"Iliaque",df:"Remplissage de la fosse iliaque fléchissant la cuisse.",m:"iliacus"},
{id:"mu_piriformis",s:"muscular",g:"lower_limb",r:"pelvis",en:"Piriformis muscle",la:"Musculus piriformis",es:"Músculo piriforme",h:5,d:"Deep lateral rotator of the hip.",de:"Rotador lateral profundo de la cadera.",fr:"Piriforme",df:"Rotateur latéral profond de la hanche.",m:"piriformis"},
{id:"mu_gastrocnemius",s:"muscular",g:"lower_limb",r:"lower_limb",en:"Gastrocnemius",la:"Musculus gastrocnemius",es:"Gastrocnemio",h:5,d:"Two-bellied calf spring for walking and jumping.",de:"Gemelos que impulsan marcha y salto.",fr:"Gastrocnémien",df:"Jumeaux impulsant marche et saut.",m:"calf_l"},
{id:"mu_soleus",s:"muscular",g:"lower_limb",r:"lower_limb",en:"Soleus muscle",la:"Musculus soleus",es:"Sóleo",h:5,d:"Flat calf muscle pushing blood back up the leg.",de:"Sóleo que impulsa la sangre de vuelta hacia arriba.",fr:"Soléaire",df:"Muscle plat du mollet propulsant le sang vers le haut.",m:"soleus"},
// pelvic floor
{id:"mu_sphincterani",s:"muscular",g:"pelvic_floor",r:"pelvis",en:"External anal sphincter",la:"Musculus sphincter ani externus",es:"Esfínter anal externo",h:15,d:"Voluntary ring guarding the anal canal.",de:"Anillo voluntario del canal anal.",fr:"Sphincter anal externe",df:"Anneau volontaire du canal anal.",m:null},
{id:"mu_transvperinei",s:"muscular",g:"pelvic_floor",r:"pelvis",en:"Superficial transverse perineal",la:"Musculus transversus perinei superficialis",es:"Transverso superficial del periné",h:5,d:"Pelvic-floor sling steadying the perineum.",de:"Cabestrillo del suelo pélvico.",fr:"Transverse superficiel du périnée",df:"Hamac du plancher pelvien.",m:null},

// ── CARDIOVASCULAR (38) ──
// heart & valves
{id:"cv_heart",s:"cardiovascular",g:"heart",r:"thorax",en:"Heart",la:"Cor",es:"Corazón",h:4,d:"Fist-sized double pump driving pulmonary and systemic circuits.",de:"Bomba doble que impulsa ambos circuitos.",fr:"Cœur",df:"Double pompe de la taille du poing.",m:"heart"},
{id:"cv_ascendaorta",s:"cardiovascular",g:"heart",r:"thorax",en:"Ascending aorta",la:"Aorta ascendens",es:"Aorta ascendente",h:4,d:"First great trunk leaving the left ventricle.",de:"Primer gran tronco del ventrículo izquierdo.",fr:"Aorte ascendante",df:"Premier grand tronc du ventricule gauche.",m:"aorta"},
{id:"cv_aorticarch",s:"cardiovascular",g:"heart",r:"thorax",en:"Aortic arch",la:"Arcus aortae",es:"Arco aórtico",h:4,d:"Candy-cane bend feeding head, arms and descending aorta.",de:"Curva que alimenta cabeza, brazos y aorta descendente.",fr:"Crosse de l'aorte",df:"Courbe nourrissant tête, bras et aorte descendante.",m:"aorta"},
{id:"cv_aortic_valve",s:"cardiovascular",g:"heart",r:"thorax",en:"Aortic valve",la:"Valva aortae",es:"Válvula aórtica",h:4,d:"Three-cusp exit gate of the left ventricle.",de:"Compuerta de salida del ventrículo izquierdo.",fr:"Valve aortique",df:"Valve de sortie du ventricule gauche.",m:"aortic_valve"},
{id:"cv_mitral",s:"cardiovascular",g:"heart",r:"thorax",en:"Mitral valve",la:"Valva mitralis",es:"Válvula mitral",h:4,d:"Two-flap gate between left atrium and ventricle.",de:"Válvula bífida entre aurícula y ventrículo izquierdos.",fr:"Valve mitrale",df:"Clapet bi-feuillet entre oreillette et ventricule gauches.",m:"mitral"},
{id:"cv_tricuspid",s:"cardiovascular",g:"heart",r:"thorax",en:"Tricuspid valve",la:"Valva atrioventricularis dextra",es:"Válvula tricúspide",h:4,d:"Three-flap gate from right atrium to ventricle.",de:"Compuerta triple de aurícula a ventrículo derecho.",fr:"Valve tricuspide",df:"Clapet triple de l'oreillette au ventricule droit.",m:null},
{id:"cv_coronary_l",s:"cardiovascular",g:"heart",r:"thorax",en:"Left coronary conus branch",la:"Ramus coni arteriosi arteriae coronariae sinistrae",es:"Rama del cono de la coronaria izquierda",h:4,d:"Tiny feeder of the pulmonary outflow tract.",de:"Pequeña rama del tracto de salida pulmonar.",fr:"Branche du cône coronaire gauche",df:"Petite branche de la chambre de chasse pulmonaire.",m:null},
{id:"cv_coronary_r",s:"cardiovascular",g:"heart",r:"thorax",en:"Right coronary artery",la:"Arteria coronaria dextra",es:"Coronaria derecha",h:4,d:"Feeds the right heart muscle and often the conduction node.",de:"Irriga el corazón derecho y el nodo en muchos casos.",fr:"Artère coronaire droite",df:"Irrigue le muscle du cœur droit.",m:"coronary_r"},
// arteries
{id:"cv_carotid",s:"cardiovascular",g:"arteries",r:"head_neck",en:"Common carotid artery",la:"Arteria carotis communis",es:"Arteria carótida común",h:4,d:"Neck highway to brain and face.",de:"Autopista cervical hacia cerebro y cara.",fr:"Artère carotide commune",df:"Autoroute du cou vers cerveau et visage.",m:"carotid_l"},
{id:"cv_carotid_int",s:"cardiovascular",g:"arteries",r:"head_neck",en:"Internal carotid artery",la:"Arteria carotis interna",es:"Arteria carótida interna",h:4,d:"Brain-bound branch of the carotid in the neck.",de:"Rama cerebral de la carótida cervical.",fr:"Artère carotide interne",df:"Branche cérébrale de la carotide.",m:"carotid_int"},
{id:"cv_vertebral_a",s:"cardiovascular",g:"arteries",r:"head_neck",en:"Vertebral artery",la:"Arteria vertebralis",es:"Arteria vertebral",h:4,d:"Paired neck arteries merging at the brain's base.",de:"Arterias que se unen en la base cerebral.",fr:"Artère vertébrale",df:"Artères se rejoignant à la base du cerveau.",m:"vertebral_a"},
{id:"cv_thyrocervical",s:"cardiovascular",g:"arteries",r:"head_neck",en:"Thyrocervical trunk",la:"Truncus thyrocervicalis",es:"Tronco tirocervical",h:4,d:"Short trunk above the collarbone feeding neck organs.",de:"Tronco cervical que alimenta cuello y glándulas.",fr:"Tronc thyro-cervical",df:"Tronc cervical nourrissant cou et glandes.",m:"thyrocervical"},
{id:"cv_infalv_a",s:"cardiovascular",g:"arteries",r:"head_neck",en:"Inferior alveolar artery",la:"Arteria alveolaris inferior",es:"Arteria alveolar inferior",h:4,d:"Feeder of lower teeth via the mandibular canal.",de:"Irriga dientes inferiores.",fr:"Artère alvéolaire inférieure",df:"Irrigue les dents inférieures.",m:null},
{id:"cv_midmening_par",s:"cardiovascular",g:"arteries",r:"head_neck",en:"Parietal branch of middle meningeal",la:"Ramus parietalis arteriae meningeae mediae",es:"Rama parietal meníngea media",h:4,d:"Dural feeder notorious in epidural bleeds.",de:"Rama dural de los hematomas epidurales.",fr:"Branche pariétale méningée moyenne",df:"Branche durale des hématomes extra-duraux.",m:null},
{id:"cv_postmening",s:"cardiovascular",g:"arteries",r:"head_neck",en:"Posterior meningeal artery",la:"Arteria meningea posterior",es:"Arteria meníngea posterior",h:4,d:"Dural feeder of the posterior fossa.",de:"Irriga la duramadre posterior.",fr:"Artère méningée postérieure",df:"Irrigue la dure-mère postérieure.",m:null},
{id:"cv_pericallosal",s:"cardiovascular",g:"arteries",r:"head_neck",en:"Pericallosal artery",la:"Arteria pericallosa",es:"Arteria pericallosa",h:4,d:"Callosal companion of the anterior cerebral.",de:"Acompaña al cuerpo calloso.",fr:"Artère péricalleuse",df:"Accompagne le corps calleux.",m:null},
{id:"cv_angular_a",s:"cardiovascular",g:"arteries",r:"head_neck",en:"Angular artery",la:"Arteria angularis",es:"Arteria angular",h:4,d:"Facial artery end-branch at the inner eye.",de:"Rama terminal facial junto al ojo.",fr:"Artère angulaire",df:"Terminaison faciale près de l'œil.",m:null},
{id:"cv_subclavian",s:"cardiovascular",g:"arteries",r:"thorax",en:"Subclavian vessels",la:"Vasa subclavia",es:"Vasos subclavios",h:4,d:"Artery-vein pair under the collarbone to the arm.",de:"Par bajo la clavícula hacia el brazo.",fr:"Vaisseaux sous-claviers",df:"Paire sous la clavicule vers le bras.",m:null},
{id:"cv_axillary",s:"cardiovascular",g:"arteries",r:"upper_limb",en:"Axillary artery",la:"Arteria axillaris",es:"Arteria axilar",h:4,d:"Artery of the armpit continuing the subclavian.",de:"Arteria de la axila, continuación subclavia.",fr:"Artère axillaire",df:"Artère de l'aisselle, suite de la sous-clavière.",m:"axillary"},
{id:"cv_brachial_a",s:"cardiovascular",g:"arteries",r:"upper_limb",en:"Brachial artery",la:"Arteria brachialis",es:"Arteria braquial",h:4,d:"Arm trunk whose pulse is felt at the elbow.",de:"Tronco braquial palpable en el codo.",fr:"Artère brachiale",df:"Tronc du bras palpable au coude.",m:null},
{id:"cv_radial_a",s:"cardiovascular",g:"arteries",r:"upper_limb",en:"Radial artery",la:"Arteria radialis",es:"Arteria radial",h:4,d:"Lateral forearm artery; the classic pulse point.",de:"Arteria radial; pulso clásico en la muñeca.",fr:"Artère radiale",df:"Artère radiale ; pouls au poignet.",m:"radial_a"},
{id:"cv_ulnar_a",s:"cardiovascular",g:"arteries",r:"upper_limb",en:"Ulnar artery",la:"Arteria ulnaris",es:"Arteria cubital",h:4,d:"Medial forearm artery of the palmar arch.",de:"Arteria cubital del arco palmar.",fr:"Artère ulnaire",df:"Artère ulnaire de l'arcade palmaire.",m:"ulnar_a"},
{id:"cv_femoral_a",s:"cardiovascular",g:"arteries",r:"lower_limb",en:"Femoral artery",la:"Arteria femoralis",es:"Arteria femoral",h:4,d:"Thigh trunk felt in the groin.",de:"Tronco del muslo palpable en la ingle.",fr:"Artère fémorale",df:"Tronc de la cuisse palpable à l'aine.",m:null},
{id:"cv_popliteal",s:"cardiovascular",g:"arteries",r:"lower_limb",en:"Popliteal artery",la:"Arteria poplitea",es:"Arteria poplítea",h:4,d:"Deep knee-pit artery continuing the femoral.",de:"Continuación de la femoral tras la rodilla.",fr:"Artère poplitée",df:"Poursuite de la fémorale derrière le genou.",m:"popliteal"},
{id:"cv_tibial_a",s:"cardiovascular",g:"arteries",r:"lower_limb",en:"Tibial arteries",la:"Arteriae tibiales",es:"Arterias tibiales",h:4,d:"Leg arteries running behind the deep fascia.",de:"Arterias de la pierna tras la fascia profunda.",fr:"Artères tibiales",df:"Artères de la jambe derrière la fascia.",m:"tibial_a"},
{id:"cv_iliac",s:"cardiovascular",g:"arteries",r:"pelvis",en:"Common iliac vessels",la:"Vasa iliaca communia",es:"Ilíacas comunes",h:4,d:"Pelvic split of the aorta feeding legs and pelvis.",de:"Bifurcación pélvica de la aorta.",fr:"Iliaques communes",df:"Bifurcation pelvienne de l'aorte.",m:"iliac"},
{id:"cv_renal_a",s:"cardiovascular",g:"arteries",r:"abdomen",en:"Renal artery",la:"Arteria renalis",es:"Arteria renal",h:4,d:"High-pressure kidney filter feeders.",de:"Arterias de alta presión del riñón.",fr:"Artère rénale",df:"Artères à haute pression du rein.",m:"renal_a"},
// veins
{id:"cv_jugular",s:"cardiovascular",g:"veins",r:"head_neck",en:"Internal jugular vein",la:"Vena jugularis interna",es:"Vena yugular interna",h:6,d:"Main cerebral drain down the neck.",de:"Drenaje cerebral principal del cuello.",fr:"Veine jugulaire interne",df:"Drain cérébral principal du cou.",m:null},
{id:"cv_vorticose",s:"cardiovascular",g:"veins",r:"head_neck",en:"Vorticose veins",la:"Venae vorticosae",es:"Venas vorticosas",h:6,d:"Whirlpool drains of the eye's choroid.",de:"Drenajes de la coroides ocular.",fr:"Veines vortiqueuses",df:"Drains du choroïde de l'œil.",m:null},
{id:"cv_thoracicint_v",s:"cardiovascular",g:"veins",r:"thorax",en:"Internal thoracic veins",la:"Venae thoracicae internae",es:"Venas torácicas internas",h:6,d:"Paired drains of the chest wall to the brachiocephalic.",de:"Drenan la pared torácica.",fr:"Veines thoraciques internes",df:"Drains de la paroi thoracique.",m:null},
{id:"cv_thoracoacromial_v",s:"cardiovascular",g:"veins",r:"upper_limb",en:"Thoracoacromial vein",la:"Vena thoracoacromialis",es:"Vena toracoacromial",h:6,d:"Small shoulder drain joining the cephalic system.",de:"Pequeño drenaje del hombro.",fr:"Veine thoraco-acromiale",df:"Petit drain de l'épaule.",m:null},
{id:"cv_ivc",s:"cardiovascular",g:"veins",r:"abdomen",en:"Inferior vena cava",la:"Vena cava inferior",es:"Vena cava inferior",h:6,d:"Great abdominal vein returning blood to the right atrium.",de:"Gran vena abdominal a la aurícula derecha.",fr:"Veine cave inférieure",df:"Grande veine abdominale vers l'oreillette droite.",m:"venacava"},
{id:"cv_azygos",s:"cardiovascular",g:"veins",r:"thorax",en:"Azygos vein",la:"Vena azygos",es:"Vena ácigos",h:6,d:"Right-sided chest drain rising beside the spine.",de:"Drenaje torácico derecho junto a la columna.",fr:"Veine azygos",df:"Drain thoracique droit le long de la colonne.",m:"azygos"},
{id:"cv_portal",s:"cardiovascular",g:"veins",r:"abdomen",en:"Portal vein",la:"Vena portae hepatis",es:"Vena porta",h:6,d:"Vein carrying nutrient-rich blood to the liver.",de:"Vena porta que lleva sangre nutrida al hígado.",fr:"Veine porte",df:"Veine amenant le sang riche au foie.",m:"portal"},
{id:"cv_splenic_av",s:"cardiovascular",g:"veins",r:"abdomen",en:"Splenic vessels",la:"Vasa splenica",es:"Vasos esplénicos",h:6,d:"Vessel pair linking spleen and stomach to the portal.",de:"Vasos del bazo y estómago hacia la porta.",fr:"Vaisseaux spléniques",df:"Vaisseaux de la rate et de l'estomac vers la porte.",m:"splenic_av"},
{id:"cv_cephalic",s:"cardiovascular",g:"veins",r:"upper_limb",en:"Cephalic vein",la:"Vena cephalica",es:"Vena cefálica",h:6,d:"Superficial arm vein running up to the shoulder.",de:"Vena superficial del brazo hacia el hombro.",fr:"Veine céphalique",df:"Veine superficielle du bras vers l'épaule.",m:"cephalic"},
{id:"cv_basilic",s:"cardiovascular",g:"veins",r:"upper_limb",en:"Basilic vein",la:"Vena basilica",es:"Vena basílica",h:6,d:"Inner-arm superficial vein.",de:"Vena superficial del brazo interno.",fr:"Veine basilique",df:"Veine superficielle du bras interne.",m:"basilic"},
{id:"cv_saphenous",s:"cardiovascular",g:"veins",r:"lower_limb",en:"Great saphenous vein",la:"Vena saphena magna",es:"Vena safena mayor",h:6,d:"Longest superficial vein up the inner leg.",de:"La vena superficial más larga.",fr:"Grande saphène",df:"La plus longue veine superficielle.",m:null},

// ── NERVOUS (29) ──
// brain & deep structures
{id:"nv_brain",s:"nervous",g:"brain",r:"head_neck",en:"Brain",la:"Encephalon",es:"Encéfalo",h:9,d:"Command organ of thought, movement and sensation.",de:"Órgano de pensamiento, movimiento y sensación.",fr:"Encéphale",df:"Organe de la pensée, du mouvement et des sens.",m:"brain"},
{id:"nv_frontal_lobe",s:"nervous",g:"brain",r:"head_neck",en:"Frontal lobe",la:"Lobus frontalis",es:"Lóbulo frontal",h:9,d:"Planning, speech and voluntary movement center.",de:"Planificación, habla y movimiento voluntario.",fr:"Lobe frontal",df:"Planification, parole et motricité volontaire.",m:"brain"},
{id:"nv_parietal_lobe",s:"nervous",g:"brain",r:"head_neck",en:"Parietal lobe",la:"Lobus parietalis",es:"Lóbulo parietal",h:9,d:"Body-sense and spatial integration cortex.",de:"Corteza corporal y espacial.",fr:"Lobe pariétal",df:"Cortex corporel et spatial.",m:"brain"},
{id:"nv_temporal_lobe",s:"nervous",g:"brain",r:"head_neck",en:"Temporal lobe",la:"Lobus temporalis",es:"Lóbulo temporal",h:9,d:"Hearing, memory and language cortex.",de:"Corteza de audición, memoria y lenguaje.",fr:"Lobe temporal",df:"Cortex de l'ouïe, de la mémoire et du langage.",m:"temporal_lobe"},
{id:"nv_occipital_lobe",s:"nervous",g:"brain",r:"head_neck",en:"Occipital lobe",la:"Lobus occipitalis",es:"Lóbulo occipital",h:9,d:"Vision cortex at the back of the brain.",de:"Corteza visual en la parte posterior.",fr:"Lobe occipital",df:"Cortex visuel à l'arrière du cerveau.",m:"occipital_lobe"},
{id:"nv_whitematter",s:"nervous",g:"brain",r:"head_neck",en:"White matter",la:"Substantia alba",es:"Sustancia blanca",h:8,d:"Myelinated highways linking brain regions.",de:"Autopistas mielínicas del cerebro.",fr:"Substance blanche",df:"Autoroutes myélinisées du cerveau.",m:null},
{id:"nv_corpus_callosum",s:"nervous",g:"brain",r:"head_neck",en:"Corpus callosum",la:"Corpus callosum",es:"Cuerpo calloso",h:8,d:"Great fiber bridge between the hemispheres.",de:"Gran puente de fibras entre hemisferios.",fr:"Corps calleux",df:"Grand pont entre les hémisphères.",m:"corpus_callosum"},
{id:"nv_thalamus",s:"nervous",g:"brain",r:"head_neck",en:"Thalamus",la:"Thalamus",es:"Tálamo",h:9,d:"Sensory relay station of the brain.",de:"Relé sensorial central del cerebro.",fr:"Thalamus",df:"Relais sensoriel central.",m:"thalamus"},
{id:"nv_hippocampus",s:"nervous",g:"brain",r:"head_neck",en:"Hippocampus",la:"Hippocampus",es:"Hipocampo",h:9,d:"Seahorn builder of new memories.",de:"Marino que forma recuerdos nuevos.",fr:"Hippocampe",df:"Croissant de mer formant les souvenirs.",m:"hippocampus"},
{id:"nv_amygdala",s:"nervous",g:"brain",r:"head_neck",en:"Amygdala",la:"Corpus amygdaloideum",es:"Amígdala",h:9,d:"Fear and emotion almond of the temporal lobe.",de:"Almendra del miedo y la emoción en el lóbulo temporal.",fr:"Amygdale",df:"Amandule de la peur et des émotions.",m:"amygdala"},
{id:"nv_limbic",s:"nervous",g:"brain",r:"head_neck",en:"Limbic lobe",la:"Lobus limbicus",es:"Lóbulo límbico",h:9,d:"Emotion ring wrapping the brainstem.",de:"Anillo emocional alrededor del tronco.",fr:"Lobe limbique",df:"Anneau émotionnel autour du tronc cérébral.",m:"limbic"},
{id:"nv_pons",s:"nervous",g:"brain",r:"head_neck",en:"Pons",la:"Pons",es:"Protuberancia",h:9,d:"Bridge relaying cortex to cerebellum.",de:"Puente entre corteza y cerebelo.",fr:"Pont",df:"Pont entre cortex et cervelet.",m:null},
{id:"nv_cerebellum",s:"nervous",g:"brain",r:"head_neck",en:"Cerebellum",la:"Cerebellum",es:"Cerebelo",h:9,d:"Balance and coordination mini-brain.",de:"Mini-cerebro del equilibrio.",fr:"Cervelet",df:"Mini-cerveau de l'équilibre.",m:null},
{id:"nv_habenular",s:"nervous",g:"brain",r:"head_neck",en:"Habenular trigone",la:"Trigonum habenulare",es:"Trígono habenular",h:9,d:"Tiny mood-and-reward relay above the midbrain.",de:"Relé del ánimo sobre el mesencéfalo.",fr:"Trigone habénulaire",df:"Relais de l'humeur sur le mésencéphale.",m:null},
// spinal cord
{id:"nv_spinalcord",s:"nervous",g:"spinal_cord",r:"whole_body",en:"Spinal cord",la:"Medulla spinalis",es:"Médula espinal",h:7,d:"Information cable from brainstem to body.",de:"Cable entre tronco y cuerpo.",fr:"Moelle épinière",df:"Câble entre tronc cérébral et corps.",m:"spinalcord"},
// nerves & plexuses
{id:"nv_optic",s:"nervous",g:"nerves",r:"head_neck",en:"Optic nerve [II]",la:"Nervus opticus [II]",es:"Nervio óptico [II]",h:7,d:"Second cranial nerve carrying sight to the brain.",de:"Segundo par craneal que lleva la vista al cerebro.",fr:"Nerf optique [II]",df:"Deuxième paire crânienne de la vue.",m:"optic"},
{id:"nv_ciliary",s:"nervous",g:"nerves",r:"head_neck",en:"Ciliary ganglion",la:"Ganglion ciliare",es:"Ganglio ciliar",h:7,d:"Eye ganglion focusing the lens.",de:"Ganglio ocular que enfoque el cristalino.",fr:"Ganglion ciliaire",df:"Ganglion de l'œil réglant l'accommodation.",m:"ciliary"},
{id:"nv_ciliary_symp",s:"nervous",g:"nerves",r:"head_neck",en:"Sympathetic root of ciliary ganglion",la:"Radix sympathica ganglii ciliaris",es:"Raíz simpática del ganglio ciliar",h:7,d:"Tiny sympathetic root into the eye's focus ganglion.",de:"Raíz simpática del enfoque ocular.",fr:"Racine sympathique ciliaire",df:"Racine sympathique de l'accommodation.",m:null},
{id:"nv_vagus",s:"nervous",g:"nerves",r:"head_neck",en:"Vagus nerve [X]",la:"Nervus vagus [X]",es:"Nervio vago [X]",h:7,d:"Wandering parasympathetic line to heart, lungs and gut.",de:"Vía parasimpática a corazón, pulmón e intestino.",fr:"Nerf vague [X]",df:"Voie parasympathique vers cœur, poumon et intestin.",m:null},
{id:"nv_bronchial_vagus",s:"nervous",g:"nerves",r:"thorax",en:"Bronchial branches of vagus",la:"Rami bronchiales nervi vagi",es:"Ramos bronquiales del vago",h:7,d:"Vagal twigs tuning airway caliber.",de:"Ramas que regulan el calibre bronquial.",fr:"Rameaux bronchiques du vague",df:"Rameaux réglant le calibre bronchique.",m:null},
{id:"nv_accessory",s:"nervous",g:"nerves",r:"head_neck",en:"Accessory nerve [XI]",la:"Nervus accessorius [XI]",es:"Nervio accesorio [XI]",h:7,d:"Motor line to trapezius and sternocleidomastoid.",de:"Motor del trapecio y esternocleidomastoideo.",fr:"Nerf accessoire [XI]",df:"Moteur du trapèze et du sterno-cléido-mastoïdien.",m:null},
{id:"nv_laryngeal_rec",s:"nervous",g:"nerves",r:"head_neck",en:"Recurrent laryngeal nerve",la:"Nervus laryngeus recurrens",es:"Nervio laríngeo recurrente",h:7,d:"Looped voice-box nerve vulnerable in neck surgery.",de:"Nervio de la voz en asa quirúrgica.",fr:"Nerf laryngé récurrent",df:"Nerf de la voix en anse chirurgicale.",m:null},
{id:"nv_maxillary_n",s:"nervous",g:"nerves",r:"head_neck",en:"Maxillary nerve [V2]",la:"Nervus maxillaris [V2]",es:"Nervio maxilar [V2]",h:7,d:"Midface sensory branch of the trigeminal.",de:"Rama sensitiva del trigémino.",fr:"Nerf maxillaire [V2]",df:"Branche sensitive du trijumeau.",m:null},
{id:"nv_brachialplex",s:"nervous",g:"nerves",r:"upper_limb",en:"Brachial plexus",la:"Plexus brachialis",es:"Plexo braquial",h:7,d:"Root tangle in the neck feeding the whole arm.",de:"Entramado cervical para todo el brazo.",fr:"Plexus brachial",df:"Réseau cervical pour tout le bras.",m:null},
{id:"nv_median",s:"nervous",g:"nerves",r:"upper_limb",en:"Median nerve",la:"Nervus medianus",es:"Nervio mediano",h:7,d:"Hand-grip nerve of carpal-tunnel fame.",de:"Nervio de la pinza, del túnel carpiano.",fr:"Nerf médian",df:"Nerf de la pince, du canal carpien.",m:null},
{id:"nv_ulnar",s:"nervous",g:"nerves",r:"upper_limb",en:"Ulnar nerve",la:"Nervus ulnaris",es:"Nervio cubital",h:7,d:"Funny-bone nerve into ring and little fingers.",de:"Nervio del codo a anular y meñique.",fr:"Nerf ulnaire",df:"Nerf du coude vers annulaire et auriculaire.",m:null},
{id:"nv_radial_n",s:"nervous",g:"nerves",r:"upper_limb",en:"Radial nerve",la:"Nervus radialis",es:"Nervio radial",h:7,d:"Spiral-groove nerve extending wrist and fingers.",de:"Nervio que extiende muñeca y dedos.",fr:"Nerf radial",df:"Nerf étendant poignet et doigts.",m:null},
{id:"nv_sciatic",s:"nervous",g:"nerves",r:"lower_limb",en:"Sciatic nerve",la:"Nervus ischiadicus",es:"Nervio ciático",h:7,d:"Thickest nerve down the back of the leg.",de:"El nervio más grueso, tras la pierna.",fr:"Nerf sciatique",df:"Le plus gros nerf, à l'arrière de la jambe.",m:"sciatic_l"},
{id:"nv_femoral_n",s:"nervous",g:"nerves",r:"lower_limb",en:"Femoral nerve",la:"Nervus femoralis",es:"Nervio femoral",h:7,d:"Front-thigh motor and knee-jerk line.",de:"Motor anterior y reflejo rotuliano.",fr:"Nerf fémoral",df:"Moteur antérieur et réflexe rotulien.",m:null},

// ── RESPIRATORY (13) ──
// airway
{id:"re_nasal",s:"respiratory",g:"airway",r:"head_neck",en:"Nasal cavity",la:"Cavitas nasi",es:"Cavidad nasal",h:10,d:"Warming, filtering entrance of the airway.",de:"Entrada que calienta y filtra.",fr:"Fosses nasales",df:"Entrée qui réchauffe et filtre.",m:null},
{id:"re_pharynx",s:"respiratory",g:"airway",r:"head_neck",en:"Pharynx",la:"Pharynx",es:"Faringe",h:14,d:"Throat crossroads of air and food.",de:"Cruce de aire y alimento.",fr:"Pharynx",df:"Carrefour de l'air et des aliments.",m:null},
{id:"re_larynx",s:"respiratory",g:"airway",r:"head_neck",en:"Larynx",la:"Larynx",es:"Laringe",h:10,d:"Voice box guarding the airway.",de:"Caja de la voz que guarda la vía.",fr:"Larynx",df:"Boîte vocale gardant les voies aériennes.",m:null},
{id:"re_larynx_cart",s:"respiratory",g:"airway",r:"head_neck",en:"Laryngeal cartilages",la:"Cartilagines laryngis",es:"Cartílagos laríngeos",h:10,d:"Cartilage framework of the voice box.",de:"Andamiaje cartilaginoso de la laringe.",fr:"Cartilages du larynx",df:"Charpente cartilagineuse du larynx.",m:"larynx_cart"},
{id:"re_epiglottis",s:"respiratory",g:"airway",r:"head_neck",en:"Epiglottis",la:"Epiglottis",es:"Epiglotis",h:10,d:"Leaf-flap sealing food from the airway.",de:"Solapa que tapa la vía aérea al tragar.",fr:"Épiglotte",df:"Languette fermant les voies aériennes.",m:"epiglottis"},
{id:"re_cricoid",s:"respiratory",g:"airway",r:"head_neck",en:"Cricoid cartilage",la:"Cartilago cricoidea",es:"Cartílago cricoides",h:10,d:"Only complete ring of the larynx.",de:"El único anillo completo de la laringe.",fr:"Cartilage cricoïde",df:"Seul anneau complet du larynx.",m:"cricoid"},
{id:"re_trachea",s:"respiratory",g:"airway",r:"thorax",en:"Trachea",la:"Trachea",es:"Tráquea",h:10,d:"Windpipe of C-shaped cartilage rings.",de:"Tubo de anillos cartilaginosos.",fr:"Trachée",df:"Tube d'anneaux cartilagineux.",m:"trachea"},
{id:"re_carina",s:"respiratory",g:"airway",r:"thorax",en:"Carina of trachea",la:"Carina tracheae",es:"Carina traqueal",h:10,d:"Keel where the windpipe forks.",de:"Quilla de la bifurcación.",fr:"Carina",df:"Quille de la bifurcation trachéale.",m:null},
{id:"re_bronchi",s:"respiratory",g:"airway",r:"thorax",en:"Main bronchi",la:"Bronchi principales",es:"Bronquios principales",h:10,d:"First airway split to each lung.",de:"Primera división hacia cada pulmón.",fr:"Bronches souches",df:"Première division vers chaque poumon.",m:null},
// lungs & lining
{id:"re_lungs",s:"respiratory",g:"lungs",r:"thorax",en:"Lungs",la:"Pulmones",es:"Pulmones",h:11,d:"Spongy gas-exchange pair; right has three lobes.",de:"Par esponjoso; el derecho tiene tres lóbulos.",fr:"Poumons",df:"Paire spongieuse ; le droit a trois lobes.",m:"lungs"},
{id:"re_alveoli",s:"respiratory",g:"lungs",r:"thorax",en:"Pulmonary alveoli",la:"Alveoli pulmonares",es:"Alvéolos pulmonares",h:11,d:"Microscopic air sacs where oxygen enters blood.",de:"Sacos donde el oxígeno pasa a la sangre.",fr:"Alvéoles pulmonaires",df:"Sacs où l'oxygène passe dans le sang.",m:null},
{id:"re_pleura",s:"respiratory",g:"lungs",r:"thorax",en:"Pleura",la:"Pleura",es:"Pleura",h:3,d:"Slippery double wrap letting lungs glide.",de:"Doble envoltura deslizante.",fr:"Plèvre",df:"Double enveloppe glissante.",m:null},
// breathing muscles
{id:"re_intercostals",s:"respiratory",g:"breathing_muscles",r:"thorax",en:"Intercostal muscles",la:"Musculi intercostales",es:"Intercostales",h:5,d:"Rib muscles lifting the cage each breath.",de:"Elevan las costillas al respirar.",fr:"Intercostaux",df:"Soulèvent les côtes à chaque souffle.",m:null},

// ── DIGESTIVE (14) ──
// mouth & salivary
{id:"dg_teeth_sup",s:"digestive",g:"mouth",r:"head_neck",en:"Upper teeth",la:"Dentes superiores",es:"Dientes superiores",h:1,d:"Maxillary arcade anchored in sockets.",de:"Arcada superior en sus alvéolos.",fr:"Dents supérieures",df:"Arcade supérieure dans ses alvéoles.",m:"maxilla"},
{id:"dg_teeth_inf",s:"digestive",g:"mouth",r:"head_neck",en:"Lower teeth",la:"Dentes inferiores",es:"Dientes inferiores",h:1,d:"Mandibular arcade cutting and grinding food.",de:"Arcada inferior que corta y muele.",fr:"Dents inférieures",df:"Arcade inférieure coupant et broyant.",m:"mandible"},
{id:"dg_salivary",s:"digestive",g:"mouth",r:"head_neck",en:"Salivary glands",la:"Glandulae salivariae",es:"Glándulas salivales",h:13,d:"Spit factories starting starch digestion.",de:"Fábricas de saliva digestiva.",fr:"Glandes salivaires",df:"Usines à salive digestive.",m:null},
// accessory glands
{id:"dg_liver",s:"digestive",g:"glands",r:"abdomen",en:"Liver",la:"Hepar",es:"Hígado",h:13,d:"Largest gland: bile, fuel and detox factory.",de:"La mayor glándula: bilis y detox.",fr:"Foie",df:"La plus grosse glande : bile et détox.",m:"liver"},
{id:"dg_gallbladder",s:"digestive",g:"glands",r:"abdomen",en:"Gallbladder",la:"Vesica biliaris",es:"Vesícula biliar",h:13,d:"Bile-storing pouch under the liver.",de:"Bolsa de bilis bajo el hígado.",fr:"Vésicule biliaire",df:"Poche à bile sous le foie.",m:null},
{id:"dg_pancreas",s:"digestive",g:"glands",r:"abdomen",en:"Pancreas",la:"Pancreas",es:"Páncreas",h:13,d:"Enzyme and insulin gland behind the stomach.",de:"Glándula de enzimas e insulina.",fr:"Pancréas",df:"Glande à enzymes et à insuline.",m:null},
// gut tube
{id:"dg_esophagus",s:"digestive",g:"gut",r:"thorax",en:"Esophagus",la:"Oesophagus",es:"Esófago",h:15,d:"Muscular chute squeezing food to the stomach.",de:"Tubo muscular al estómago.",fr:"Œsophage",df:"Tube musculaire vers l'estomac.",m:"esophagus"},
{id:"dg_stomach",s:"digestive",g:"gut",r:"abdomen",en:"Stomach",la:"Ventriculus",es:"Estómago",h:15,d:"Acid churn turning meals into chyme.",de:"Batido ácido que forma el quimo.",fr:"Estomac",df:"Brassage acide formant le chyme.",m:"stomach"},
{id:"dg_duodenum",s:"digestive",g:"gut",r:"abdomen",en:"Duodenum",la:"Duodenum",es:"Duodeno",h:15,d:"C-loop where bile and enzymes join food.",de:"Asa donde se unen bilis y enzimas.",fr:"Duodénum",df:"Anse où se joignent bile et enzymes.",m:null},
{id:"dg_jejunum",s:"digestive",g:"gut",r:"abdomen",en:"Jejunum and ileum",la:"Jejunum et ileum",es:"Yeyuno e íleon",h:15,d:"Coiled absorbers of nutrients.",de:"Asas que absorben nutrientes.",fr:"Jéjunum et iléon",df:"Anses absorbant les nutriments.",m:"intestines"},
{id:"dg_colon",s:"digestive",g:"gut",r:"abdomen",en:"Large intestine",la:"Intestinum crassum",es:"Intestino grueso",h:15,d:"Water-reclaiming frame around the small bowel.",de:"Marco que recupera agua.",fr:"Côlon",df:"Cadre récupérant l'eau.",m:"intestines"},
{id:"dg_appendix",s:"digestive",g:"gut",r:"abdomen",en:"Appendix",la:"Appendix vermiformis",es:"Apéndice",h:12,d:"Finger-like immune outpost of the cecum.",de:"Apéndice inmune del ciego.",fr:"Appendice",df:"Appendice immunitaire du cæcum.",m:null},
{id:"dg_rectum",s:"digestive",g:"gut",r:"pelvis",en:"Rectum",la:"Rectum",es:"Recto",h:15,d:"Final straight store before exit.",de:"Almacén final antes de salir.",fr:"Rectum",df:"Réservoir final avant la sortie.",m:null},
// vessels
{id:"dg_mesenteric_sup",s:"digestive",g:"vessels",r:"abdomen",en:"Superior mesenteric vessels",la:"Vasa mesenterica superiora",es:"Vasos mesentéricos superiores",h:4,d:"Lifeline of the midgut.",de:"Irrigan el intestino medio.",fr:"Vaisseaux mésentériques supérieurs",df:"Irriguent l'intestin moyen.",m:null},

// ── URINARY (6) ──
{id:"ur_kidney",s:"urinary",g:"kidney",r:"abdomen",en:"Kidney",la:"Ren",es:"Riñón",h:13,d:"Bean filter balancing blood and urine.",de:"Filtro que equilibra sangre y orina.",fr:"Rein",df:"Filtre équilibrant sang et urine.",m:"kidney_l"},
{id:"ur_nephron",s:"urinary",g:"kidney",r:"abdomen",en:"Nephron",la:"Nephron",es:"Nefrona",h:13,d:"Microscopic filtering unit, a million per kidney.",de:"Unidad filtrante microscópica.",fr:"Néphron",df:"Unité filtrante microscopique.",m:null},
{id:"ur_adrenal",s:"urinary",g:"kidney",r:"abdomen",en:"Adrenal gland",la:"Glandula suprarenalis",es:"Glándula suprarrenal",h:13,d:"Cap of stress hormones atop each kidney.",de:"Casquete hormonal sobre el riñón.",fr:"Surrénale",df:"Chapeau hormonal sur le rein.",m:null},
{id:"ur_ureter",s:"urinary",g:"excretory_path",r:"abdomen",en:"Ureter",la:"Ureter",es:"Uréter",h:15,d:"Peristaltic tube from kidney to bladder.",de:"Tubo del riñón a la vejiga.",fr:"Uretère",df:"Tube du rein à la vessie.",m:null},
{id:"ur_bladder",s:"urinary",g:"excretory_path",r:"pelvis",en:"Urinary bladder",la:"Vesica urinaria",es:"Vejiga urinaria",h:15,d:"Stretchy store for urine.",de:"Reservorio elástico de orina.",fr:"Vessie",df:"Réservoir élastique d'urine.",m:"bladder"},
{id:"ur_urethra",s:"urinary",g:"excretory_path",r:"pelvis",en:"Urethra",la:"Urethra",es:"Uretra",h:15,d:"Exit duct differing by sex.",de:"Conducto de salida.",fr:"Urètre",df:"Conduit de sortie.",m:null},

// ── REPRODUCTIVE (6) ──
{id:"rp_testis",s:"reproductive",g:"male",r:"pelvis",en:"Testis",la:"Testis",es:"Testículo",h:13,d:"Sperm and testosterone factory.",de:"Fábrica de esperma y testosterona.",fr:"Testicule",df:"Fabrique de sperme et de testostérone.",m:null},
{id:"rp_prostate",s:"reproductive",g:"male",r:"pelvis",en:"Prostate",la:"Prostata",es:"Próstata",h:13,d:"Chestnut gland adding fluid to semen.",de:"Glándula que aporta al semen.",fr:"Prostate",df:"Glande ajoutant au sperme.",m:null},
{id:"rp_dartos",s:"reproductive",g:"male",r:"pelvis",en:"Dartos fascia",la:"Tunica dartos",es:"Túnica dartos",h:3,d:"Wrinkling skin-muscle regulating testis temperature.",de:"Regula la temperatura testicular.",fr:"Dartos",df:"Régule la température testiculaire.",m:null},
{id:"rp_gonadal_v",s:"reproductive",g:"male",r:"pelvis",en:"Right testicular vein",la:"Vena testicularis dextra",es:"Vena testicular derecha",h:6,d:"Long drain from testis to vena cava.",de:"Drenaje del testículo a la cava.",fr:"Veine testiculaire droite",df:"Drain du testicule à la cave.",m:null},
{id:"rp_ovary",s:"reproductive",g:"female",r:"pelvis",en:"Ovary",la:"Ovarium",es:"Ovario",h:13,d:"Egg and estrogen source.",de:"Fuente de óvulos y estrógenos.",fr:"Ovaire",df:"Source d'ovules et d'œstrogènes.",m:null},
{id:"rp_uterus",s:"reproductive",g:"female",r:"pelvis",en:"Uterus",la:"Uterus",es:"Útero",h:15,d:"Muscular cradle of pregnancy.",de:"Cuna muscular del embarazo.",fr:"Utérus",df:"Berceau musculaire de la grossesse.",m:null},

// ── LYMPHATIC (5) ──
{id:"ly_spleen",s:"lymphatic",g:"organs",r:"abdomen",en:"Spleen",la:"Splen; Lien",es:"Bazo",h:12,d:"Blood-filtering immune sponge.",de:"Esponja inmune de la sangre.",fr:"Rate",df:"Éponge immune du sang.",m:null},
{id:"ly_thymus",s:"lymphatic",g:"organs",r:"thorax",en:"Thymus",la:"Thymus",es:"Timo",h:12,d:"T-cell school behind the sternum.",de:"Escuela de linfocitos T.",fr:"Thymus",df:"École des lymphocytes T.",m:null},
{id:"ly_tonsil",s:"lymphatic",g:"organs",r:"head_neck",en:"Palatine tonsil",la:"Tonsilla palatina",es:"Amígdala palatina",h:12,d:"Throat immune sentinel.",de:"Centinela inmune faríngeo.",fr:"Amygdale palatine",df:"Sentinelle immune du pharynx.",m:null},
{id:"ly_thoracicduct",s:"lymphatic",g:"vessels",r:"thorax",en:"Thoracic duct",la:"Ductus thoracicus",es:"Conducto torácico",h:12,d:"Main lymph return to the veins.",de:"Retorno linfático a las venas.",fr:"Canal thoracique",df:"Retour lymphatique vers les veines.",m:null},
{id:"ly_node",s:"lymphatic",g:"nodes",r:"whole_body",en:"Lymph node",la:"Nodus lymphaticus",es:"Ganglio linfático",h:12,d:"Bean filter trapping germs.",de:"Filtro que atrapa gérmenes.",fr:"Ganglion lymphatique",df:"Filtre piégeant les microbes.",m:null},

// ── ENDOCRINE (6) ──
{id:"en_pituitary",s:"endocrine",g:"glands",r:"head_neck",en:"Pituitary gland",la:"Hypophysis",es:"Hipófisis",h:13,d:"Master gland conducting all hormones.",de:"Glándula maestra hormonal.",fr:"Hypophyse",df:"Glande maîtresse des hormones.",m:null},
{id:"en_pineal",s:"endocrine",g:"glands",r:"head_neck",en:"Pineal gland",la:"Glandula pinealis",es:"Glándula pineal",h:13,d:"Melatonin clock of sleep.",de:"Reloj de melatonina.",fr:"Pinéale",df:"Horloge à mélatonine.",m:null},
{id:"en_thyroid",s:"endocrine",g:"glands",r:"head_neck",en:"Thyroid gland",la:"Glandula thyroidea",es:"Glándula tiroides",h:13,d:"Butterfly setting metabolic pace.",de:"Mariposa del ritmo metabólico.",fr:"Thyroïde",df:"Papillon du rythme métabolique.",m:"thyroid"},
{id:"en_parathyroid",s:"endocrine",g:"glands",r:"head_neck",en:"Parathyroid glands",la:"Glandulae parathyroideae",es:"Paratiroides",h:13,d:"Four calcium controllers.",de:"Cuatro controles del calcio.",fr:"Parathyroïdes",df:"Quatre contrôles du calcium.",m:null},
{id:"en_pancreasislets",s:"endocrine",g:"glands",r:"abdomen",en:"Pancreatic islets",la:"Insulae pancreaticae",es:"Islotes pancreáticos",h:13,d:"Insulin micro-organs.",de:"Micro-órganos de insulina.",fr:"Îlots pancréatiques",df:"Micro-organes à insuline.",m:null},
{id:"en_ovaryendo",s:"endocrine",g:"glands",r:"pelvis",en:"Ovarian follicle",la:"Folliculus ovaricus",es:"Folículo ovárico",h:13,d:"Cyclic estrogen capsule.",de:"Cápsula cíclica de estrógenos.",fr:"Follicule ovarien",df:"Capsule cyclique d'œstrogènes.",m:null},

// ── INTEGUMENTARY (4) ──
{id:"in_skin",s:"integumentary",g:"skin",r:"whole_body",en:"Skin",la:"Cutis",es:"Piel",h:15,d:"Largest organ: barrier, sensor and cooler.",de:"El mayor órgano: barrera y sensor.",fr:"Peau",df:"Le plus grand organe : barrière et capteur.",m:"skin"},
{id:"in_nail",s:"integumentary",g:"skin",r:"upper_limb",en:"Nail",la:"Unguis",es:"Uña",h:15,d:"Keratin shield of fingertips.",de:"Escudo de queratina.",fr:"Ongle",df:"Bouclier de kératine.",m:null},
{id:"in_sweat",s:"integumentary",g:"appendages",r:"whole_body",en:"Sweat gland",la:"Glandula sudorifera",es:"Glándula sudorípara",h:13,d:"Coiled cooler secreting sweat.",de:"Enfriadora en espiral.",fr:"Glande sudoripare",df:"Serpentin rafraîchissant.",m:null},
{id:"in_hair",s:"integumentary",g:"appendages",r:"head_neck",en:"Hair follicle",la:"Folliculus pili",es:"Folículo piloso",h:15,d:"Root factory of each hair.",de:"Fábrica de cada pelo.",fr:"Follicule pileux",df:"Fabrique de chaque poil.",m:"hair"},

// ── SECTIONS & HISTOLOGY (8) ──
{id:"se_sagittal_head",s:"sectional",g:"sections",r:"head_neck",en:"Sagittal head section",la:"Sectio sagittalis capitis",es:"Corte sagital de cabeza",h:null,d:"Midline landmarks: corpus callosum, ventricles, brainstem.",de:"Línea media: cuerpo calloso y tronco.",fr:"Coupe sagittale de la tête",df:"Ligne médiane : corps calleux et tronc.",m:null},
{id:"se_axial_thorax",s:"sectional",g:"sections",r:"thorax",en:"Axial thorax section",la:"Sectio axialis thoracis",es:"Corte axial de tórax",h:null,d:"Reading order: skin → muscle → ribs → pleura → lungs → mediastinum.",de:"Orden: piel → músculo → costillas → pleura → pulmón → mediastino.",fr:"Coupe axiale du thorax",df:"Ordre : peau, muscle, côtes, plèvre, poumon, médiastin.",m:null},
{id:"se_coronal_abdomen",s:"sectional",g:"sections",r:"abdomen",en:"Coronal abdomen section",la:"Sectio coronalis abdominis",es:"Corte coronal de abdomen",h:null,d:"Liver right, stomach left, kidneys rear, bowel central.",de:"Hígado derecha, estómago izquierda, riñones atrás.",fr:"Coupe coronale de l'abdomen",df:"Foie à droite, estomac à gauche, reins en arrière.",m:null},
{id:"se_pelvis",s:"sectional",g:"sections",r:"pelvis",en:"Pelvic section",la:"Sectio pelvis",es:"Corte pélvico",h:null,d:"Bladder front, reproductive organs mid, rectum rear.",de:"Vejiga delante, recto detrás.",fr:"Coupe du bassin",df:"Vessie devant, rectum derrière.",m:null},
{id:"se_knee",s:"sectional",g:"sections",r:"lower_limb",en:"Knee menisci section",la:"Sectio meniscorum",es:"Corte de meniscos",h:10,d:"C-shaped fibrocartilage pair cushioning femur on tibia.",de:"Par fibrocartilaginoso amortiguador.",fr:"Coupe du genou",df:"Paire fibrocartilagineuse amortissante.",m:null},
{id:"se_hist_bone",s:"sectional",g:"histology",r:"whole_body",en:"Bone histology: osteon",la:"Osteon",es:"Osteona",h:0,d:"Concentric lamellae around a Haversian canal.",de:"Laminillas en torno al conducto.",fr:"Os : ostéon",df:"Lamelles autour du canal.",m:null},
{id:"se_hist_muscle",s:"sectional",g:"histology",r:"whole_body",en:"Muscle histology: fiber",la:"Fibra muscularis",es:"Fibra muscular",h:5,d:"Striated multinucleated contractile fiber.",de:"Fibra estriada contráctil.",fr:"Muscle : fibre",df:"Fibre striée contractile.",m:null},
{id:"se_hist_nerve",s:"sectional",g:"histology",r:"whole_body",en:"Nerve histology: axon",la:"Axon",es:"Axón",h:7,d:"Myelin-wrapped conductor with nodes of Ranvier.",de:"Conductor mielínico con nódulos.",fr:"Nerf : axone",df:"Conducteur myélinisé à nœuds.",m:null},
];

export const SYSTEM_OF = Object.fromEntries(SYSTEMS.map(s => [s.id, s]));
export const REGION_OF = Object.fromEntries(REGIONS.map(r => [r.id, r]));
// lookup for "sysId:subId"
export const SUB_OF = {};
for (const [sys, subs] of Object.entries(SUBGROUPS))
  for (const sg of subs) SUB_OF[sys + ":" + sg.id] = { ...sg, sys };
export const HISTO_OF = HISTOLOGY.map((h, i) => ({ ...h, idx: i }));

export function getStructure(id) { return STRUCTURES.find(s => s.id === id) || null; }
export function bySystem(sys) { return STRUCTURES.filter(s => s.s === sys); }
export function subgroupsOf(sys) { return SUBGROUPS[sys] || []; }
export function searchStructures(q) {
  const norm = (x) => (x || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const n = norm(q.trim());
  if (!n) return [];
  return STRUCTURES.filter(s =>
    norm(s.en).includes(n) || norm(s.es).includes(n) || norm(s.fr).includes(n) || norm(s.la).includes(n)
  );
}
