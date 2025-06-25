import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScene } from './Scenecontext';


const UI = ({ isUiHidden, hideObject, wrapperRef }) => {
   const { model, selectedObject } = useScene();
   const [isModelLoaded, setIsModelLoaded] = useState(false);
   const navigate = useNavigate()
   const UIWrapperRef = useRef(null)
   const objectOverviewRef = useRef(null)
   const itemListRef = useRef(null)
   const [selectedObjectOverviewActive, setselectedObjectOverviewActive] = useState(false);
   const [currentWindow, setCurrentWindow] = useState(1);


   const menuInfoHandler = () => {
      console.log('menu info')
   }

   useEffect(() => {
      console.log('Model loaded:', model);

      if (model) {
         setIsModelLoaded(true)
      }
      else {
         setIsModelLoaded(false)
      }
   }, [model]);


   useEffect(() => {
      if (!selectedObjectOverviewActive) {

      }
      else {

      }
   }, [selectedObjectOverviewActive]);

   const toggleSelectedObjectOverviewActive = (value) => {
      if (objectOverviewRef.current) {
         objectOverviewRef.current.style.opacity = value
         if (value === 1) {
            objectOverviewRef.current.style.transform = 'translateX(0vw)'
         }
         else {
            objectOverviewRef.current.style.transform = 'translateX(-50vw)'

         }
      }
   }

   useEffect(() => {
      console.log(isUiHidden)
      if (isUiHidden) {
         UIWrapperRef.current.style.width = '0'
      }
      else {
         UIWrapperRef.current.style.width = '400px'
      }
   }, [isUiHidden]);
   useEffect(() => {
      console.log(selectedObject);
   }, [selectedObject]);

   return (
      <div ref={UIWrapperRef} className='UIWrapper2'>

         <div ref={itemListRef} className="List">
            {/* <div className="objectName">
                  {selectedObject !== '' && selectedObject}
               </div> */}
            {isModelLoaded && model.map((object) =>
               <div key={object.uuid} id={object.name} className="item">
                  <div className="itemDesc">
                     {object.name.replace(/_/g, ' ')}
                  </div>
                  <div className="buttons">
                     <div style={{ opacity: object.visible ? 1 : 0.5 }} onClick={(e) => { hideObject(e, object); console.log(object.visible) }} className="toggleHide button">
                        H
                     </div>
                     <div onClick={() => { menuInfoHandler(); /*navigate('/Chewing')*/ }} className="info button">
                        I
                     </div>
                  </div>
               </div>
            )
            }
         </div>
         <div ref={objectOverviewRef} className='selectedObjectOverview'>
            {selectedObject && <div>{selectedObject.name === 'височная_мышца_слева' || selectedObject.name === 'височная_мышца_справа' ? <div className="selectedObjectOverviewWrapper">
               <img className='image' src="visok.png" alt="" />
               <div className="text">
                  <h3>Височная мышца</h3>
                  <h4>Прикрепление:</h4>
                  Начало данной мышцы вырьируется: впереди от скулового отростка лобной кости, сверху от сосцевидного отростка и внизу от подвисочного гребня. Височная фасция также является началом мышцы. Направление сухожилия соответствует оси наружного контура мышцы, проходит под скуловой дугой и прикрепляется к венечному отростку нижней челюсти. Передний отдел мышцы в 30% случаев образует лобную часть, волокна которой прикрепляются частично к венечному отростку, а частично(возвратные волокна) к мыщелковому отростку, что ведет к более точному контролю смыкания зубов.
                  Функция
                  Мышца является аддуктором(приводящая), ретрактором(мышца оттягиватель), а ее лобная часть – позиционирует мыщелок относительно бугорка. Приводит и поднимает нижнюю челюсть. Задняя часть височной мышцы, волокна которой направлены практически горизонтально, начинает ретракцию нижней челюсти из положения протрузии – является антагонистом нижней головки латеральной крыловидной мышцы.

               </div>
            </div>
               : selectedObject.name === 'жевательная_внешняя_слева' || selectedObject.name === 'жевательная_внешняя_справа' ? <div className="selectedObjectOverviewWrapper">
                  <img className='image' src="zhev.jpg" alt="" />
                  <div className="text">
                     <h3>жевателная мышца</h3>
                     <h4>Прикрепление:</h4>
                     Начинается от нижнего края и внутренней поверхности скуловой дуги, переднего ската суставного бугорка височной кости, височной фасции. Прикрепляется к жевательной бугристой наружной поверхности ветви нижней челюсти ниже ее вырезки. От нижней челюсти мышечные пучти направлены вверх, кпереди и кнаружи.
                     Функция
                     Является аддуктором, латеротатором. Она поднимает нижнюю челюсть. Направление мышечных волокон(вперед вверх) позволяет позиционировать мыщелковые отростки относительно бугров. Вместе с медиальной крыловидной мышцей жевательная мышца образует функциональную единицу – крыловидно-жевательная петля. Она может не только поднимать нижнюю челюсть, но и смещать ее латерально и немного вращать.
                     <div onClick={() => navigate('')} className="link">Читать далее...</div>

                  </div>
               </div>
                  : selectedObject.name === 'латеральная_связка_слева' || selectedObject.name === 'латеральная_связка_справа' || selectedObject.name === 'суставная_капсула_слева' || selectedObject.name === 'суставная_капсула_справа' || selectedObject.name === 'жевательная_внутренняя_слева' || selectedObject.name === 'жевательная_внутренняя_справа' ? <div className="selectedObjectOverviewWrapper">
                     <img className='image' src="VNS.jpg" alt="" />
                     <div className="text">
                        <h3>Височно-нижнечелюстной сустав</h3>
                        Височно-нижнечелюстной сустав (articulatio temporomandibular) образован нижнечелюстной ямкой височной кости и головкой мыщелкового отростка нижней челюсти. Впереди ямки находится суставной бугорок.

                        Между суставными поверхностями имеется двояковогнутый суставной диск (discus articularis) овальной формы, образованный волокнистым хрящом, который разделяет полость сустава на два отдела: верхний и нижний.

                        В верхнем этаже суставная поверхность височной кости сочленяется с верхней поверхностью суставного диска. Синовиальная мембрана этого этажа (membrana synovialis superior) покрывает внутреннюю поверхность капсулы и прикрепляется по краям суставного хряща. В нижнем этаже сочленяются головка нижней челюсти и нижняя поверхность суставного диска. Синовиальная мембрана нижнего этажа (membrana synovialis inferior) покрывает не только капсулу, но и заднюю поверхность шейки мыщелкового отростка, находящуюся внутри капсулы.

                        Свободная суставная капсула на височной кости прикрепляется кпереди от суставного бугорка, а сзади — на уровне каменисто-барабанной щели. На мыщелковом отростке суставная капсула прикрепляется спереди по краю головки, а сзади на 0,5 см ниже головки нижней челюсти. Суставная капсула сращена по всей окружности с суставным диском. Капсула спереди тонкая, а сзади она утолщается и укрепляется несколькими связками. <div onClick={() => navigate('')} className="link">Читать далее...</div>

                     </div>
                  </div>
                     : selectedObject.name === 'латеральная_крыловидная_1_л' || selectedObject.name === 'латеральная_крыловидная_2_л' || selectedObject.name === 'латеральная_крыловидная_1_п' || selectedObject.name === 'латеральная_крыловидная_2_п' ? <div className="selectedObjectOverviewWrapper">
                        <img className='image' src="lateral.jpg" alt="" />
                        <div className="text">
                           <h3>Латеральная крыловидная мышца</h3>
                           <h4>Прикрепление:</h4>
                           Прикрепление
                           Начало
                           Верхняя головка: от подвисочного гребня большого крыла клиновидной кости
                           Нижняя головка: от наружной поверхности латеральной пластинки отростка клиновидной кости и подвисочной фасции
                           Прикрепление
                           Верхняя головка: к суставной капсуле ВНЧС
                           Нижняя головка: к крыловидной ямке передней поверхности мыщелкового отростка
                           Функция
                           Двустороннее сокращение мышцы приводит к перемещению и вращению в обоих височно-нижнечелюстных суставах. Нижние головки тянут мыщелок нижней челюсти вперед, что приводит к вращению мыщелка относительно нижней поверхности суставного диска. Верхние головки тянут суставную капсулу и диск кпереди. Нижние головки мышцы эксцентрично сокращаются, чтобы сгладить заднее смещение суставного диска и мыщелка нижней челюсти, противодействуя натяжению височных и жевательных мышц, которые оттягивают нижнюю челюсть кзади. Нижняя головка сжимается в одностороннем порядке, что ведет к движению челюсти из стороны в сторону, вращая мыщелок нижней челюсти кпереди.
                           . <div onClick={() => navigate('')} className="link">Читать далее...</div>

                        </div>
                     </div>
                        : selectedObject.name === 'медиальная_крыловидная_справа' || selectedObject.name === 'медиальная_крыловидная_слева' ? <div className="selectedObjectOverviewWrapper">
                           <img className='image' src="medial.jpg" alt="" />
                           <div className="text">
                              <h3>медиальная крыловидная мышца</h3>
                              <h4>Прикрепление:</h4>
                              Берет начало в крыловидной ямке(от крыловидного отростка клиновидной кости) и от пирамидального отростка небной кости(ее волокна следуют косо назад, вниз и латерально), прикрепляются к внутреней поверхности нижней челюсти с области угла и крыловидной бугристости. Часто переплетаются с волокнами нижней головки латеральной крыловидной мышцы.
                              Функция
                              Является аддуктором. Поднимает нижнюю челюсть, действуя одновременно и жевательной и височной. Одностороннее напряжение этой мышцы приводит к медиотрузии и часто участвует в блуксизме. Вектор сокращения мышцы направлен вперед, внутрь и вверх.
                              <div onClick={() => navigate('')} className="link">Читать далее...</div>

                           </div>
                        </div>
                           : <div></div>
            }
            </div>
            }
         </div>
         <div className="buttons">
            <div onClick={() => toggleSelectedObjectOverviewActive(0)} className="button button1">список</div>
            <div onClick={() => toggleSelectedObjectOverviewActive(1)} className="button button2">объект</div>
         </div>
      </div>
   );
};

export default UI;