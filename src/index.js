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
 * Create a default fixed version to use.
 */
const fixedAgent = fixedSupertestAgent(request.agent);

/**
 * Export the fixedSupertestAgent function and the default fixedAgent.
 */
exports = module.exports = fixedAgent;
exports.fixedSupertestAgent = fixedSupertestAgent;
