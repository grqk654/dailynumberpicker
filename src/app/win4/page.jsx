import Win4Tool from '../../components/tools/Win4Tool';

export const metadata = {
  title: "NY Win-4 Number Picker",
  description: "Analyze NY Win-4 with 9 scoring angles. Skip tracking, position bias, hot digits, and master digit wheeling. Free. Updated daily.",
  keywords: ["NY win 4", "win 4 numbers", "win 4 analysis", "win 4 number picker"],
};

export default function Win4Page() {
  return <Win4Tool />;
}
