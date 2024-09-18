const Levels = {
	ERROR: 0,
	WARN: 1,
	INFO: 2,
	VERBOSE: 3
};
const LevelColors = [
	"#ff0000",
	"#ffff00",
	"#cccccc",
	"#ffffff"
];
class Logger {
	constructor(minLevel=WARN, loggingClass="LOGGER", loggingColor="#3f3f3f", include={loggedTime: true, loggedClass:true}) {
		this.minLevel = minLevel;
		this.loggingClass = loggingClass;
		this.loggingColor = loggingColor;
		this.includeTime = include.loggedTime;
		this.includeClass = include.loggedClass;
		this.includeLevel = true; // by default, this shouldn't really be false
		this.loggingCss = `color: ${this.loggingColor};`;
	}
	loggingTextLevel(level) {
		return ["ERROR", "WARN", "INFO", "VERBOSE"][level];
	}
	loggingTextPrefix(text,level) {
		return `%c[${this.includeClass ? this.loggingClass+'/' : ''}${this.includeLevel ? '%c'+this.loggingTextLevel(level)+'%c@' : ''}${this.includeTime ? new Date().toLocaleTimeString() : ''}] ${text}`;
	}
	log(text, level) {
		if(level > this.minLevel) return;
		console.log(this.loggingTextPrefix(text, level), `color: ${this.loggingColor}`, `color: ${LevelColors[level]};`, `color: ${this.loggingColor}`);
	}
	logVerbose(text) {
		this.log(text, Levels.VERBOSE);
	}
	logInfo(text) {
		this.log(text, Levels.INFO);
	}
	logWarn(text) {
		this.log(text, Levels.WARN);
	}
	logError(text) {
		this.log(text, Levels.ERROR);
	}
	static get ERROR() {
		return Levels.ERROR;
	}
	static get WARN() {
		return Levels.WARN;
	}
	static get INFO() {
		return Levels.INFO;
	}
	static get VERBOSE() {
		return Levels.VERBOSE;
	}
}
