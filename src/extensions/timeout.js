/**
 * Manage multiple instances of timeouts
 * for different services.
 * @class
 */
module.exports = class TimeoutHandler {

	/**
     * Creates new instacne of Timeout.
     * @constructor
     */
	constructor() {
		this.registeredTimeouts = {};
		this.timeoutStack = {};
	}

	/**
     * Register new timeout handler.
     * @param {string} name     Name of the timeout handler.
     * @param {number} timeout  Timeout duration in milliseconds.
     * @param {number} [afterN] Only timeout after n times of check.
     * @returns Instance of TimeoutHandler.
     */
	register(name, timeout, afterN) {
		if (typeof name !== 'string') { throw Error('Name must be string'); }
		if (typeof timeout !== 'number') { throw Error('Timeout must be number'); }
		if (afterN && typeof afterN !== 'number') {throw Error('afterN must be number'); }
		if (!afterN) { afterN = 1; }
		this.registeredTimeouts[name] = new Handler(name, timeout, afterN);
		return this;
	}

	/**
     * Returns a registered timeout handler by name.
     * Returns null if no handler is registered by
     * this name.
     * @param {string} name name of the timeout handler
     * @returns {Object} timeout Handler or null
     */
	getTimeoutHandler(name) {
		return this.registeredTimeouts[name];
	}

	/**
     * Returns 0 if the timeout handler is not timeouted or
     * if the handler was not registered with this name.
     * If the handler is timeouted, it returns the numer
     * of milliseconds until it will be available again.
     * @param {string} name
     * @returns {number} n milliseconds until ready.
     */
	check(name) {
		const handler = this.registeredTimeouts[name];
		if (!handler) {return 0;}

		let timeout = this.timeoutStack[name];
		if (!timeout) {
			this.timeoutStack[name] = new Timeout();
			timeout = this.timeoutStack[name];
		}

		if (timeout && (timeout.until - Date.now()) > 0) {
			return timeout.until - Date.now();
		}

		if (timeout && timeout.count >= handler.afterN) {
			timeout.count = 0;
			timeout.until = Date.now() + handler.time;
			return handler.time;
		}

		if (timeout) {
			timeout.count++;
			if (timeout.count >= handler.afterN) {
				timeout.count = 0;
				timeout.until = Date.now() + handler.time;
			}
			return 0;
		}

		return 0;
	}

};

// PRIVATE STUFF

class Handler {
	constructor(name, time, afterN) {
		this.name = name;
		this.time = time;
		this.afterN = afterN;
	}
}

class Timeout {
	constructor() {
		this.count = 0;
		this.until = 0;
	}
}