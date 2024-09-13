const importFlag = async (countryCode: string): Promise<string | null> => {
  try {
    const code = countryCode?.toLowerCase();
    const flag = await import(`../assets/flags/${code}.svg`);

    return flag.default;
  } catch (error) {
    return "";
  }
};

export default importFlag;
