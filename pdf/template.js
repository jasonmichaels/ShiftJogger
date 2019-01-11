const template = (name, dateStart, dateEnd, shiftStart, shiftEnd, hours) => {
  const dayEnded = dateEnd !== null ? dateEnd : dateStart;
  const content = {
    content: [
      { text: `Invoice`, style: "header" },
      {
        text: `The following invoice, from ${name}, includes only hours logged for the indicated shift. Per-hour rates are not yet factored into ShiftJogger's calculations, but we are working to add this feature.`,
        style: "subheader"
      },
      {
        style: "table",
        table: {
          body: [
            ["Start Date", "End Date", "Start Time", "End Time", "Total Hours"],
            [dateStart, dayEnded, shiftStart, shiftEnd, hours]
          ]
        }
      }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      table: {
        margin: [0, 5, 0, 15]
      }
    },
    defaultStyle: {
      font: "Roboto"
    }
  };
  return JSON.stringify(content);
};

module.exports = template;
