import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

const DragAndDropContext = ({ children }) => {
    return (

        <DndProvider backend={HTML5Backend}>
            {children}
        </DndProvider>

    );
};

export default DragAndDropContext;