import Footer from "./Footer";
import HookSection from "./HookSection";
import PrototypeVideo from "./PrototypeVideo";
import QuestionSection from "./QuestionSection";
import SparkSection from "./SparkSection";

function LandingPage() {
    return (
        <main>
            <HookSection />
            <SparkSection/>
            <QuestionSection/>
            <PrototypeVideo/>
            <Footer/>
        </main>
    );
}

export default LandingPage;