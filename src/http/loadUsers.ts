import axios from "axios";

import type { User } from "~/types";

export const loadUsers = async (numberOfUsers = 500) => {
	try {
		const response = await axios.get(`https://randomuser.me/api/?results=${numberOfUsers}`);
		return response.data.results as User[];
	} catch (err) {
		console.log(err);
	}
};
