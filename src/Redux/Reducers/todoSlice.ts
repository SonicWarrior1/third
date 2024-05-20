import { createSlice } from "@reduxjs/toolkit";

function nextTodoId(todos: todoType[]) {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
    return maxId + 1
}
export type todoType = { id: number, text: string, completed: boolean, color?: string }
export type filterType = { status: "All" | "Active" | "Completed", colors: string[] };

const initialState: { todos: todoType[], filters: filterType } = {
    todos: [], filters: { status: 'All', colors: [] }
}

// export default function TodoReducer(state = initialState, action: { type: string, payload?: string | number | { id: number, color: string } | string[] }) {
//     switch (action.type) {
//         case 'todos/TodoAdded': {
//             return {
//                 ...state,
//                 todos: [...state.todos, { id: nextTodoId(state.todos), text: action.payload, completed: false }]
//             }
//         }
//         case 'todos/TodoToggled': {
//             return {
//                 ...state,
//                 todos: state.todos.map(todo => {
//                     if (todo.id !== action.payload) {
//                         return todo;
//                     }
//                     return {
//                         ...todo,
//                         completed: !todo.completed
//                     }
//                 })
//             }
//         }
//         case 'todos/TodoDelete': {
//             return {
//                 ...state,
//                 todos: state.todos.filter(todo => { if (todo.id !== action.payload) { return todo } })
//             }
//         }
//         case 'todos/TodoAllCompleted': {
//             return {
//                 ...state,
//                 todos: state.todos.map(todo => {
//                     return {
//                         ...todo,
//                         completed: true
//                     }
//                 })
//             }
//         }
//         case 'todos/TodoClearCompleted': {
//             return {
//                 ...state,
//                 todos: state.todos.filter(todo => !todo.completed)
//             }
//         }
//         case 'todos/TodoAddColor': {
//             return {
//                 ...state,
//                 todos: state.todos.map((todo) => {
//                     const payload = action.payload as { id: number, color: string };
//                     if (todo.id !== payload.id) {
//                         return todo;
//                     }
//                     return {
//                         ...todo, color: payload.color
//                     }
//                 })

//             }
//         }
//         case 'todos/AddColorFilter': {
//             return {
//                 ...state,
//                 filters: { ...state.filters, colors: state.filters.colors.includes(action.payload as string) ? state.filters.colors : [...state.filters.colors, action.payload] }
//             }
//         }
//         case 'todos/RemoveColorFilter': {
//             return {
//                 ...state,
//                 filters: {
//                     ...state.filters, colors: state.filters.colors.filter((color) => {
//                         if (color === action.payload) {
//                             return false;
//                         }
//                         return true;
//                     })
//                 }
//             }
//         }
//         case 'todos/ChangeTodoStatus': {
//             return {
//                 ...state,
//                 filters: { ...state.filters, status: action.payload }
//             }
//         }
//         default:
//             return state;
//     }
// }

// const TodoReducer = createReducer(initialState, (builder) => {
//     builder.addCase('todos/TodoAdded', (state, action) => {
//         return {
//             ...state,
//             todos: [...state.todos, { id: nextTodoId(state.todos), text: action.payload, completed: false }]
//         }
//     })
//         .addCase('todos/TodoToggled', (state, action) => {
//             return {
//                 ...state,
//                 todos: state.todos.map(todo => {
//                     if (todo.id !== action.payload) {
//                         return todo;
//                     }
//                     return {
//                         ...todo,
//                         completed: !todo.completed
//                     }
//                 })
//             }
//         })
//         .addCase('todos/TodoDelete', (state, action) => {
//             return {
//                 ...state,
//                 todos: state.todos.filter(todo => { if (todo.id !== action.payload) { return true } })
//             }
//         })
//         .addCase('todos/TodoAllCompleted', (state, action) => {
//             return {
//                 ...state,
//                 todos: state.todos.map(todo => {
//                     return {
//                         ...todo,
//                         completed: true
//                     }
//                 })
//             }
//         })
//         .addCase('todos/TodoClearCompleted', (state, action) => {
//             return {
//                 ...state,
//                 todos: state.todos.filter(todo => !todo.completed)
//             }
//         }
//         )
//         .addCase('todos/TodoAddColor', (state, action) => {
//             return {
//                 ...state,
//                 todos: state.todos.map((todo) => {
//                     const payload = action.payload as { id: number, color: string };
//                     if (todo.id !== payload.id) {
//                         return todo;
//                     }
//                     return {
//                         ...todo, color: payload.color
//                     }
//                 })

//             }
//         }
//         )
//         .addCase('todos/AddColorFilter', (state, action) => {
//             return {
//                 ...state,
//                 filters: { ...state.filters, colors: state.filters.colors.includes(action.payload as string) ? state.filters.colors : [...state.filters.colors, action.payload] }
//             }
//         })
//         .addCase('todos/RemoveColorFilter', (state, action) => {
//             return {
//                 ...state,
//                 filters: {
//                     ...state.filters, colors: state.filters.colors.filter((color) => {
//                         if (color === action.payload) {
//                             return false;
//                         }
//                         return true;
//                     })
//                 }
//             }
//         })
//         .addCase('todos/ChangeTodoStatus', (state, action) => {
//             return {
//                 ...state,
//                 filters: { ...state.filters, status: action.payload }
//             }
//         })
//         .addDefaultCase((state, action) => {
//             return state;
//         })
// })

const todoSlice = createSlice({
    name: "todo",
    initialState: initialState,
    reducers: {
        todoAdded(state, action) {
            state.todos.push({
                id: nextTodoId(state.todos),
                text: action.payload,
                completed: false
            })
        },
        todoToggle(state, action) {
            state.todos = state.todos.map(todo => {
                if (todo.id !== action.payload) {
                    return todo;
                }
                todo.completed = !todo.completed
                return todo;
            })
        },
        todoDelete(state, action) {
            state.todos = state.todos.filter(todo => {
                if (todo.id !== action.payload) {
                    return true;
                }
            })
        },
        todoAllComplete(state) {
            state.todos.forEach((todo) => {
                todo.completed = true;
            })
        },
        todoClearComplete(state) {
            state.todos = state.todos.filter((todo) => !todo.completed)
        },
        todoAddColor(state, action) {
            state.todos = state.todos.map((todo) => {
                if (todo.id !== action.payload.id) {
                    return todo;
                }
                todo.color = action.payload.color
                return todo;
            })
        },
        todoAddColorFilter(state, action) {
            if (!state.filters.colors.includes(action.payload)) {
                state.filters.colors.push(action.payload);
            }
        },
        todoRemoveColorFilter(state, action) {
            state.filters.colors = state.filters.colors.filter((color) => color !== action.payload)
        },
        todoChangeTodoStatus(state, action) {
            state.filters.status = action.payload
        }
    }
})
export default todoSlice.reducer
export const { todoAdded, todoToggle, todoDelete, todoAllComplete, todoClearComplete, todoAddColor, todoAddColorFilter, todoRemoveColorFilter,todoChangeTodoStatus } = todoSlice.actions;
// export default TodoReducer