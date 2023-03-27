import "./CardContent.css";
import { useState } from 'react';
import Modal from 'react-modal';

// recebendo esta configuração, não quebra os testes, 
//mas apresentada um erro de key property
Modal.setAppElement();

// recebendo o root como parametro a lib quebra os tests com jest, 
// não encontrei solução para compatibilidade desse conteúdo.
//Modal.setAppElement('#root');

function CardContent({name, icon, link}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [lastView, setLastView] = useState([])

  function openModal() { 
    setIsOpen(true);

    let cardStorage = { nameStorage: name, iconStorege: icon };
    let storageContent = JSON.parse(localStorage.getItem('storageContent') || '[]');
    storageContent?.find((item, index) => {
      if(item?.nameStorage === cardStorage?.nameStorage){
        storageContent.splice(index, 1)
      }
      return false
    })
    storageContent.push(cardStorage);

    localStorage.setItem("storageContent", JSON.stringify(storageContent));
    setLastView(storageContent.slice(-3))

  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <a href="#openModal" className="cardContent" onClick={openModal}>
        <img className="cardIcon" src={icon} alt="toolIcon"/>
        <p className="cardName">{name.toUpperCase()}</p> 
      </a>

      <Modal
          className="modal"
          overlayClassName="modal-overlay"
          id="openModal"
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Pluga Tools"
          ariaHideApp={false}
        >
          <div className="modalContent">
            <button className="closeModal" onClick={closeModal}>X</button>
            <div className="firstSectionContent">
              <div className="iconContent">
                <img className="cardIcon" src={icon} alt="toolIcon"/> 
              </div>
              <div>
                <p className="cardName">{name.toUpperCase()}</p>
                <div className="linkButton">
                  <a href={link}>ACESSAR</a>
                </div>
              </div>
            </div>
            <h4>ÚLTIMAS FERRAMENTAS VISUALIZADAS</h4>
            <div className="lastViewContent" >
              {lastView.map((element) => {
                return (
                  <div className="lastView" key={element?.app_id}>
                    <img className="cardIcon" src= {element?.iconStorege} alt="toolIcon"/>
                    <p className="cardName">{element?.nameStorage?.toUpperCase()}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </Modal>
    </>
  );
}

export default CardContent;
