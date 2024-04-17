const getTagColor = (difficulty) => {
  switch (difficulty) {
    case "Easy":
      return "green";
    case "Medium":
      return "gold";
    case "Hard":
      return "red";
    default:
      return "blue"; // Default color if difficulty is not recognized
  }
};

export default getTagColor;
