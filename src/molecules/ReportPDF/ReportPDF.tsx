import Helvetica from "../../fonts/Helvetica.ttf";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import { ReportProps } from "../../types/reportProps";
import { CalcList } from "../../types/calcList";
import { survivalColor } from "../../utils/color";

type ReportPDFProps = {
  avatar: string;
  data: ReportProps | undefined;
  resultsCalcs: CalcList[] | undefined;
};

const negativeMargin = "-96px";

const bgColor = (
  ko_chance:
    | {
        chance?: number;
        n: number;
        text: string;
      }
    | undefined
) => {
  if (!ko_chance || ko_chance.chance === undefined) return "";
  if (ko_chance.chance === 1 && ko_chance.n === 1) return "#fca5a5";
  if (ko_chance.chance < 1 && ko_chance.n === 1) return "#fde047";
  return "#bbf7d0";
};

// Create Document Component
export const ReportPDF = ({ avatar, data, resultsCalcs }: ReportPDFProps) => (
  <Document>
    <Page size="A4" style={styles.body}>
      <Text style={styles.title}>
        Can you survive "{data?.move}" from {data?.name}?
      </Text>
      <Image src={avatar} style={styles.image} />

      <View>
        {/**Bucle para los calcs */}
        {resultsCalcs?.map((calc, index) => {
          return (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: 48,
              }}
            >
              <View
                key={index}
                style={{ display: "flex", flexDirection: "row", rowGap: 32 }}
              >
                <Text style={styles.section}>{calc?.pokemon}</Text>
                <Image
                  source={calc.img}
                  style={{
                    width: "96px",
                    height: "96px",
                    marginBottom: negativeMargin,
                    marginTop: "-20px",
                  }}
                />
              </View>
              {calc.calcSet && (
                <View
                  style={{
                    marginTop: 8,
                  }}
                >
                  <Text style={styles.subsection}>
                    Pokemon with set case: {calc?.calcSet?.text_evs}
                  </Text>
                  <Text
                    style={{
                      ...styles.text,
                      borderRadius: 8,
                      backgroundColor: bgColor(calc?.calcExtreme?.ko_chance),
                      padding: 8,
                      marginTop: 2,
                    }}
                  >
                    {calc?.calcSet?.description}
                  </Text>
                </View>
              )}
              {calc?.calcExtreme && (
                <View
                  style={{
                    marginTop: 8,
                  }}
                >
                  <Text style={styles.subsection}>
                    Pokemon with max HP and max Def case:{" "}
                    {calc?.calcExtreme?.text_evs}
                  </Text>
                  <Text
                    style={{
                      ...styles.text,
                      borderRadius: 8,
                      backgroundColor: bgColor(calc?.calcExtreme?.ko_chance),
                      padding: 8,
                      marginTop: 2,
                    }}
                  >
                    {calc?.calcExtreme?.description}
                  </Text>
                </View>
              )}
            </View>
          );
        })}
        {/**Fin de bucle */}
      </View>
    </Page>
  </Document>
);

Font.register({
  family: "Helvetica",
  src: Helvetica,
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Helvetica",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Helvetica",
  },
  section: {
    fontSize: 18,
    fontFamily: "Helvetica",
  },
  subsection: {
    fontSize: 14,
    fontFamily: "Helvetica",
  },
  text: {
    fontSize: 11,
    textAlign: "justify",
    fontFamily: "Helvetica",
  },
  calc: {
    fontSize: 12,
    marginTop: 8,
    textAlign: "justify",
    fontFamily: "Helvetica",
    marginBottom: 36,
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});
