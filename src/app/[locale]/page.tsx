import { HeroSection } from '../../components/Herosection';
import { PipelineSection } from '../../components/PipelineSection';
import { FeaturesSection } from '../../components/FeaturesSection';
import { ArchitectureSection } from '../../components/ArchitectureSection';
import { HowItWorksSection } from '../../components/HowItWorksSection';
import { TechStackSection } from '../../components/TechStackSection';
import { CtaSection } from '../../components/CtaSection';

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <PipelineSection />
            <FeaturesSection />
            <ArchitectureSection />
            <HowItWorksSection />
            <TechStackSection />
            <CtaSection />
        </>
    );
}
