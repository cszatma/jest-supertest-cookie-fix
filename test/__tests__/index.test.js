const request = require('supertest');
const fixedAgent = require('../../src');

const app = require('../app');

const fixedSupertestAgent = fixedAgent.fixedSupertestAgent;

const mockCookies = {
    'test-cookie-1':
        'session=eyJwYXNzcG9ydCI6eyJ1c2VyIjoiMTIzNCJ9fQ==; 12 May 2018 12:35:31 GMT',
    'test-cookie-2':
        'session.sig=HBY87i6rkzCPNIZ46ZWW1bz3bno; 12 May 2018 12:35:31 GMT',
};

describe('Test the regular agent', () => {
    const agent = request.agent(app);
    const mockCookie = { 'test-cookie-1': mockCookies['test-cookie-1'] };

    it('should set the cookies', () => {
        return agent.get('/set-cookie').expect(200, { status: 'ok' });
    });

    it('should only return the first cookie with the normal agent', () => {
        return agent.get('/get-cookie').expect(200, mockCookie);
    });
});

describe('Test the fixed agent', () => {
    const agent = fixedAgent(app);

    it('should ', () => {
        return agent.get('/set-cookie').expect(200, { status: 'ok' });
    });

    it('should ', () => {
        return agent.get('/get-cookie').expect(200, mockCookies);
    });
});

describe('Test the fixedSupertestAgent function', () => {
    const supertestAgent = request.agent(app);
    const agent = fixedSupertestAgent(supertestAgent);

    it('should throw a TypeError', () => {
        function fixAgent() {
            fixedSupertestAgent(true);
        }
        expect(fixAgent).toThrowError(TypeError);
    });

    it('should ', () => {
        return agent.get('/set-cookie').expect(200, { status: 'ok' });
    });

    it('should ', () => {
        return agent.get('/get-cookie').expect(200, mockCookies);
    });
});
