import React, { useMemo } from "react";

import { useAppSelector } from "~/reduxStore/slices/userSlice";

import { formatDate } from "~/utils";

import Card from "~/components/Card/Card";
import { useGridShadow } from "~/components/Grid/useGridShadow";

import type { User } from "~/types";

import styles from "./Grid.module.scss";

const callback = (user: User, searchStr: string) => {
	const buf = searchStr?.replaceAll(/-|(|)/g, "").toLowerCase();
	return (
		user.name.first.toLowerCase().includes(buf) ||
		user.name.last.toLowerCase().includes(buf) ||
		user.email.toLowerCase().includes(buf) ||
		user.phone
			.replace(/-|\(|\)/g, "")
			.toLowerCase()
			.includes(buf) ||
		user.location.city.toLowerCase().includes(buf) ||
		user.location.state.toLowerCase().includes(buf) ||
		user.location.country.toLowerCase().includes(buf) ||
		formatDate(new Date(user.dob.date)).toLowerCase().includes(buf)
	);
};

const Grid = () => {
	const { gridRef, wrapperRef } = useGridShadow();

	const { users, searchStr } = useAppSelector((s) => s.user);

	const filteredUsers = useMemo(
		() =>
			users
				? [...users].sort((a, b) => {
						return callback(a, searchStr) && !callback(b, searchStr)
							? -1
							: !callback(a, searchStr) && callback(b, searchStr)
							? 1
							: 0;
				  })
				: null,
		[users, searchStr]
	);
	// Можно сделать и через react-virtualized Grid, но тогда размеры карточек уйдут сюда
	return (
		<div
			className={styles.gridWrapper}
			ref={wrapperRef}
		>
			<div
				className={styles.grid}
				ref={gridRef}
			>
				{filteredUsers
					? filteredUsers.map((user, index) => (
							<Card
								user={user}
								key={index}
							/>
					  ))
					: Array.from(Array(25)).map((_, index) => <Card key={index} />)}
			</div>
		</div>
	);
};

export default React.memo(Grid);
