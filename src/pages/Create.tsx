import { useState } from "react";

import CreationModes, {
  type CreationMode,
} from "../components/create/CreationModes";
import ImageToVideo from "../components/create/ImageToVideo";
import PromptToVideo from "../components/create/PromptToVideo";
import TemplateCreator from "../components/create/TemplateCreator";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const Create = () => {
  const [activeMode, setActiveMode] = useState<CreationMode>("image");

  return (
    <main className="min-h-screen bg-white text-[#17121F]">
      <Navbar />

      <section className="mx-auto max-w-[1440px] px-6 pb-20 pt-[120px] lg:px-10 lg:pb-28 lg:pt-[140px]">
        <CreationModes
          activeMode={activeMode}
          onModeChange={setActiveMode}
        />

        <div className="mt-10">
          {activeMode === "image" && <ImageToVideo />}

          {activeMode === "prompt" && <PromptToVideo />}

          {activeMode === "template" && <TemplateCreator />}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Create;