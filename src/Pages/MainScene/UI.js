import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useScene } from './Scenecontext';

const exactTranslations = {
   'височная мышца слева': 'Left Temporalis',
   'височная мышца справа': 'Right Temporalis',
   'жевательная внешняя слева': 'Left Masseter (Superficial)',
   'жевательная внешняя справа': 'Right Masseter (Superficial)',
   'жевательная внутренняя слева': 'Left Masseter (Deep)',
   'жевательная внутренняя справа': 'Right Masseter (Deep)',
   'латеральная крыловидная 1 л': 'Left Lateral Pterygoid (Superior)',
   'латеральная крыловидная 2 л': 'Left Lateral Pterygoid (Inferior)',
   'латеральная крыловидная 1 п': 'Right Lateral Pterygoid (Superior)',
   'латеральная крыловидная 2 п': 'Right Lateral Pterygoid (Inferior)',
   'медиальная крыловидная слева': 'Left Medial Pterygoid',
   'медиальная крыловидная справа': 'Right Medial Pterygoid',
   'латеральная связка слева': 'Left Lateral Ligament',
   'латеральная связка справа': 'Right Lateral Ligament',
   'суставная капсула слева': 'Left Joint Capsule',
   'суставная капсула справа': 'Right Joint Capsule',
   'суставной диск слева': 'Left Articular Disc',
   'суставной диск справа': 'Right Articular Disc',
   'диск слева': 'Left Articular Disc',
   'диск справа': 'Right Articular Disc',
   'полость носа': 'Nasal Cavity',
   'нёбная кость слева': 'Left Palatine Bone',
   'нёбная кость справа': 'Right Palatine Bone',
   'небная кость слева': 'Left Palatine Bone',
   'небная кость справа': 'Right Palatine Bone',
   'клиновидная кость': 'Sphenoid Bone',
   'верхняя челюсть слева': 'Left Maxilla',
   'верхняя челюсть справа': 'Right Maxilla',
   'скуловая кость слева': 'Left Zygomatic Bone',
   'скуловая кость справа': 'Right Zygomatic Bone',
   'лобная кость': 'Frontal Bone',
   'затылочная кость': 'Occipital Bone',
   'теменная слева': 'Left Parietal Bone',
   'теменная справа': 'Right Parietal Bone',
   'теменная кость слева': 'Left Parietal Bone',
   'теменная кость справа': 'Right Parietal Bone',
   'височная кость слева': 'Left Temporal Bone',
   'височная кость справа': 'Right Temporal Bone',
   'нижняя челюсть': 'Mandible',
   'вп слева': 'Left VP',
   'вп справа': 'Right VP',
   'дс слева': 'Left DS',
   'дс справа': 'Right DS',
   'лс слева': 'Left LS',
   'лс справа': 'Right LS',
   'мс слева': 'Left MS',
   'мс справа': 'Right MS',
   'нп слева': 'Left NP',
   'нп справа': 'Right NP'
};

const baseTranslations = {
   'полость носа': 'Nasal Cavity',
   'нёбная кость': 'Palatine Bone',
   'небная кость': 'Palatine Bone',
   'клиновидная кость': 'Sphenoid Bone',
   'верхняя челюсть': 'Maxilla',
   'скуловая кость': 'Zygomatic Bone',
   'лобная кость': 'Frontal Bone',
   'затылочная кость': 'Occipital Bone',
   'теменная': 'Parietal Bone',
   'височная кость': 'Temporal Bone',
   'нижняя челюсть': 'Mandible',
   'височная мышца': 'Temporalis',
   'жевательная внешняя': 'Masseter (Superficial)',
   'жевательная внутренняя': 'Masseter (Deep)',
   'латеральная крыловидная': 'Lateral Pterygoid',
   'медиальная крыловидная': 'Medial Pterygoid',
   'латеральная связка': 'Lateral Ligament',
   'суставная капсула': 'Joint Capsule',
   'суставной диск': 'Articular Disc',
   'диск': 'Articular Disc'
};

const partInfo = {
   'Temporalis': {
      image: '/static/visok.png',
      summary: 'A fan-shaped muscle on the side of the skull that elevates and retracts the mandible.',
      note: 'It is one of the key muscles controlling jaw closure and bite precision.'
   },
   'Masseter (Superficial)': {
      image: '/static/zhev.jpg',
      summary: 'The superficial masseter runs from the zygomatic arch to the mandibular ramus and helps close the jaw.',
      note: 'It contributes significantly to bite force and jaw stability during chewing.'
   },
   'Masseter (Deep)': {
      image: '/static/zhev.jpg',
      summary: 'The deep masseter supports mandibular elevation and fine control of jaw position.',
      note: 'It works with temporalis and pterygoid muscles during mastication.'
   },
   'Lateral Pterygoid (Superior)': {
      image: '/static/lateral.jpg',
      summary: 'The superior head helps control disc-condyle coordination in the TMJ during jaw movement.',
      note: 'It is important for smooth opening, closing, and forward translation of the mandible.'
   },
   'Lateral Pterygoid (Inferior)': {
      image: '/static/lateral.jpg',
      summary: 'The inferior head mainly protrudes the mandible and assists side-to-side movement.',
      note: 'Unilateral action contributes to lateral excursion used in grinding.'
   },
   'Lateral Pterygoid': {
      image: '/static/lateral.jpg',
      summary: 'A two-headed muscle involved in protrusion, lateral movement, and TMJ coordination.',
      note: 'It is central to dynamic jaw mechanics during speech and chewing.'
   },
   'Medial Pterygoid': {
      image: '/static/medial.jpg',
      summary: 'A deep jaw elevator that mirrors the masseter on the inner side of the mandible.',
      note: 'Together with the masseter it forms a functional sling around the mandibular angle.'
   },
   'Lateral Ligament': {
      image: '/static/VNS.jpg',
      summary: 'A stabilizing ligament of the TMJ that limits excessive posterior and inferior displacement.',
      note: 'It helps protect joint surfaces during forceful mandibular movements.'
   },
   'Joint Capsule': {
      image: '/static/VNS.jpg',
      summary: 'A fibrous envelope surrounding the temporomandibular joint.',
      note: 'It contains synovial structures and provides joint stability while allowing mobility.'
   },
   'Articular Disc': {
      image: '/static/VNS.jpg',
      summary: 'A fibrocartilaginous disc that separates the TMJ into upper and lower compartments.',
      note: 'It improves load distribution and supports smooth translation/rotation of the condyle.'
   },
   'Nasal Cavity': {
      summary: 'An air passage inside the skull involved in breathing, warming air, and resonance.',
      note: 'It also contributes to olfaction and influences craniofacial airflow dynamics.'
   },
   'Palatine Bone': {
      summary: 'A paired bone forming part of the hard palate and posterior wall of the nasal cavity.',
      note: 'It supports separation between oral and nasal cavities and contributes to maxillary structure.'
   },
   'Sphenoid Bone': {
      summary: 'A central cranial base bone that articulates with multiple neighboring bones.',
      note: 'It contains key foramina and serves as an anatomical crossroads of the skull base.'
   },
   'Maxilla': {
      summary: 'The upper jaw bone supporting the upper teeth, orbit floor, and midface contour.',
      note: 'It is fundamental for occlusion, mastication, and facial support.'
   },
   'Zygomatic Bone': {
      summary: 'The cheekbone that forms part of the lateral orbit and zygomatic arch.',
      note: 'It provides facial width and transmits forces from the maxilla and temporal region.'
   },
   'Frontal Bone': {
      summary: 'Bone of the forehead and superior orbit, forming the anterior cranial vault.',
      note: 'It protects the frontal brain region and shapes the upper face.'
   },
   'Occipital Bone': {
      summary: 'Posterior cranial bone containing the foramen magnum and supporting skull-base structures.',
      note: 'It plays a major role in craniocervical articulation and posterior cranial protection.'
   },
   'Parietal Bone': {
      summary: 'Paired skull vault bones forming much of the superior-lateral cranial surface.',
      note: 'They protect the cerebral hemispheres and define cranial contour.'
   },
   'Temporal Bone': {
      summary: 'A complex lateral skull bone containing auditory structures and TMJ components.',
      note: 'It contributes to hearing anatomy and forms part of the mandibular articulation.'
   },
   'Mandible': {
      summary: 'The lower jaw and the only freely movable bone of the facial skeleton.',
      note: 'It is essential for mastication, speech articulation, and lower dental support.'
   },
   'VP': {
      summary: 'A labeled supporting structure in this model used for orientation and study context.',
      note: 'Use adjacent anatomy and side designation to interpret its specific role in the scene.'
   },
   'DS': {
      summary: 'A labeled supporting structure in this model used for orientation and study context.',
      note: 'Review nearby landmarks in the scene to connect this marker with local anatomy.'
   },
   'LS': {
      summary: 'A labeled supporting structure in this model used for orientation and study context.',
      note: 'This marker is intended to help identify neighboring functional components.'
   },
   'MS': {
      summary: 'A labeled supporting structure in this model used for orientation and study context.',
      note: 'Interpretation is improved by examining surrounding bone and soft-tissue relations.'
   },
   'NP': {
      summary: 'A labeled supporting structure in this model used for orientation and study context.',
      note: 'Treat this as a reference element and correlate with adjacent named anatomy.'
   }
};

const normalizeName = (name = '') =>
   name
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

const titleCase = (name = '') =>
   name
      .split(' ')
      .filter(Boolean)
      .map((word) => (word.length <= 2 ? word.toUpperCase() : `${word[0].toUpperCase()}${word.slice(1)}`))
      .join(' ');

const getTranslatedName = (name = '') => {
   const normalized = normalizeName(name);
   if (exactTranslations[normalized]) {
      return exactTranslations[normalized];
   }

   const sideMatch = normalized.match(/\s(слева|справа)$/);
   const side = sideMatch ? (sideMatch[1] === 'слева' ? 'Left' : 'Right') : '';
   const base = sideMatch ? normalized.replace(/\s(слева|справа)$/, '') : normalized;
   const translatedBase = baseTranslations[base];

   if (translatedBase) {
      return side ? `${side} ${translatedBase}` : translatedBase;
   }

   if (/^[a-z0-9 _-]+$/i.test(name)) {
      return titleCase(name.replace(/_/g, ' '));
   }

   return titleCase(name.replace(/_/g, ' '));
};

const getPartInfo = (objectName = '') => {
   const translated = getTranslatedName(objectName);
   const sideMatch = translated.match(/^(Left|Right)\s+(.+)$/);
   const side = sideMatch ? sideMatch[1] : null;
   const baseName = sideMatch ? sideMatch[2] : translated;
   const info = partInfo[translated] || partInfo[baseName];

   if (info) {
      return {
         title: translated,
         image: info.image,
         summary: info.summary,
         note: info.note,
         orientation: side ? `This structure is shown on the ${side.toLowerCase()} side of the model.` : null
      };
   }

   return {
      title: translated,
      summary: `${translated} is included as a distinct study element in this anatomical model.`,
      note: 'Use neighboring landmarks and the 3D view to understand its position and relationships.',
      orientation: side ? `This structure is shown on the ${side.toLowerCase()} side of the model.` : null
   };
};

const UI = ({ isUiHidden, hideObject }) => {
   const { model, selectedObject, updateSelectedObject } = useScene();
   const [isModelLoaded, setIsModelLoaded] = useState(false);
   const UIWrapperRef = useRef(null);
   const [activeTab, setActiveTab] = useState('list');

   const selectedInfo = useMemo(() => {
      if (!selectedObject) {
         return null;
      }
      return getPartInfo(selectedObject.name);
   }, [selectedObject]);

   useEffect(() => {
      setIsModelLoaded(Array.isArray(model) && model.length > 0);
   }, [model]);

   useEffect(() => {
      if (!UIWrapperRef.current) {
         return;
      }

      if (isUiHidden) {
         UIWrapperRef.current.style.width = '0';
         UIWrapperRef.current.style.opacity = '0';
         UIWrapperRef.current.style.pointerEvents = 'none';
      } else {
         UIWrapperRef.current.style.width = 'clamp(300px, 30vw, 430px)';
         UIWrapperRef.current.style.opacity = '1';
         UIWrapperRef.current.style.pointerEvents = 'all';
      }
   }, [isUiHidden]);

   const handleObjectClick = (object) => {
      updateSelectedObject(object);
   };

   useEffect(() => {
      if (selectedObject && activeTab === 'list') {
         const element = document.getElementById(selectedObject.name);
         if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
         }
      }
   }, [selectedObject, activeTab]);

   return (
      <div ref={UIWrapperRef} className='UIWrapper2'>
         <div className="tabs">
            <button
               type="button"
               className={`tab-button ${activeTab === 'list' ? 'active' : ''}`}
               onClick={() => setActiveTab('list')}
            >
               Parts List
            </button>
            <button
               type="button"
               className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}
               onClick={() => setActiveTab('info')}
            >
               Info
            </button>
         </div>

         <div className="tab-content">
            {activeTab === 'list' && (
               <div className="List">
                  {isModelLoaded && model.map((object) => (
                     <div key={object.uuid} id={object.name} className={`item ${selectedObject?.name === object.name ? 'selected' : ''}`}>
                        <button type="button" className="itemDesc" onClick={() => handleObjectClick(object)}>
                           {getTranslatedName(object.name)}
                        </button>
                        <div className="buttons">
                           <button
                              type="button"
                              style={{ opacity: object.visible ? 1 : 0.6 }}
                              onClick={(event) => hideObject(event, object)}
                              className="toggleHide button"
                              title={object.visible ? 'Hide part' : 'Show part'}
                              aria-label={object.visible ? `Hide ${getTranslatedName(object.name)}` : `Show ${getTranslatedName(object.name)}`}
                           >
                              View
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            )}

            {activeTab === 'info' && (
               <div className='selectedObjectOverview'>
                  {selectedInfo ? (
                     <div className="selectedObjectOverviewWrapper">
                        {selectedInfo.image && (
                           <img className='image' src={selectedInfo.image} alt={selectedInfo.title} />
                        )}
                        <div className="text">
                           <h3>{selectedInfo.title}</h3>
                           <h4>Overview</h4>
                           <p>{selectedInfo.summary}</p>
                           <h4>Why it matters</h4>
                           <p>{selectedInfo.note}</p>
                           {selectedInfo.orientation && (
                              <>
                                 <h4>Orientation</h4>
                                 <p>{selectedInfo.orientation}</p>
                              </>
                           )}
                        </div>
                     </div>
                  ) : (
                     <div className="no-selection">Select a part to view details.</div>
                  )}
               </div>
            )}
         </div>
      </div>
   );
};

export default UI;