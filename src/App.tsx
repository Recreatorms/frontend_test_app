import React, { useEffect } from "react";

import { getUsersAsync, useAppDispatch } from "~/reduxStore/slices/userSlice";

import Grid from "~/components/Grid/Grid";
import Header from "~/components/Header/Header";
import Sidebar from "~/components/Sidebar/Sidebar";

import styles from "~/common.module.scss";

function App() {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getUsersAsync(500));
	}, [dispatch]);

	return (
		<div className={styles.app}>
			<Header />
			<main className={styles.appMain}>
				<Grid />
				<Sidebar />
			</main>
		</div>
	);
}

export default React.memo(App);
