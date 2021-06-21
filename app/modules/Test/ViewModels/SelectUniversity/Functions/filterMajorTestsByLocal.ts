const filterMajorTestsByLocal = (
  majorTests = [],
  localUniversityNames = [],
) => {
  return majorTests.filter(test =>
    localUniversityNames.some(
      localUniversityName => localUniversityName === test.university_name,
    ),
  );
};

export default filterMajorTestsByLocal;
