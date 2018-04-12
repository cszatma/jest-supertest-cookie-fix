const request = require('supertest');

/**
 * Replaces the agent's existing _saveCookies function with one that sets the cookies properly when using jest.
 * @param {Agent} agent - Either the Agent type or an Agent instance.
 */
function fixedSupertestAgent(agent) {
    if (
        typeof agent === 'function' &&
        typeof agent.prototype._saveCookies === 'function'
    ) {
        agent.prototype._saveCookies = fixedSaveCookies;
    } else if (agent instanceof request.agent) {
        agent._saveCookies = fixedSaveCookies;
    } else {
        throw new TypeError(
            'Either the agent type or an instance of agent must be passed to fixedSupertestAgent.'
        );
    }
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
 * Export the fixedSupertestAgent function.
 */
exports = module.exports = fixedSupertestAgent;
exports.fixedSupertestAgent = fixedSupertestAgent;
