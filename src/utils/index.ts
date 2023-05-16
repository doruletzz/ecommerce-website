// export const includesObj = <T extends Object>(
// 	arr: Array<T>,
// 	obj: T
// ): boolean => {
// 	const keys = Object.keys(obj);

// 	return (
// 		arr.filter((arrObj) => {
// 			console.log(
// 				'comparing',
// 				keys,
// 				arrObj,
// 				obj,
// 				isDeepEqual<T>(arrObj, obj)
// 			);
// 			return isDeepEqual<T>(arrObj, obj);
// 		}).length > 0
// 	);
// };

// const isDeepEqual = <T extends Object>(obj1: T, obj2: T) => {
// 	const objKeys1 = Object.keys(obj1) as Array<keyof typeof obj1>;
// 	const objKeys2 = Object.keys(obj2) as Array<keyof typeof obj1>;

// 	if (objKeys1.length !== objKeys2.length) return false;

// 	for (var key of objKeys1) {
// 		const value1 = obj1[key];
// 		const value2 = obj2[key];

// 		if (
// 			(isObject(value1) &&
// 				isObject(value2) &&
// 				!isDeepEqual(value1, value2)) ||
// 			(!isObject(value1) && isObject(value2) && value1 !== value2)
// 		) {
// 			return false;
// 		}
// 	}
// 	return true;
// };

// const isObject = (object: any) => {
// 	return object != null && typeof object === 'object';
// };
