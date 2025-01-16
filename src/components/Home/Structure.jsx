import { Box } from "@mui/material";
import cg_data from "../../cg_data.json";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Structure() {
  function toTitleCase(str) {
    const minorWords = new Set([
      "a",
      "an",
      "the",
      "and",
      "but",
      "or",
      "for",
      "nor",
      "in",
      "of",
      "at",
      "to",
      "on",
      "with",
      "by",
    ]);
    const capitalize = (word) => {
      if (!word) return word;
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    };
    const words = str.toLowerCase().split(" ");
    if (words.length > 0) {
      words[0] = capitalize(words[0]);
    }
    for (let i = 1; i < words.length; i++) {
      if (!minorWords.has(words[i])) {
        words[i] = capitalize(words[i]);
      } else {
        words[i] = words[i].toLowerCase();
      }
    }
    if (words.length > 1) {
      words[words.length - 1] = capitalize(words[words.length - 1]);
    }

    return words.join(" ");
  }

  function formatName(input) {
    function formatNamePart(namePart) {
      const words = namePart.trim().split(" ");
      const formattedName = [
        ...words.slice(0, 2),
        ...words.slice(2).map((word) => word.charAt(0) + "."),
      ];
      return formattedName.join(" ");
    }
    const parenthesesMatch = input.match(/(.*?)\s*\((.*?)\)/);

    if (parenthesesMatch) {
      const mainName = formatNamePart(parenthesesMatch[1]);
      const parenthesesName = formatNamePart(parenthesesMatch[2]);
      return `${toTitleCase(mainName)} (${toTitleCase(parenthesesName)})`;
    } else {
      return toTitleCase(formatNamePart(input));
    }
  }
  const getChildRows = (children) => {
    const rows = [];
    for (let i = 0; i < children.length; i += 2) {
      const row = children.slice(i, i + 2);
      if (i + 1 >= children.length && i % 2 === 0) {
        row[0] = { ...row[0], isLastOdd: true };
      }
      rows.push(row);
    }
    return rows;
  };

  const getAllLevel3RowsCG = (index) => {
    const maxRows = Math.max(
      ...cg_data[index].child.map((node) => Math.ceil(node.child.length / 2))
    );

    const rows = [];
    for (let row = 0; row < maxRows; row++) {
      const rowContent = cg_data[index].child.map((node) => {
        const childRows = getChildRows(node.child);
        return childRows[row] || Array(2).fill(null);
      });
      rows.push(rowContent.flat());
    }
    return rows;
  };

  return (
    <Box sx={{ background: "#fff", p: 4 }}>
      <center>
        {cg_data.map((r, index) => (
          <>
            <table cellSpacing={10} style={{ marginBottom: 100 }}>
              <>
                <tr>
                  <td
                    colSpan={r.child.length * 2}
                    style={{
                      minWidth: "100px",
                      maxWidth: "100px",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      id={`tl${index}`}
                      sx={{
                        border: "1.5px solid #808080",
                        p: 2,
                        borderRadius: 4,
                      }}
                    >
                      <b>
                        {Array.isArray(r?.name)
                          ? r.name.map((x) => formatName(x)).join(" & ")
                          : formatName(r?.name)}{" "}
                      </b>
                      &nbsp;({r.child.length} TL)
                    </Box>
                  </td>
                </tr>

                <tr>
                  {r.child.map((r2, i) => (
                    <td
                      colSpan={2}
                      style={{
                        minWidth: "300px",
                        maxWidth: "200px",
                        textAlign: "center",
                      }}
                    >
                      <FontAwesomeIcon icon={faArrowDown} />
                    </td>
                  ))}
                </tr>
                <tr>
                  {r.child.map((r2, i) => (
                    <td
                      colSpan={2}
                      style={{
                        fontSize: 14,
                        minWidth: "200px",
                        maxWidth: "300px",
                        textAlign: "center",
                        border: "1.5px solid #808080",
                        borderRadius: 16,
                        padding: 10,
                      }}
                    >
                      {" "}
                      <Box id={`tl${index}-coach${i}`}>
                        <b>
                          {Array.isArray(r2?.name)
                            ? r2.name.map((x) => formatName(x)).join(" & ")
                            : formatName(r2?.name || "")}
                        </b>
                        <br />({r2.child.length} CG)
                      </Box>
                    </td>
                  ))}
                </tr>
                <tr>
                  {r.child.map((r2) => (
                    <td
                      colSpan={2}
                      style={{
                        minWidth: "300px",
                        maxWidth: "200px",
                        textAlign: "center",
                      }}
                    >
                      <FontAwesomeIcon icon={faArrowDown} />
                    </td>
                  ))}
                </tr>
                {getAllLevel3RowsCG(index).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((item, colIndex) => {
                      return (
                        <td
                          key={colIndex}
                          colSpan={item?.isLastOdd ? 2 : 1}
                          style={{
                            fontSize: 14,
                            minWidth: "100px",
                            maxWidth: "100px",
                            textAlign: "center",
                            border: item?.name ? "1.5px solid #808080" : 0,
                            borderRadius: 16,
                            padding: 10,
                          }}
                        >
                          <Box>
                            {Array.isArray(item?.name)
                              ? item.name.map((x) => formatName(x)).join(" & ")
                              : formatName(item?.name || "")}
                          </Box>
                          <Box sx={{ py: 1 }}>
                            <b>{item?.cg || ""}</b>
                          </Box>
                          <Box>
                            {item?.name
                              ? `Avg. Kehadiran: ${item?.attendance_average}`
                              : ""}
                          </Box>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </>
            </table>
          </>
        ))}
      </center>
    </Box>
  );
}
