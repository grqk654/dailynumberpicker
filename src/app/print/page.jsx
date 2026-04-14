import PrintTool from '../../components/tools/PrintTool';

export const metadata = {
  title: "Print Your Lottery Plays",
  description: "Print your Pick 3 and Win-4 plays in three formats: formatted play list, bet slip layout, or printable summary card.",
  keywords: ["print pick 3 numbers", "lottery bet slip", "print lottery plays"],
};

export default function PrintPage() {
  return <PrintTool />;
}
