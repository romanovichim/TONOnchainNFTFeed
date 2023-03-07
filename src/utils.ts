/*
export function createItems1(length = 1): JSONData {
	//console.log(getRandom(items, 10));
	//Array.from({ length }).map(() => uuidv4())
	return getRandom(items, 3);
}

export const loadMore1 = async (length = 1): Promise<JSONData> =>
	new Promise((res) => setTimeout(() => res(createItems1(length)), 1));

*/
import * as React from 'react';
import items from './data/items.json';

export type JSONData = typeof items;

export function isMobile(): boolean {
	return window.innerWidth <= 500;
}

export function isDesktop(): boolean {
	return window.innerWidth >= 1050;
}

export function openLink(href: string, target = '_self') {
	window.open(href, target, 'noreferrer noopener');
}

//export const createItems = (length = 100): string[] => Array.from({ length }).map(() => uuidv4());

function getRandom(arr: any, n: any) {
	var result = new Array(n),
		len = arr.length,
		taken = new Array(len);
	if (n > len) throw new RangeError('getRandom: more elements taken than available');
	while (n--) {
		var x = Math.floor(Math.random() * len);
		result[n] = arr[x in taken ? taken[x] : x];
		taken[x] = --len in taken ? taken[len] : len;
	}
	return result;
}

//const ARRAY_SIZE = 10;
const RESPONSE_TIME_IN_MS = 1000;

/*
export interface Item {
	key: number;
	value: string;
}

interface Response {
	hasNextPage: boolean;
	data: Item[];
}

*/

interface Response {
	hasNextPage: boolean;
	data: JSONData;
}

export function createItems(): JSONData {
	//console.log(getRandom(items, 10));
	//Array.from({ length }).map(() => uuidv4())
	return getRandom(items, 10);
}

//export const genArr = async (): Promise<JSONData> =>
//	new Promise((res) => setTimeout(() => res(createItems()), 10));

function loadItems(startCursor = 0): Promise<Response> {
	return new Promise((resolve) => {
		//let newArray: JSONData[] = [];

		setTimeout(() => {
			/*
			for (let i = startCursor; i < startCursor + ARRAY_SIZE; i++) {
				const newItem = {
					key: i,
					value: `This is item ${i}`,
				};
				newArray = [...newArray, newItem];
			}
			*/
			let newArray = createItems();
			resolve({ hasNextPage: true, data: newArray });
		}, RESPONSE_TIME_IN_MS);
	});
}

export function useLoadItems() {
	const [loading, setLoading] = React.useState(false);
	const [items, setItems] = React.useState<JSONData>([]);
	const [hasNextPage, setHasNextPage] = React.useState<boolean>(true);
	const [error] = React.useState<Error>();

	async function loadMore() {
		setLoading(true);
		try {
			const { data, hasNextPage: newHasNextPage } = await loadItems(items.length);
			setItems((current) => [...current, ...data]);
			setHasNextPage(newHasNextPage);
		} catch (err) {
			//setError();
		} finally {
			setLoading(false);
		}
	}

	return { loading, items, hasNextPage, error, loadMore };
}
