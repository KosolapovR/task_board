import React, {Component} from "react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {connect} from "react-redux";
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";
import ListFooter from "../components/ListFooter";
import EditTaskModal from "./EditTaskModal";
import {changeTaskStatus} from "../state/task_board/actions";
import LinesEllipsis from 'react-lines-ellipsis'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#0C7CD5"
        },
        secondary: {
            main: "#626262",
            light: "#333333"
        }
    }
});

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
    userSelect: "none",
    padding: "8px 12px",
    margin: `0 0 ${grid}px 0`,
    color: "#212934",
    boxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height: 'content-fit',
    // change background colour if dragging
    background: isDragging ? "#C7F1FF" : "#FFFFFF",
    boxShadow: isDragging
        ? "0px 1px 1px rgba(0, 0, 0, 0.25), 0px 2px 4px rgba(0, 0, 0, 0.25)"
        : "0px 1px 1px rgba(0, 0, 0, 0.25)",

    ...draggableStyle
});
const getListStyle = isDraggingOver => ({
    height: "fit-content",
    background: "#D4D4D4",
    padding: grid,
    width: "300px",
    borderRadius: "5px"
});

class TaskBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            selected: [],
            res: [],
            modalVisible: false,
            modalItem: {},
            addTaskInWork: false,
            addTaskOnCheck: false,
            addTaskCompleted: false
        };
    }

    componentDidMount() {
        this.setState({
            items: this.props.inWork,
            selected: this.props.onCheck,
            res: this.props.completed,
            modalVisible: false
        });
    }

    id2List = {
        droppable: "items",
        droppable2: "selected",
        droppable3: "res"
    };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const {source, destination} = result;

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

    componentDidUpdate(prevProps, prevState) {

        if (
            prevProps.inWork.length !== this.props.inWork.length ||
            prevProps.onCheck.length !== this.props.onCheck.length ||
            prevProps.completed.length !== this.props.completed.length
        ) {
            this.setState({
                items: this.props.inWork,
                selected: this.props.onCheck,
                res: this.props.completed,
                modalVisible: false
            });
        }

        if (
            prevState.items.length !== this.state.items.length ||
            prevState.selected.length !== this.state.selected.length ||
            prevState.res.length !== this.state.res.length
        ) {
            this.props.updateTaskStatus({
                inWork: this.state.items,
                onCheck: this.state.selected,
                completed: this.state.res
            });
        }
    }

    showModal = editableItem => {
        this.setState({modalVisible: true});
        this.setState({modalItem: editableItem});
    };

    handleModalClose = () => {
        this.setState({modalVisible: false});
    };

    render() {
        return (
            <ThemeProvider theme={theme}>
                {this.state.modalVisible && (
                    <EditTaskModal
                        task={this.state.modalItem}
                        hideModal={() => {
                            this.handleModalClose();
                        }}
                    />
                )}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        maxWidth: "996px",
                        minWidth: "996px",
                        minHeight: "100vh",
                        margin: "0 auto",
                        padding: "37px 24px",
                        background: "#1D8B77"
                    }}
                >
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                >
                                    <h4>В работе</h4>
                                    {this.state.items.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                    onDoubleClick={() => {
                                                        this.showModal(item);
                                                    }}
                                                >
                                                    <LinesEllipsis
                                                        text={item.header}
                                                        maxLine='2'
                                                        ellipsis='...'
                                                        trimRight
                                                        basedOn='letters'
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                    <ListFooter type="inWork"/>
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
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                    onDoubleClick={() => {
                                                        this.showModal(item);
                                                    }}
                                                >
                                                    <LinesEllipsis
                                                        text={item.header}
                                                        maxLine='2'
                                                        ellipsis='...'
                                                        trimRight
                                                        basedOn='letters'
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                    <ListFooter type="onCheck"/>
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
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                    onDoubleClick={() => {
                                                        this.showModal(item);
                                                    }}
                                                >
                                                    <LinesEllipsis
                                                        text={item.header}
                                                        maxLine='2'
                                                        ellipsis='...'
                                                        trimRight
                                                        basedOn='letters'
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                    <ListFooter type="completed"/>
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </ThemeProvider>
        );
    }
}

const mapStateToProps = state => ({
    inWork: state.task_board.inWork,
    onCheck: state.task_board.onCheck,
    completed: state.task_board.completed
});

const mapDispatchToProps = dispatch => {
    return {
        updateTaskStatus: (tasks) => dispatch(changeTaskStatus(tasks))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskBoard);
