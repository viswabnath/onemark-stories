

// import { useState } from "react";
// import dynamic from "next/dynamic";
// import Head from "next/head";

// import Cursor   from "../components/Cursor";
// import Loader   from "../components/Loader";
// import Nav      from "../components/Nav";
// import Showcase from "../components/Showcase";
// import About    from "../components/About";
// import Footer   from "../components/Footer";

// const Hero = dynamic(() => import("../components/Hero"), { ssr: false });

// export default function Home() {
//   const [loaded, setLoaded] = useState(false);

//   return (
//     <>
//       <Head>
//         <title>OneMark Creative — Premium Digital Experiences</title>
//         <meta
//           name="description"
//           content="We craft immersive digital experiences — wedding keepsakes, live event pages, and portfolio sites — designed to surprise and be remembered forever."
//         />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />

//         {/* ── Favicon — using the OM logo mark ─── */}
//         <link rel="icon"             href="/logo-om.png" type="image/png" />
//         <link rel="apple-touch-icon" href="/logo-om.png" />
//         <link rel="shortcut icon"    href="/logo-om.png" />

//         {/* Open Graph */}
//         <meta property="og:title"       content="OneMark Creative" />
//         <meta property="og:description" content="Premium digital experiences for life's most memorable moments." />
//         <meta property="og:image"       content="/onemark-logo.png" />
//         <meta property="og:url"         content="https://creative.onemark.co.in" />
//         <meta property="og:type"        content="website" />

//         {/* Twitter card */}
//         <meta name="twitter:card"        content="summary_large_image" />
//         <meta name="twitter:title"       content="OneMark Creative" />
//         <meta name="twitter:description" content="Premium digital experiences for life's most memorable moments." />
//         <meta name="twitter:image"       content="/onemark-logo.png" />
//       </Head>

//       <Loader onDone={() => setLoaded(true)} />
//       <Cursor />

//       {loaded && (
//         <>
//           <Nav />
//           <main>
//             <Hero />
//             <Showcase />
//             <About />
//           </main>
//           <Footer />
//         </>
//       )}
//     </>
//   );
// }
import Head from "next/head";

export default function Maintenance() {
  const whatsappNumber = "919392704742";
  const whatsappMessage = encodeURIComponent("Hi OneMark! I'm interested in a creative project when you launch.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center relative overflow-hidden font-sans">
      <Head>
        <title>OneMark Creative | Coming Soon</title>
      </Head>

      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content */}
      <div className="z-10 text-center flex flex-col items-center px-6">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-500">
          We're Crafting
          <br /> Something <span className="text-cyan-400">Unforgettable.</span>
        </h1>
        
        <p className="text-neutral-400 max-w-md mx-auto text-lg mb-10 tracking-wide">
          The creative lab of OneMark is currently under construction. We're building a new digital experience for your special moments.
        </p>

      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-10 text-xs tracking-[0.2em] text-neutral-600 uppercase">
        Powered by <span className="text-neutral-300 font-bold">OneMark Digital</span>
      </div>
    </div>
  );
}