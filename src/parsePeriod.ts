const tokenRegex = /^(\d+)([dwmyh]{1})$/i;

const parsePeriod = (input: string) => {
  return input.split(' ').reduce((result: Date, token: string) => {
    const matchResult = token.match(tokenRegex);

    if (!matchResult) {
      return result;
    }

    const [, _amount, units] = matchResult;

    const amount = Number(_amount);

    switch (units) {
      case 'd': {
        result.setDate(result.getDate() + amount);
        return result;
      }

      case 'w': {
        /**
         * в jira 1w = 5d, но по моему удобнее когда 1w = 7d
         */
        result.setDate(result.getDate() + 7 * amount);
        return result;
      }

      case 'm': {
        result.setMonth(result.getMonth() + amount);
        return result;
      }

      case 'y': {
        result.setFullYear(result.getFullYear() + amount);
        return result;
      }

      case 'h': {
        result.setHours(result.getHours() + amount);
        return result;
      }

      default:
        return result;
    }
  }, new Date());
};

export default parsePeriod;
