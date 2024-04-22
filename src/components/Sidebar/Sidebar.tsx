import React, { useMemo } from "react";

import { useAppSelector } from "~/reduxStore/slices/userSlice";

import type { User } from "~/types";

import commonStyles from "~/common.module.scss";

import styles from "./Sidebar.module.scss";

function getAgeGroups(users: User[]): Record<string, User[]> {
	const groupedUsers: Record<string, User[]> = {};

	// Проходимся по каждому пользователю
	users.forEach((user) => {
		const ageGroup = Math.floor(user.dob.age / 10) * 10 + 1; // Вычисляем интервал возраста

		// Формируем название группы
		const groupName = ageGroup >= 51 ? `51+` : `${ageGroup} to ${ageGroup + 9}`;

		// Если группы для данного интервала еще нет, создаем ее
		if (!groupedUsers[groupName]) {
			groupedUsers[groupName] = [];
		}

		// Добавляем пользователя в соответствующую группу
		groupedUsers[groupName].push(user);
	});

	return groupedUsers;
}

function getGenderGroupsNumber(arr: User[], gender: User["gender"]) {
	return arr.filter((u) => u.gender === gender)?.length;
}

const Sidebar = () => {
	const { users } = useAppSelector((s) => s.user);
	const info = useMemo(() => {
		if (!users) return null;
		return {
			ageGroups: getAgeGroups(users),
			genderGroups: {
				male: getGenderGroupsNumber(users, "male"),
				female: getGenderGroupsNumber(users, "female"),
			},
		};
	}, [users]);

	return (
		<aside className={styles.sidebarWrapper}>
			{info ? (
				<div className={styles.sidebar}>
					<h1>{users.length} Users</h1>
					<div className={styles.sidebarLine} />
					<ul className={styles.sidebarGroup}>
						<h2>Age groups</h2>
						<div className={styles.sidebarGroupTable}>
							<ul>
								{Object.entries(info.ageGroups)
									.sort(([a], [b]) => a.localeCompare(b))
									.map(([label], index) => (
										<li key={index}>
											<p className={commonStyles.accent}>{label}</p>
										</li>
									))}
							</ul>
							<ul>
								{Object.entries(info.ageGroups)
									.sort(([a], [b]) => a.localeCompare(b))
									// eslint-disable-next-line @typescript-eslint/no-unused-vars
									.map(([_, users], index) => (
										<li key={index}>
											<p>{`${users.length} user${
												users.length > 1 ? "s" : ""
											}`}</p>
										</li>
									))}
							</ul>
						</div>
					</ul>
					<div className={styles.sidebarLine} />
					<ul className={styles.sidebarGroup}>
						<h2>Gender groups</h2>
						<div className={styles.sidebarGroupTable}>
							<ul>
								{Object.entries(info.genderGroups).map(([label], index) => (
									<li key={index}>
										<p className={commonStyles.accent}>{label}</p>
									</li>
								))}
							</ul>
							<ul>
								{Object.entries(info.genderGroups)
									// eslint-disable-next-line @typescript-eslint/no-unused-vars
									.map(([_, value], index) => (
										<li key={index}>
											<p>{`${value} user${value > 1 ? "s" : ""}`}</p>
										</li>
									))}
							</ul>
						</div>
					</ul>
				</div>
			) : (
				<div
					className={styles.sidebar}
					style={{ height: "100%" }}
				/>
			)}
		</aside>
	);
};

export default React.memo(Sidebar);
