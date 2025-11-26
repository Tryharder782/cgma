import React from 'react';
import '../../style/Page.scss';

const Contacts = () => {
   return (
      <div className='pageWrapper'>
         <div className="pageContainer">
            <h1>Contacts</h1>
            <p>
               If you have any questions, suggestions, or ideas for the development of the project, I am always open to dialogue.
            </p>
            
            <div className="contact-info">
               <div>
                  <strong>Email:</strong> <a href="mailto:example@example.com">example@example.com</a>
               </div>
               <div>
                  <strong>Telegram:</strong> <a href="https://t.me/example" target="_blank" rel="noreferrer">@example</a>
               </div>
            </div>

            <h2>Collaboration</h2>
            <p>
               I am interested in collaborating with medical institutions and educational projects to improve the accuracy of the models and expand functionality.
            </p>
         </div>
      </div>
   );
};

export default Contacts;
