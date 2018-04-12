const Agent = require('supertest').agent;

/**
 * Initializes a new supertest agent which its _saveCookies method
 * fixed to work with jest.
 * @param {Function|Server} app
 * @param {Object} options
 * @returns {FixedAgent}
 * @constructor
 * @api public
 */
function FixedAgent(app, options) {
    if (!(this instanceof FixedAgent)) {
        return new FixedAgent(app, options);
    }

    Agent.call(this, app, options);
}

/**
 * Copy Agent's prototype to FixedAgent.
 * @type {Agent}
 */
FixedAgent.prototype = Object.create(Agent.prototype);

/**
 * Replace `FixedAgent._saveCookies`.
 * @type {fixedSaveCookies}
 * @private
 */
FixedAgent.prototype._saveCookies = fixedSaveCookies;

/**
 * Replaces the agent's existing _saveCookies function with one that sets the cookies properly when using jest.
 * @param {Agent} agent - An Agent instance.
 * @api public
 */
function fixedSupertestAgent(agent) {
    // Make sure agent is an instance of Agent.
    if (!(agent instanceof Agent)) {
        throw new TypeError(
            'Either the agent type or an instance of agent must be passed to fixedSupertestAgent.'
        );
    }

    agent._saveCookies = fixedSaveCookies;
    return agent;
}

/**
 * Fixes jest's set-cookie behavior. Jest normally sets the cookie as a single string instead of an array.
 * This function splits the string and transforms it into an array the way it should be.
 * @param {Response} res
 * @api private
 */
function fixedSaveCookies(res) {
    const cookies = res.headers['set-cookie'];

    if (cookies) {
        const fixedCookies = cookies.reduce(
            (cookies, cookie) => cookies.concat(cookie.split(/,(?!\s)/)),
            []
        );
        this.jar.setCookies(fixedCookies);
    }
}

/**
 * Export the FixedAgent type along with the fixedSupertestAgent function.
 */
exports = module.exports = FixedAgent;
exports.fixedSupertestAgent = fixedSupertestAgent;
