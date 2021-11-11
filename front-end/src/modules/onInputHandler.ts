// interface InputProps {
//     event : React.ChangeEvent<HTMLSelectElement>;
//     state : any;
//     setState : (event : any) => void;
// }

// export const onInputHandler = (event, state, setState) => {
//     if(typeof(state) === "object") {
//         setState({...state, [event.target.name]: event.target.value});
//     }
//     else {
//         setState(event.target.value);
//     }
// } 