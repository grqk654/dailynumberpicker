import Pick3Tool from '../../components/tools/Pick3Tool';

export const metadata = {
  title: "NY Pick 3 Daily Number Picker",
  description: "Analyze NY Pick 3 Daily Numbers with skip tracking, hot/cold digits, position bias, and master digit wheeling. Free tool powered by live NY lottery data.",
  keywords: ["NY pick 3", "daily numbers", "pick 3 hot numbers", "pick 3 analysis", "number picker"],
};

export default function Pick3Page() {
  return <Pick3Tool />;
}
