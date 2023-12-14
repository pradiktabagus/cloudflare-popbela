// eslint-disable-next-line no-undef
const deviceDetect = jest.genMockFromModule('react-device-detect');
deviceDetect.isMobileOnly = true;
module.exports = deviceDetect;
