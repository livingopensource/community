const color= "\x1b[1;35m";
//const underline= "\x1b[94;4m";
const normal= "\x1b[0m";
export const introMessage = [
	"+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+",
	"|                                                                             |",
	"| Living Open Source Foundation Linux Playground: WebVM 2.0                   |",
	"|                                                                             |",
	"+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+",
	""
];
export const errorMessage = [
	color + "CheerpX could not start" + normal,
	"",
	"CheerpX is expected to work with recent desktop versions of Chrome, Edge, Firefox and Safari",
	"",
	"Give it a try from a desktop version / another browser!",
	"",
	"CheerpX internal error message is:",
	""
];
export const unexpectedErrorMessage = [
	color + "WebVM encountered an unexpected error" + normal,
	"",
	"Check the DevTools console for further information",
	"",
	"Please consider reporting a bug!",
	"",
	"CheerpX internal error message is:",
	""
];
