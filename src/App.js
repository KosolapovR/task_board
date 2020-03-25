import React, {Component} from "react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import './app.css'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import ListFooter from "./components/ListFooter";

const theme = createMuiTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: '#0C7CD5',
        },
        secondary: {
            main: '#626262',
            light: '#333333'
        }
    },
});


// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({length: count}, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 12;

const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: '8px 12px',
        margin: `0 0 ${grid}px 0`,
        color: '#212934',

        // change background colour if dragging
        background: isDragging ? "#C7F1FF" : "#FFFFFF",
        boxShadow: isDragging
            ? '0px 1px 1px rgba(0, 0, 0, 0.25), 0px 2px 4px rgba(0, 0, 0, 0.25)'
            : '0px 1px 1px rgba(0, 0, 0, 0.25)',

        // styles we need to apply on draggables
        ...draggableStyle
    })
;

const getListStyle = isDraggingOver => ({
    height: 'fit-content',
    background: "#D4D4D4",
    padding: grid,
    width: 300,
    borderRadius: '5px',
});

class App extends Component {
    state = {
        items: [{id: 'item-0', content: 'adsa'}, {id: 'item-1', content: 'adsa2'}],
        selected: getItems(5, 10),
        res: getItems(2, 15)
    };


    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        droppable: "items",
        droppable2: "selected",
        droppable3: "res"
    };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const {source, destination} = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = {items};

            if (source.droppableId === "droppable2") {
                state = {selected: items};
            }

            if (source.droppableId === "droppable3") {
                state = {res: items};
            }

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            if (
                source.droppableId !== "droppable" &&
                destination.droppableId !== "droppable"
            ) {
                this.setState({
                    selected: result.droppable2,
                    res: result.droppable3
                });
            } else if (
                source.droppableId !== "droppable2" &&
                destination.droppableId !== "droppable2"
            ) {
                this.setState({
                    items: result.droppable,
                    res: result.droppable3
                });
            } else if (
                source.droppableId !== "droppable3" &&
                destination.droppableId !== "droppable3"
            ) {
                this.setState({
                    items: result.droppable,
                    selected: result.droppable2
                });
            }
        }
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
            <ThemeProvider theme={theme}>
                <div style={{
                    display: "flex",
                    justifyContent: 'space-between',
                    maxWidth: '996px',
                    minHeight: '100vh',
                    margin: '0 auto',
                    padding: '37px 24px',
                    background: '#1D8B77'
                }}>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                >
                                    <h4>В работе</h4>
                                    {this.state.items.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                >
                                                    {item.content}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                    <ListFooter/>
                                </div>
                            )}
                        </Droppable>
                        <Droppable droppableId="droppable2">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                >
                                    <h4>На проверке</h4>
                                    {this.state.selected.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                >
                                                    {item.content}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                    <ListFooter/>
                                </div>
                            )}
                        </Droppable>

                        <Droppable droppableId="droppable3">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                >
                                    <h4>Выполнено</h4>
                                    {this.state.res.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                >
                                                    {item.content}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                    <ListFooter editMode={true}/>
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </ThemeProvider>
        );
    }
}

// Put the things into the DOM!
export default App;