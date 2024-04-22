import { useEffect, useState } from "react";

export const formatDate = (date) => {
	// Массивы для названий месяцев и соответствующих им значений
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	// Получаем день, месяц и год из объекта Date
	const day = date.getDate();
	const monthIndex = date.getMonth();
	const year = date.getFullYear();

	// Формируем строку в нужном формате
	const formattedDate = `${day} ${months[monthIndex]} ${year}`;

	return formattedDate;
};

export const useDebounce = (value: any, timeout: number) => {
	const [state, setState] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => setState(value), timeout);
		return () => clearTimeout(handler);
	}, [value, timeout]);

	return state;
};
