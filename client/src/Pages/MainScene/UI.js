import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScene } from './Scenecontext';


const UI = ({ isUiHidden, hideObject, wrapperRef }) => {
   const { model, selectedObject, updateSelectedObject } = useScene();
   const [isModelLoaded, setIsModelLoaded] = useState(false);
   const navigate = useNavigate()
   const UIWrapperRef = useRef(null)
   const [activeTab, setActiveTab] = useState('list'); // 'list' or 'info'

   // Translation map for list items
   const getName = (name) => {
      const translations = {
         'височная_мышца_слева': 'Left Temporalis',
         'височная_мышца_справа': 'Right Temporalis',
         'жевательная_внешняя_слева': 'Left Masseter (Superficial)',
         'жевательная_внешняя_справа': 'Right Masseter (Superficial)',
         'жевательная_внутренняя_слева': 'Left Masseter (Deep)',
         'жевательная_внутренняя_справа': 'Right Masseter (Deep)',
         'латеральная_крыловидная_1_л': 'Left Lateral Pterygoid (Superior)',
         'латеральная_крыловидная_2_л': 'Left Lateral Pterygoid (Inferior)',
         'латеральная_крыловидная_1_п': 'Right Lateral Pterygoid (Superior)',
         'латеральная_крыловидная_2_п': 'Right Lateral Pterygoid (Inferior)',
         'медиальная_крыловидная_слева': 'Left Medial Pterygoid',
         'медиальная_крыловидная_справа': 'Right Medial Pterygoid',
         'латеральная_связка_слева': 'Left Lateral Ligament',
         'латеральная_связка_справа': 'Right Lateral Ligament',
         'суставная_капсула_слева': 'Left Joint Capsule',
         'суставная_капсула_справа': 'Right Joint Capsule',
         'диск_слева': 'Left Articular Disc',
         'диск_справа': 'Right Articular Disc'
      };
      return translations[name] || name.replace(/_/g, ' ');
   };

   useEffect(() => {
      if (model) {
         setIsModelLoaded(true)
      }
      else {
         setIsModelLoaded(false)
      }
   }, [model]);

   useEffect(() => {
      if (isUiHidden) {
         UIWrapperRef.current.style.width = '0'
         UIWrapperRef.current.style.opacity = '0'
         UIWrapperRef.current.style.pointerEvents = 'none'
      }
      else {
         UIWrapperRef.current.style.width = '400px'
         UIWrapperRef.current.style.opacity = '1'
         UIWrapperRef.current.style.pointerEvents = 'all'
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
               className={`tab-button ${activeTab === 'list' ? 'active' : ''}`}
               onClick={() => setActiveTab('list')}
            >
               Parts List
            </button>
            <button
               className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}
               onClick={() => setActiveTab('info')}
            >
               Info
            </button>
         </div>

         <div className="tab-content">
            {activeTab === 'list' && (
               <div className="List">
                  {isModelLoaded && model.map((object) =>
                     <div key={object.uuid} id={object.name} className={`item ${selectedObject?.name === object.name ? 'selected' : ''}`}>
                        <div className="itemDesc" onClick={() => handleObjectClick(object)}>
                           {getName(object.name)}
                        </div>
                        <div className="buttons">
                           <div style={{ opacity: object.visible ? 1 : 0.5 }} onClick={(e) => { hideObject(e, object); }} className="toggleHide button" title="Hide/Show">
                              👁
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            )}

            {activeTab === 'info' && (
               <div className='selectedObjectOverview'>
                  {selectedObject ? (
                     selectedObject.name === 'височная_мышца_слева' || selectedObject.name === 'височная_мышца_справа' ? <div className="selectedObjectOverviewWrapper">
                        <img className='image' src="visok.png" alt="" />
                        <div className="text">
                           <h3>Temporalis Muscle</h3>
                           <h4>Attachment:</h4>
                           The origin of this muscle varies: anterior to the zygomatic process of the frontal bone, superior to the mastoid process, and inferior to the infratemporal crest. The temporal fascia is also an origin of the muscle. The direction of the tendon corresponds to the axis of the outer contour of the muscle, passes under the zygomatic arch, and attaches to the coronoid process of the mandible. The anterior part of the muscle forms the frontal part in 30% of cases, the fibers of which attach partly to the coronoid process and partly (recurrent fibers) to the condylar process, leading to more precise control of tooth occlusion.
                           <h4>Function:</h4>
                           The muscle is an adductor (closes the jaw), retractor (pulls back), and its frontal part positions the condyle relative to the tubercle. It adducts and elevates the mandible. The posterior part of the temporalis muscle, whose fibers are directed almost horizontally, begins retraction of the mandible from a protruded position – acting as an antagonist to the inferior head of the lateral pterygoid muscle.
                        </div>
                     </div>
                        : selectedObject.name === 'жевательная_внешняя_слева' || selectedObject.name === 'жевательная_внешняя_справа' ? <div className="selectedObjectOverviewWrapper">
                           <img className='image' src="zhev.jpg" alt="" />
                           <div className="text">
                              <h3>Masseter Muscle</h3>
                              <h4>Attachment:</h4>
                              It begins at the lower edge and inner surface of the zygomatic arch, the anterior slope of the articular tubercle of the temporal bone, and the temporal fascia. It attaches to the masseteric tuberosity on the outer surface of the mandibular ramus below its notch. From the mandible, the muscle bundles are directed upwards, forwards, and outwards.
                              <h4>Function:</h4>
                              It is an adductor and laterotrusor. It elevates the mandible. The direction of the muscle fibers (forward and upward) allows positioning of the condylar processes relative to the tubercles. Together with the medial pterygoid muscle, the masseter forms a functional unit – the pterygomasseteric sling. It can not only elevate the mandible but also displace it laterally and rotate it slightly.
                           </div>
                        </div>
                           : selectedObject.name === 'латеральная_связка_слева' || selectedObject.name === 'латеральная_связка_справа' || selectedObject.name === 'суставная_капсула_слева' || selectedObject.name === 'суставная_капсула_справа' || selectedObject.name === 'жевательная_внутренняя_слева' || selectedObject.name === 'жевательная_внутренняя_справа' ? <div className="selectedObjectOverviewWrapper">
                              <img className='image' src="VNS.jpg" alt="" />
                              <div className="text">
                                 <h3>Temporomandibular Joint (TMJ)</h3>
                                 The temporomandibular joint (articulatio temporomandibularis) is formed by the mandibular fossa of the temporal bone and the head of the condylar process of the mandible. Anterior to the fossa is the articular tubercle.

                                 Between the articular surfaces, there is a biconcave articular disc (discus articularis) of oval shape, formed by fibrous cartilage, which divides the joint cavity into two compartments: superior and inferior.

                                 In the upper compartment, the articular surface of the temporal bone articulates with the upper surface of the articular disc. The synovial membrane of this compartment covers the inner surface of the capsule and attaches to the edges of the articular cartilage. In the lower compartment, the head of the mandible and the lower surface of the articular disc articulate. The synovial membrane of the lower compartment covers not only the capsule but also the posterior surface of the neck of the condylar process located inside the capsule.

                                 The loose joint capsule on the temporal bone attaches anterior to the articular tubercle, and posteriorly — at the level of the petrotympanic fissure. On the condylar process, the joint capsule attaches anteriorly along the edge of the head, and posteriorly 0.5 cm below the head of the mandible. The joint capsule is fused around the entire circumference with the articular disc. The capsule is thin anteriorly, while posteriorly it thickens and is reinforced by several ligaments.
                              </div>
                           </div>
                              : selectedObject.name === 'латеральная_крыловидная_1_л' || selectedObject.name === 'латеральная_крыловидная_2_л' || selectedObject.name === 'латеральная_крыловидная_1_п' || selectedObject.name === 'латеральная_крыловидная_2_п' ? <div className="selectedObjectOverviewWrapper">
                                 <img className='image' src="lateral.jpg" alt="" />
                                 <div className="text">
                                    <h3>Lateral Pterygoid Muscle</h3>
                                    <h4>Attachment:</h4>
                                    <strong>Origin:</strong><br />
                                    Superior head: from the infratemporal crest of the greater wing of the sphenoid bone.<br />
                                    Inferior head: from the outer surface of the lateral pterygoid plate of the sphenoid bone and the infratemporal fascia.<br />
                                    <strong>Insertion:</strong><br />
                                    Superior head: to the joint capsule of the TMJ.<br />
                                    Inferior head: to the pterygoid fovea on the anterior surface of the condylar process.<br />
                                    <h4>Function:</h4>
                                    Bilateral contraction of the muscle leads to displacement and rotation in both temporomandibular joints. The inferior heads pull the mandibular condyle forward, which leads to rotation of the condyle relative to the lower surface of the articular disc. The superior heads pull the joint capsule and disc anteriorly. The inferior heads of the muscle contract eccentrically to smooth the posterior displacement of the articular disc and mandibular condyle, counteracting the tension of the temporalis and masseter muscles, which pull the mandible posteriorly. The inferior head contracts unilaterally, which leads to side-to-side jaw movement, rotating the mandibular condyle anteriorly.
                                 </div>
                              </div>
                                 : selectedObject.name === 'медиальная_крыловидная_справа' || selectedObject.name === 'медиальная_крыловидная_слева' ? <div className="selectedObjectOverviewWrapper">
                                    <img className='image' src="medial.jpg" alt="" />
                                    <div className="text">
                                       <h3>Medial Pterygoid Muscle</h3>
                                       <h4>Attachment:</h4>
                                       It originates in the pterygoid fossa (from the pterygoid process of the sphenoid bone) and from the pyramidal process of the palatine bone (its fibers run obliquely backward, downward, and laterally), attaching to the inner surface of the mandible in the region of the angle and pterygoid tuberosity. It often intertwines with fibers of the inferior head of the lateral pterygoid muscle.
                                       <h4>Function:</h4>
                                       It is an adductor. It elevates the mandible, acting simultaneously with the masseter and temporalis. Unilateral tension of this muscle leads to mediotrusion and is often involved in bruxism. The vector of muscle contraction is directed forward, inward, and upward.
                                    </div>
                                 </div>
                                    : <div className="no-info">No information available for this part.</div>
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