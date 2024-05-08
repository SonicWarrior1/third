import { createStore } from "redux";
export type todoType = { id: number, text: string, completed: boolean, color?: string }
export type filterType = { status: "All" | "Active" | "Completed", colors: string[] };
function nextTodoId(todos: todoType[]) {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
    return maxId + 1
}

const initialState: { todos: todoType[], filters: filterType } = {
    todos: [], filters: { status: 'All', colors: [] }
}

function TodoReducer(state = initialState, action: { type: string, payload: string | number | { id: number, color: string } | string[] }) {
    switch (action.type) {
        case 'todos/TodoAdded': {
            console.log(state)
            return {
                ...state,
                todos: [...state.todos, { id: nextTodoId(state.todos), text: action.payload, completed: false }]
            }
        }
        case 'todos/TodoToggled': {
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.id !== action.payload) {
                        return todo;
                    }
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                })
            }
        }
        case 'todos/TodoDelete': {
            return {
                ...state,
                todos: state.todos.filter(todo => { if (todo.id !== action.payload) { return todo } })
            }
        }
        case 'todos/TodoAllCompleted': {
            return {
                ...state,
                todos: state.todos.map(todo => {
                    return {
                        ...todo,
                        completed: true
                    }
                })
            }
        }
        case 'todos/TodoClearCompleted': {
            return {
                ...state,
                todos: state.todos.filter(todo => !todo.completed)
            }
        }
        case 'todos/addColorFilter': {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    colors: [...state.filters.colors, ...(action.payload as string[])]
                }
            }
        }
        case 'todos/TodoAddColor': {
            return {
                ...state,
                todos: state.todos.map((todo) => {
                    const payload = action.payload as { id: number, color: string };
                    if (todo.id !== payload.id) {
                        return todo;
                    }
                    return {
                        ...todo, color: payload.color
                    }
                })

            }
        }
        case 'todos/AddColorFilter': {
            return {
                ...state,
                filters: { ...state.filters, colors: state.filters.colors.includes(action.payload as string) ? state.filters.colors : [...state.filters.colors, action.payload] }
            }
        }
        case 'todos/RemoveColorFilter': {
            return {
                ...state,
                filters: {
                    ...state.filters, colors: state.filters.colors.filter((color) => {
                        if (color === action.payload) {
                            return false;
                        }
                        return true;
                    })
                }
            }
        }
        case 'todos/ChangeTodoStatus': {
            return {
                ...state,
                filters: { ...state.filters, status: action.payload }
            }
        }
        default:
            return state;
    }
}
const store = createStore(TodoReducer)

export type RootState = ReturnType<typeof store.getState>

export { store };