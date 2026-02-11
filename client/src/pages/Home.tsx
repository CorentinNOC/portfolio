import Content from "../components/Content";
import Header from "../components/Header";

export const Home = () => {
  return (
    <main className="lg:flex lg:justify-between px-6 relative">
      <Header />
      <Content />
    </main>
  );
};

export default Home;
