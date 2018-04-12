# jest-supertest-cookie-fix

Fixes an issue with supertest where cookies are not set properly when testing with jest.

In reference to issues [supertest#413](https://github.com/visionmedia/supertest/issues/413), [supertest#460](https://github.com/visionmedia/supertest/issues/460) and [jest#3547](https://github.com/facebook/jest/issues/3547). It seems that jest sets the cookies as a single string which then causes issues when the cookies try to get parsed. This library aims to provide a quick and simple solution to this issue.

### Install

Install with `yarn`:

```bash
$ yarn add jest-supertest-cookie-fix --dev
```

Or use `npm` if you wish:

```bash
$ npm install jest-supertest-cookie-fix --save-dev
```

### Usage

The easiest way to use this package is simply to import the fixed agent that is exported.
Then use it normally the way you would use the supertest agent.

```javascript
const agent = require('jest-supertest-cookie-fix');

agent(app).get('/').expect(200);
```

However if can also import `fixedSupertestAgent()` and pass it the agent yourself.

```javascript
const request = require('supertest');
const fixedSupertestAgent = require('jest-supertest-cookie-fix').fixedSupertestAgent;

const agent = fixedSupertestAgent(request.agent);
```

Or you can pass an agent instance if you wish.

```javascript
const request = require('supertest');
const fixedSupertestAgent = require('jest-supertest-cookie-fix').fixedSupertestAgent;

const agent = request.agent(app);
const fixedAgent = fixedSupertestAgent(agent);
```

### License
jest-supertest-cookie-fix is available under the [MIT License](https://github.com/cszatma/jest-supertest-cookie-fix/tree/master/LICENSE).

### Contributing
Contributions are welcome. Feel free to open an issue or submit a pull request.
