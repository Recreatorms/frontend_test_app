import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "~/reduxStore/store";

import { loadUsers } from "~/http/loadUsers";

import type { User } from "~/types";

export interface UserStorage {
	users: User[];
	searchStr: string;
	selectedCardId: User["login"]["uuid"];
}

const initialState: UserStorage = {
	users: null,
	searchStr: null,
	selectedCardId: null,
};

export const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		setUsers: (state, action: PayloadAction<User[]>) => {
			return {
				...state,
				users: action.payload,
			};
		},
		removeUser: (state, action: PayloadAction<User["login"]["uuid"]>) => {
			if (!action.payload) return state;
			const newUsers = state.users.filter((user) => user.login.uuid !== action.payload);
			return { ...state, users: newUsers };
		},
		changeSearchStr: (state, action: PayloadAction<string>) => {
			if (!action.payload) return state;
			return { ...state, searchStr: action.payload };
		},
		selectCard: (state, action: PayloadAction<User["login"]["uuid"]>) => {
			if (!action.payload) return state;
			if (state.selectedCardId === action.payload) return { ...state, selectedCardId: null };
			return { ...state, selectedCardId: action.payload };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUsersAsync.pending, () => {
				// console.log("getUsersAsync.pending");
			})
			.addCase(getUsersAsync.fulfilled, (state, action) => {
				// console.log("getUsersAsync.fulfilled", action.payload);
				state.users = action.payload;
			});
	},
});

export const getUsersAsync = createAsyncThunk(
	"users/getUsersAsync",
	async (numberOfUsers: number) => {
		return await loadUsers(numberOfUsers);
	}
);

export const { setUsers, removeUser, changeSearchStr, selectCard } = userSlice.actions;
export const userReducer = userSlice.reducer;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
