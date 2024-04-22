/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback } from "react";

import {
	removeUser,
	selectCard,
	useAppDispatch,
	useAppSelector,
} from "~/reduxStore/slices/userSlice";

import { formatDate } from "~/utils";

import type { User } from "~/types";

import Trash from "~/assets/trash_icon.svg";

import commonStyles from "~/common.module.scss";

import styles from "./Card.module.scss";

const Card = ({ user }: { user?: User }) => {
	const { selectedCardId } = useAppSelector((state) => state.user);

	const isSelected = user?.login?.uuid === selectedCardId;

	const dispatch = useAppDispatch();

	const handleRemoveCard = useCallback(
		(e) => {
			e.stopPropagation();
			dispatch(removeUser(user?.login?.uuid));
		},
		[dispatch, user?.login?.uuid]
	);

	const handleClick = useCallback(
		(e) => {
			e.stopPropagation();
			dispatch(selectCard(user?.login?.uuid));
		},
		[dispatch, user?.login?.uuid]
	);
	if (!user) return <div className={styles.cardSkeleton} />;
	return (
		<div
			className={isSelected ? `${styles.card} ${styles.cardClicked}` : styles.card}
			onClick={handleClick}
		>
			<div className={styles.cardMainInfo}>
				<img
					src={user.picture.thumbnail}
					alt="user-pic"
				/>
				<div className={styles.cardMainInfoName}>
					<h1>{`${user.name.first} ${user.name.last}`}</h1>
					<p>{user.email}</p>
				</div>
			</div>
			<div className={styles.cardOtherInfo}>
				<div className={styles.cardOtherInfoColumnLabel}>
					<p className={commonStyles.accent}>Phone No</p>
					<p className={commonStyles.accent}>Birthday</p>
					<p className={commonStyles.accent}>Address</p>
				</div>
				<div className={styles.cardOtherInfoColumnInfo}>
					<p>{user.phone}</p>
					<p>{formatDate(new Date(user.dob.date))}</p>
					<p>{`${user.location.city}, ${user.location.state}, ${user.location.country}`}</p>
				</div>
			</div>
			<button
				className={
					isSelected
						? `${styles.card} ${styles.cardClickedRemoveButton}`
						: styles.cardRemoveButton
				}
				onClick={handleRemoveCard}
			>
				<Trash />
			</button>
		</div>
	);
};

export default React.memo(Card);
