module.exports = {
  name: 'art',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/art',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
