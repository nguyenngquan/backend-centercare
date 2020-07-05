const convertDate = (currentYear, currentMonth) => {
  let startYear = currentYear;
  let startMonth = currentMonth - 1;
  let endYear = currentYear;
  let endMonth = +currentMonth + 1;
  if (currentMonth == 12) {
    endMonth = 1;
    endYear = +currentYear + 1;
  }
  if (currentMonth == 1) {
    startMonth = 12;
    startYear = currentYear - 1;
  }
  let startDate = `${startYear}-${startMonth}-10`;
  let endDate = `${endYear}-${endMonth}-20`;
  return { startDate, endDate };
};

module.exports = { convertDate };
