import IngredientStyles from './Ingredient.module.css';

import { useRef, FC, MouseEvent } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';

import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CHANGE_INGREDIENT_ORDER, DELETE_INGREDIENT } from '../../utils/constants';
import { TIngredientList } from '../../services/types/ingredients';

const Ingredient: FC<TIngredientList> = ({id, index}) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLLIElement>(null);

  const { ingredientsById } = useSelector(state => state.menu);  

  const moveItem = (prevIndex: number, newIndex: number) => {
    dispatch({type: CHANGE_INGREDIENT_ORDER, prevIndex, newIndex});
  }

  const handleDeleteIngredient = (e: MouseEvent<HTMLLIElement>) => {
    const targetElement = (e.target as HTMLLIElement).parentNode?.parentNode as HTMLElement;

    if (targetElement.classList.contains('constructor-element__action')) {
      dispatch({type: DELETE_INGREDIENT, index: e.currentTarget.id});
    }
  }

  const [, dropRef] = useDrop({
    accept: 'sortIngregient',

    hover(item: TIngredientList, monitor: DropTargetMonitor<TIngredientList>) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  })
  
  const [{ isDragging }, dragRef] = useDrag({
    type: 'sortIngregient',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => {
      return {      
        isDragging: monitor.isDragging(),
      }
    },
  })

  const opacity = isDragging ? 0 : 1;

  dragRef(dropRef(ref));
  return (
    <li id={index.toString()} draggable ref={ref} className={IngredientStyles.item + ' mb-4 mr-2'} style={{opacity}} onClick={handleDeleteIngredient}>
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={ingredientsById[id].name}
        price={ingredientsById[id].price}
        thumbnail={ingredientsById[id].image}
        />
    </li>
  );

}

export default Ingredient;
