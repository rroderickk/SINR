import React from 'react';

/**
 * It takes a function that returns a @promise , and returns an @object with
 * @data | @loading  | @error -> properties <-
 * @returns An object with three properties: -> data, loading, and error. <-
 */
const FETCH = 'FETCH';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';
const PATCH = 'PATCH';


/**
 * If the action type is FETCH, return a new state object with loading set to true and error set to
 * null. If the action type is SUCCESS, return a new state object with data set to the payload and
 * loading set to false. If the action type is ERROR, return a new state object with error set to the
 * payload and loading set to false. If the action type is anything else, throw an error.
 * @returns The state is being returned.
 */
function reducer(state, action = {}) {
  switch (action.type) {
    case FETCH:
      return { ...state, loading: true, error: null };
    case SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      throw new Error('Unexpected action type.');
  }
}


/**
 * It takes a function that returns a promise, and returns an object with data, loading, and error * properties
 * @returns The return value is an object with three properties: 
 * @data
 * @loading
 * @error
 */
export function useQuery(query) {
  const [state, dispatch] = React.useReducer(reducer, {
    data: undefined,
    loading: true,
    error: null,
  });

  async function fetchData() {
    dispatch({ type: FETCH });
    try {
      const data = await query();
      dispatch({ type: SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ERROR, payload: error });
    }
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
  };
}


/**
 * UseAxios is a function that returns a promise that resolves to the
 * @data from the @API call
 * @returns the @setData function.
 */
// import { useState } from "react";
// import axios from "axios";
// const API_URL = "https://jsonplaceholder.typicode.com/todos/";

// export const useAxios = async() => {
// 	const [data, setData] = useState([]);

// 	React.useEffect( async()=> {
// 		const response = await axios.get(API_URL);
// 		if (!response.data) throw new Error("No hubo respuesta");
// 		console.log(response.data);
// 		setData(response.data)
// 	},[])

//   return [data, setData]
// };

