const elementIntersectsXAxis = (element1: Element, element2: Element) => {
	const rect1 = element1.getBoundingClientRect();
	const rect2 = element2.getBoundingClientRect();
	if (!(rect1.right < rect2.left || rect1.left > rect2.right)) return true;

	return false;
};

export default elementIntersectsXAxis;
