export const transformTitleToPath = (title) => {
  return title.replace(/\s/g, "-").toLowerCase();
};
