/* eslint-disable no-console */

const colors = {
	Reset: '\x1b[0m',
	Red: '\x1b[31m',
	Green: '\x1b[32m',
	Yellow: '\x1b[33m',
	Blue: '\x1b[34m',
	Magenta: '\x1b[35m'
};

export const success = (message, object) => {
	if (object) { console.log(colors.Green, message, colors.Reset, object); } else { console.log(colors.Green, message, colors.Reset); }
};

export const error = (message, object) => {
	if (object) { console.log(colors.Red, message, colors.Reset, object); } else { console.log(colors.Red, message, colors.Reset); }
};

export const warn = (message, object) => {
	if (object) { console.log(colors.Yellow, message, colors.Reset, object); } else { console.log(colors.Yellow, message, colors.Reset); }
};

export const log = (message, object) => {
	if (object) { console.log(message, object); } else { console.log(message); }
};

export const info = (message, object) => {
	if (object) { console.log(colors.Blue, message, colors.Reset, object); } else { console.log(colors.Blue, message, colors.Reset); }
};
