module.exports = {
  name: 'stock',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/stock',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
