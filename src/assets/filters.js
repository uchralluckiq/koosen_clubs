export function getTypeFromId(id) {
  const typeMap = {
    т: "Тэмцээн",
    с: "Спорт",
    у: "Урлаг",
    б: "Боловсрол"
  };
  return typeMap[id[1]];
}

export function isYearAllowed(club, year) {
  // allowedCollegeYear is an array of strings like ["1", "4"]
  // Convert year to string and check if it's in the array
  return club.allowedCollegeYear.includes(String(year));
}

export function isClassAllowed(club, engineerClass) {
  // allowedEngineerClass is an array like ["A", "D"]
  // Check if the class is in the array, or if "ALL" is in the array
  return club.allowedEngineerClass.includes(engineerClass) || 
         club.allowedEngineerClass.includes("ALL");
}
