// My hooks by @CHEATMODES4 for React 18.0
// Project: http://github.io/rroderickk/
// Definitions by:  https://rroderickk.github.io/cv2
// _MyHooks_ Version: 0.1

// NOTE:
// to 'react/experimental' go to the project. -> in construction ....todo.....
import React, { useEffect } from 'react';


/**
 * It takes a function that returns a @promise , and returns an @object with
 * @data & @loading  & @error -> properties <-
 * @returns An object with three properties: -> data, loading, and error. <-
 */
	const FETCH = 'FETCH';
	const SUCCESS = 'SUCCESS';
	const ERROR = 'ERROR';

	/** ✅
	 * If the action type is FETCH, return a new state object with loading set to true and error set to
	 * null. If the action type is SUCCESS, return a new state object with data set to the payload and
	 * loading set to false. If the action type is ERROR, return a new state object with error set to the
	 * payload and loading set to false. If the action type is anything else, throw an error.
	 *  -  @returns The state is being returned.
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




	/** ✅
	 * It takes a @function<- that returns a promise, and returns an @object with data, loading, and error * properties
	 * @returns The return value is an object with three properties: 
	 *  @> {data ,  loading, error}
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
	};




	/** 💩 <- @Deprecated but still working.
	 * UseAxios is a function that returns a promise that resolves to the
	 *  - @data from the
	 *  - @API call
	 *  - @returns the @setData function.
	 */
	// import { useState } from 'react';
	// import axios from 'axios';
	// const API_URL = 'https://jsonplaceholder.typicode.com/todos/';

	// export const useAxios = async() => {
	// 	const [data, setData] = useState([]);

	// 	React.useEffect( async()=> {
	// 		const response = await axios.get(API_URL);
	// 		if (!response.data) throw new Error('No hubo respuesta');
	// 		console.log(response.data);
	// 		setData(response.data)
	// 	},[])

	//   return [data, setData];
	// };




	/** ❓
	 * If the browser supports localStorage, then it will return true, otherwise it will return false.
	 * @returns A function that returns a boolean.
	 */
	export function localStorageAvailable() {
		try {
			// Incognito mode might reject access to the localStorage for security reasons.
			// window isn't defined on Node.js
			// https://stackoverflow.com/questions/16427636/check-if-localstorage-is-available
			const key = '__some_random_key_you_are_not_going_to_use__';
			window.localStorage.setItem(key, key);
			window.localStorage.removeItem(key);
			return true;
		} catch (error) {
			return false;
		};
	};




	/** ✅
	 * fetches data from a @URL <-, @type <-
	 * indicating whether the data is loading.
	 * @> [response, data, isLoading];
	 * @Array with -> 3 <- elements.
	 */
	export function useFetch(url, type) {
		const [data, setData] = React.useState([]);
		const [response, setResponse] = React.useState(null);
		const [isLoading, setIsLoading] = React.useState(false);

		React.useEffect(() => {
			fetchData();
			async function fetchData() {
				try {
					setIsLoading(true);
					const response = await fetch(url)
					setResponse(response);

					switch(type){
						case 'text':
							const text = await response.text();
							setData(text);
							setIsLoading(false);
							break;
						case 'json':
							const json = await response.json();
							setData(json);
							setIsLoading(false);
							break;
						default:
					}
				} catch(error) {
					console.error(error);
					setIsLoading(false);
				}
			}
		},  [url]);

		return [response, data, isLoading];
	};




	/** ✅
	 * takes in an @array <- of data.
	 */
	export function usePost(data){
		const [post, setPost] = React.useState([]);

		useEffect(() => {
			try {
				// Log(Emoji.check, data)
				if(data) return setPost(post.concat(data));
			} catch (error) {
					console.log('Error parsing JSON:', error, data);
			}
		},[data])

		// Log(Emoji.bomb, post);
		return post;
	};




	/** 🗒
	 * takes an argument and tries to test it.
	 * if it fails it will log the error to the console.
	 */
	export function ErrorCatcher(test){
		try {
			// if (typeof test === 'function') test();
			// if (typeof test === 'object') test.map(item => item);
			// todo
		} catch (error) {
			console.error('[🚩] ErrorCatcher [🚩]', error.name, error.message, error.stack);
		}
	};


	/** 🤖
	 * takes an @argument<- and logs it to the console.
	 * @> @option <-
	 * @> {@event} <-
	 */
	export function Log(o=null, e, l='🤖'){
		!o ?  console.log(l, e)
				: 	console.log(l, o, e);
	};


	/** ✅
	 * It @returns the current date in the format of "Day, Month Date, Year"
	 * @> date -> Sat Jun 11 2022 06:10:41
	 */
	export function getDate(){
		// return new Date().toLocaleDateString();
		return (Date()).toString().slice(0,25)
	}


	/** 💩 <- @Deprecated but it's a model.
	 * Fetching data from the API. */
	// React.useEffect(() => {
	// 	axios
	// 		.get(endpoint.POSTS)
	// 		.then(post=> setArrayData(post.data))
	// },[]);


	/**
	 * #### Emojis that I use to log to the console -> smile 😀 check ✅, cross ❌
	 * @> loading 🔄
	 * @> error: 🚩
	 * @> info: ℹ️ 
	 * @> deprecated: 💩
	 //todo....
	 * warning: '⚠️', * error: '🛑', info: 'ℹ️', question: '❓', *	exclamation: '❗', robot: '🤖', deploy: '🚀', *	bug: '🐛', code: '💻', git: '🐙', *	lol: '😂', not_working: '🚫', todo: '💡', *	task: '🗒', fake: '🤔', bad: '💀', *	good: '💯', nice: '🙌', very_nice: '🤗', *	very_good: '🤩', glass: '🍺', cheers: '🎉', *	thumbsup: '👍', thumbsdown: '👎', thumbsupdown: '👆', *	thumbsupdown2: '👇', thumbsupdown3: '👈', thumbsupdown4: '👉', *	thumbsupdown5: '👊', thumbsupdown6: '👋', flag: '🚩', bomb: '💣',
	 */
	export const Emoji = {
	/**
	 //todo....
	 */
	/** 😀 */
		smile: '😀',

	/** ✅ */
		check: '✅',

	/** ❌ */
		cross: '❌',
		loading: '🔄',

	/** 💩 */
		deprecated: '💩',
		trash: '🗑',
		warning: '⚠️',
		error: '🛑',
		info: 'ℹ️',

	/** ❓ */
		question: '❓',
		exclamation: '❗',

	/** 🤖 */
		robot: '🤖',

		deploy: '🚀',
		bug: '🐛',
		code: '💻',
		git: '🐙',
		lol: '😂',
		not_working: '🚫',
		todo: '💡',
		task: '🗒',
		fake: '🤔',
		bad: '💀',
		good: '💯',
		nice: '🙌',
		very_nice: '🤗',
		very_good: '🤩',
		glass: '🍺',
		cheers: '🎉',
		thumbsup: '👍',
		thumbsdown: '👎',
		thumbsupdown: '👆',
		thumbsupdown2: '👇',
		thumbsupdown3: '👈',
		thumbsupdown4: '👉',
		thumbsupdown5: '👊',
		thumbsupdown6: '👋',
		flag: '🚩',

	/** 💣 */
		bomb: '💣',
	};
