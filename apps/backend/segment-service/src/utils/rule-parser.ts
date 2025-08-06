export const parseRulesToMongoQuery = (rulesText: string) => {
    const lines = rulesText.split("\n").map(line => line.trim()).filter(Boolean);
    const query: any = {};
  
    for (const line of lines) {
      const [field, operator, valueRaw] = line.split(/(=|>|<)/).map(s => s.trim());
      let value: any = valueRaw;
  
      // Convert value to boolean or number 
      if (value === "true") value = true;
      else if (value === "false") value = false;
      else if (!isNaN(Number(value))) value = Number(value);
  
      switch (operator) {
        case "=":
          query[field] = value;
          break;
        case ">":
          query[field] = { $gt: value };
          break;
        case "<":
          query[field] = { $lt: value };
          break;
        default:
          throw new Error(`Unsupported operator: ${operator}`);
      }
    }
  
    return query;
  };
  