export const formatDate = (date: Date) => {
  const formatedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(date);
  return formatedDate;
};
