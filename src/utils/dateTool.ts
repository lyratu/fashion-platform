const dateTool = {
  formattedDate: (date: string) => {
    return new Date(date).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  },
};
export default dateTool;
