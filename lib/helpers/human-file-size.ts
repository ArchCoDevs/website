export const humanFileSize = (size: number) => {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    Number((size / Math.pow(1024, i)).toFixed(2)) +
    ' ' +
    ['B', 'KB', 'MB', 'GB', 'TB'][i]
  );
};

export default humanFileSize;
