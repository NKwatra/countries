import CountryCard from "../CountryCard";
import Layout from "../Layout";

const MainContent: React.FC = () => {
  return (
    <Layout>
      <CountryCard
        name="Albania"
        flagUrl="https://flagcdn.com/al.svg"
        population={38928341}
        region="Europ"
        capital="Tirana"
      />
    </Layout>
  );
};

export default MainContent;
