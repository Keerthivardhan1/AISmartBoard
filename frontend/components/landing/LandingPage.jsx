import { useEffect } from "react";
import Footer from "./Footer";
import HookSection from "./HookSection";
import PrototypeVideo from "./PrototypeVideo";
import QuestionSection from "./QuestionSection";
import SparkSection from "./SparkSection";

function LandingPage() {
    useEffect(()=>{
        console.log("backend url :", import.meta.env.VITE_BACKEND_URL)
    })
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