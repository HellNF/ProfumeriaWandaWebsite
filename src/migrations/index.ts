import * as migration_20260415_092702_media_s3_indexes from './20260415_092702_media_s3_indexes';

export const migrations = [
  {
    up: migration_20260415_092702_media_s3_indexes.up,
    down: migration_20260415_092702_media_s3_indexes.down,
    name: '20260415_092702_media_s3_indexes'
  },
];
