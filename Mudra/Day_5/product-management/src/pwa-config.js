module.exports = {
  extends: "lighthouse:default",
  settings: {
    onlyCategories: ["pwa"],
    output: ["html"],
    skipAudits: [],
  },
};
