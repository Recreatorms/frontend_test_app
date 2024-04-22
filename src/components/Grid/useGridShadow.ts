import { useEffect, useRef } from "react";

import styles from "./GridShadow.module.scss";

export const useGridShadow = () => {
	const gridRef = useRef(null);
	const wrapperRef = useRef(null);

	useEffect(() => {
		const gridElement = gridRef.current;
		const scrollElement = wrapperRef.current;
		if (!gridElement || !scrollElement) return;

		const shadowWrap = document.createElement("div");
		shadowWrap.classList.add(styles.shadowWrapper);
		scrollElement.parentNode.insertBefore(shadowWrap, scrollElement);
		shadowWrap.appendChild(scrollElement);

		const updateShadow = () => {
			if (shadowWrap.offsetHeight < gridElement.offsetHeight) {
				shadowWrap.classList.add(styles.shadowWrapperBottom);
			} else {
				shadowWrap.classList.remove(styles.shadowWrapperBottom);
			}

			if (scrollElement.scrollTop > 0) {
				shadowWrap.classList.add(styles.shadowWrapperTop);
			} else {
				shadowWrap.classList.remove(styles.shadowWrapperTop);
			}

			if (
				scrollElement.scrollTop + scrollElement.offsetHeight >=
				scrollElement.scrollHeight
			) {
				shadowWrap.classList.remove(styles.shadowWrapperBottom);
			} else {
				shadowWrap.classList.add(styles.shadowWrapperBottom);
			}
		};

		scrollElement.addEventListener("scroll", updateShadow);

		return () => {
			scrollElement.removeEventListener("scroll", updateShadow);
		};
	}, []);

	return { gridRef, wrapperRef };
};
