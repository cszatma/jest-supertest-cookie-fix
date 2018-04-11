# jest-supertest-cookie-fix

Fixes an issue with supertest where cookies are not set properly when testing with jest.

In reference to issues [supertest#413](https://github.com/visionmedia/supertest/issues/413), [supertest#460](https://github.com/visionmedia/supertest/issues/460) and [jest#3547](https://github.com/facebook/jest/issues/3547). It seems that jest sets the cookies as a single string which then causes issues when the cookies try to get parsed. This library aims to provide a quick and simple solution to this issue.

### Usage

### License
jest-supertest-cookie-fix is available under the [MIT License](https://github.com/cszatma/jest-supertest-cookie-fix/tree/master/LICENSE).

### Contributing
Contributions are welcome. Feel free to open an issue or submit a pull request.
