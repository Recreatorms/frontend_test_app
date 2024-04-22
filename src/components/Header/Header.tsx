import React, { useCallback, useEffect, useState } from "react";

import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";

import { changeSearchStr, setUsers, useAppDispatch } from "~/reduxStore/slices/userSlice";

import { loadUsers } from "~/http/loadUsers";

import { useDebounce } from "~/utils";

import styles from "./Header.module.scss";

const Header = () => {
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(false);
	const handleRefreshUsers = useCallback(() => {
		setLoading(true);
		loadUsers()
			.then((newUsers) => dispatch(setUsers(newUsers)))
			.finally(() => setLoading(false));
	}, [dispatch]);

	const [searchStr, setSearchStr] = useState("");

	const handleSearchChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => setSearchStr(e.target.value),
		[]
	);

	const debouncedStr = useDebounce(searchStr, 300);
	useEffect(() => {
		if (!searchStr?.length) return;
		dispatch(changeSearchStr(searchStr));
	}, [dispatch, debouncedStr]);

	return (
		<header className={styles.header}>
			<TextField
				className={styles.headerSearch}
				sx={{
					background: "#1E2027",
					"& .MuiInputBase-root": {
						borderRadius: "1rem",
					},
					"& input": {
						color: !searchStr?.length ? "#c8c8c8" : "#dcd8d3",
					},
				}}
				placeholder="Search"
				value={searchStr}
				onChange={handleSearchChange}
			/>
			<Button
				className={styles.headerRefresh}
				onClick={handleRefreshUsers}
				disabled={loading}
			>
				Refresh Users
			</Button>
			<Backdrop
				sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={loading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</header>
	);
};

export default Header;
