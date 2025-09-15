import { citiesByProvince } from "./dummy";

/**
 * Get the selection state of a province based on selected locations
 * @param {string} province - The province name
 * @param {string[]} selectedLocations - Array of selected location strings
 * @param {Object} citiesByProvinceData - Optional cities by province data (defaults to dummy data)
 * @returns {'none' | 'all' | 'partial'} - The selection state
 */
export const getProvinceSelectionState = (province, selectedLocations, citiesByProvinceData = null) => {
  const dataSource = citiesByProvinceData || citiesByProvince;
  const citiesInProvince = dataSource[province] || [];
  const selectedCitiesCount = selectedLocations.filter((loc) =>
    loc.startsWith(`${province} - `)
  ).length;

  if (selectedCitiesCount === 0) return "none";
  if (selectedCitiesCount === citiesInProvince.length) return "all";
  return "partial";
};

/**
 * Get all possible locations (province - city combinations)
 * @param {Object} citiesByProvinceData - Optional cities by province data (defaults to dummy data)
 * @returns {Array<{province: string, city: string}>} - Array of all location objects
 */
export const getAllLocations = (citiesByProvinceData = null) => {
  const dataSource = citiesByProvinceData || citiesByProvince;
  return Object.entries(dataSource).flatMap(([province, cities]) =>
    cities.map((city) => ({ province, city }))
  );
};

/**
 * Check if all provinces are selected
 * @param {string[]} selectedLocations - Array of selected location strings
 * @param {Object} citiesByProvinceData - Optional cities by province data (defaults to dummy data)
 * @returns {boolean} - True if all provinces are selected
 */
export const isAllProvincesSelected = (selectedLocations, citiesByProvinceData = null) => {
  const allLocations = getAllLocations(citiesByProvinceData);
  return selectedLocations.length === allLocations.length;
};

/**
 * Generate badges from selected locations
 * @param {string[]} selectedLocations - Array of selected location strings
 * @param {Object} citiesByProvinceData - Optional cities by province data (defaults to dummy data)
 * @returns {Array<{type: string, label: string, value: string, province?: string}>} - Array of badge objects
 */
export const generateBadges = (selectedLocations, citiesByProvinceData = null) => {
  const badges = [];
  const selectedProvinces = {};

  if (isAllProvincesSelected(selectedLocations, citiesByProvinceData)) {
    badges.push({
      type: "all-provinces",
      label: "Semua Provinsi",
      value: "all",
    });
  } else {
    selectedLocations.forEach((loc) => {
      const [province, city] = loc.split(" - ");
      if (!selectedProvinces[province]) {
        selectedProvinces[province] = [];
      }
      selectedProvinces[province].push(city);
    });

    Object.entries(selectedProvinces).forEach(([province, cities]) => {
      if (getProvinceSelectionState(province, selectedLocations, citiesByProvinceData) === "all") {
        badges.push({
          type: "province",
          province,
          label: `${province} - Semua Kota/Kabupaten`,
          value: province,
        });
      } else {
        cities.forEach((city) => {
          badges.push({
            type: "city",
            label: `${province} - ${city}`,
            value: `${province} - ${city}`,
          });
        });
      }
    });
  }

  return badges;
};

/**
 * Remove a badge from selected locations
 * @param {Array<{type: string, province?: string, value: string}>} badge - The badge to remove
 * @param {string[]} selectedLocations - Current selected locations
 * @param {Object} citiesByProvinceData - Optional cities by province data (defaults to dummy data)
 * @returns {string[]} - New selected locations array
 */
export const removeBadgeFromLocations = (badge, selectedLocations, citiesByProvinceData = null) => {
  let newLocations = [...selectedLocations];
  const dataSource = citiesByProvinceData || citiesByProvince;

  if (badge.type === "all-provinces") {
    newLocations = [];
  } else if (badge.type === "province") {
    newLocations = newLocations.filter(
      (loc) => !loc.startsWith(`${badge.province} - `)
    );
  } else if (badge.type === "city") {
    newLocations = newLocations.filter((loc) => loc !== badge.value);
  }

  return newLocations;
};
