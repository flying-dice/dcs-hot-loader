export const variables: Record<string, string> = {
  WRITE_DIR: lfs.writedir(),
  INSTALL_DIR: lfs.currentdir(),
  TEMP_DIR: lfs.tempdir(),
};
