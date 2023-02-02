import { Overlay, Window } from "./Modal.styled"
import {createPortal} from 'react-dom'

const modalRoot = document.querySelector('#root-modal');

export const Modal = ({img}) => {
  console.log('modal', img)
  return createPortal(
    <Overlay>
      <Window>
        <img src={img.largeImageURL} alt={img.tags} />
      </Window>
    </Overlay>
    ,modalRoot
  )
}

