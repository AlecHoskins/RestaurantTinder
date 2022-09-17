export const militaryTimeToStandardTime = (time) => {
	const firstHalf = time.substring(0, 2);
	const secondHalf = time.substring(2);
	let formattedFirstHalf = firstHalf;
	let amPm = "AM";
	if (firstHalf === "24" || firstHalf === "00") {
		formattedFirstHalf = 12;
	} else if (firstHalf > 12) {
		formattedFirstHalf = (firstHalf % 12);
		amPm = "PM";
	} else if (firstHalf === 12) {
		amPm = "PM";
	}
	if (firstHalf < 10 && formattedFirstHalf !== 12) {
		formattedFirstHalf = ("" + formattedFirstHalf).substring(1)
	}
	return formattedFirstHalf + ":" + secondHalf + " " + amPm;
}

export const numDayToString = (numDay) => {
	switch(numDay) {
		case 0:
			return "Mon";
		case 1:
			return "Tue";
		case 2:
			return "Wed";
		case 3:
			return "Thu";
		case 4:
			return "Fri";
		case 5:
			return "Sat";
		case 6:
			return "Sun";
		default:
			return "";
	}
}

export const timeToUnix = (time = new Date()) => {
	return Math.floor(time.getTime() / 1000);
}