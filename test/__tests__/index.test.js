const request = require('supertest');
const fixedAgent = require('../../src');

const app = require('../app');

describe('Test the regular agent', () => {
    const agent = request.agent(app);
    const mockCookies = {
        'test-cookie-1':
            'session=eyJwYXNzcG9ydCI6eyJ1c2VyIjoiMTIzNCJ9fQ==; 12 May 2018 12:35:31 GMT',
    };

    it('should set the cookies', () => {
        return agent.get('/set-cookie').expect(200, { status: 'ok' });
    });

    it('should only return the first cookie with the normal agent', () => {
        return agent.get('/get-cookie').expect(200, mockCookies);
    });
});

describe('Test the fixed agent', () => {
    // const agent = request.agent(app);
    const agent = fixedAgent(app);
    const mockCookies = {
        'test-cookie-1':
            'session=eyJwYXNzcG9ydCI6eyJ1c2VyIjoiMTIzNCJ9fQ==; 12 May 2018 12:35:31 GMT',
        'test-cookie-2':
            'session.sig=HBY87i6rkzCPNIZ46ZWW1bz3bno; 12 May 2018 12:35:31 GMT',
    };

    it('should ', () => {
        return agent.get('/set-cookie').expect(200, { status: 'ok' });
    });

    it('should ', () => {
        return agent.get('/get-cookie').expect(200, mockCookies);
    });
});
