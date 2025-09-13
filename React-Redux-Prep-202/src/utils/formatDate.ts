const formatDate = (date: Date | string | number) => {
  const localdate = new Date(date);
  const year = localdate.getFullYear();
  const month = localdate.getMonth() + 1;
  const day = localdate.getDate();

  return `${day}/${month}/${year}`;
};

export default formatDate;
