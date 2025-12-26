const fs = require('fs');
const path = require('path');

// BatchLogic Blog Articles - Top 100 Questions/Topics for Concrete Batching
const batchlogicArticles = [
  { slug: "what-is-batch-plant-automation", title: "What is Batch Plant Automation? Complete Guide for 2025", category: "Automation", description: "Everything you need to know about batch plant automation, from basic concepts to advanced AI-powered systems." },
  { slug: "batch-plant-accuracy-standards", title: "Batch Plant Accuracy Standards: ASTM, ACI & Industry Requirements", category: "Quality Control", description: "Understanding accuracy requirements and how to achieve consistent compliance with industry standards." },
  { slug: "moisture-sensors-concrete-batching", title: "Moisture Sensors in Concrete Batching: Types, Installation & Best Practices", category: "Hardware", description: "Complete guide to aggregate moisture sensing technology and its impact on batch quality." },
  { slug: "reducing-cement-waste-batching", title: "How to Reduce Cement Waste in Batching Operations", category: "Operations", description: "Proven strategies to minimize cement giveaway and improve profitability." },
  { slug: "batch-plant-software-comparison", title: "Batch Plant Software Comparison: Top Systems Reviewed", category: "Industry", description: "Comprehensive comparison of leading batch plant control systems in the market." },
  { slug: "load-cell-calibration-guide", title: "Load Cell Calibration: Step-by-Step Guide for Batch Plants", category: "Hardware", description: "How to properly calibrate load cells for accurate batching and maintain compliance." },
  { slug: "concrete-mix-design-optimization", title: "Concrete Mix Design Optimization with AI", category: "Automation", description: "Using artificial intelligence to optimize mix designs for strength, cost, and sustainability." },
  { slug: "batch-plant-maintenance-schedule", title: "Batch Plant Maintenance Schedule: Daily, Weekly & Monthly Checklists", category: "Operations", description: "Comprehensive maintenance schedules to maximize equipment uptime and longevity." },
  { slug: "water-cement-ratio-control", title: "Water-Cement Ratio Control: Achieving Consistency in Every Batch", category: "Quality Control", description: "Techniques for precise water control and its impact on concrete quality." },
  { slug: "admixture-dispensing-accuracy", title: "Admixture Dispensing Accuracy: Best Practices & Common Issues", category: "Quality Control", description: "How to achieve precise admixture dosing and troubleshoot common problems." },
  { slug: "batch-plant-plc-programming", title: "Batch Plant PLC Programming: Fundamentals & Advanced Concepts", category: "Automation", description: "Understanding PLC logic in batch plant control systems." },
  { slug: "concrete-quality-testing-automation", title: "Automating Concrete Quality Testing at the Batch Plant", category: "Quality Control", description: "Modern approaches to automated quality control and testing." },
  { slug: "batch-ticketing-systems", title: "Batch Ticketing Systems: From Paper to Digital", category: "Operations", description: "Transitioning to digital ticketing and the benefits for your operation." },
  { slug: "aggregate-bin-management", title: "Aggregate Bin Management: Preventing Contamination & Errors", category: "Operations", description: "Best practices for managing aggregate storage and preventing cross-contamination." },
  { slug: "batch-plant-energy-efficiency", title: "Energy Efficiency in Batch Plant Operations", category: "Operations", description: "Reducing energy costs while maintaining production efficiency." },
  { slug: "winter-batching-challenges", title: "Winter Batching Challenges: Cold Weather Concrete Production", category: "Operations", description: "Managing concrete production in cold weather conditions." },
  { slug: "hot-weather-concrete-batching", title: "Hot Weather Concrete Batching: Temperature Control Strategies", category: "Operations", description: "Techniques for managing concrete temperature in hot conditions." },
  { slug: "batch-plant-safety-protocols", title: "Batch Plant Safety Protocols: OSHA Compliance & Best Practices", category: "Operations", description: "Essential safety measures for batch plant operations." },
  { slug: "concrete-slump-control", title: "Concrete Slump Control: Achieving Target Workability", category: "Quality Control", description: "Methods for consistent slump control in concrete production." },
  { slug: "batch-cycle-time-optimization", title: "Batch Cycle Time Optimization: Increasing Throughput", category: "Operations", description: "Strategies to reduce cycle times without sacrificing quality." },
  { slug: "dust-control-batch-plants", title: "Dust Control at Batch Plants: Environmental Compliance", category: "Operations", description: "Managing dust emissions and meeting environmental regulations." },
  { slug: "batch-plant-troubleshooting-guide", title: "Batch Plant Troubleshooting: Common Issues & Solutions", category: "Operations", description: "Diagnosing and fixing common batch plant problems." },
  { slug: "ready-mix-dispatch-integration", title: "Integrating Dispatch with Batch Plant Operations", category: "Automation", description: "Seamless communication between dispatch and batching systems." },
  { slug: "concrete-strength-prediction", title: "Concrete Strength Prediction Using Data Analytics", category: "Quality Control", description: "Predictive analytics for concrete performance forecasting." },
  { slug: "batch-plant-inventory-management", title: "Real-Time Inventory Management for Batch Plants", category: "Operations", description: "Tracking materials and preventing stockouts." },
  { slug: "scada-systems-concrete-batching", title: "SCADA Systems in Concrete Batching: Overview & Benefits", category: "Automation", description: "Understanding supervisory control and data acquisition in batching." },
  { slug: "mobile-batch-plant-operations", title: "Mobile Batch Plant Operations: Setup & Management", category: "Operations", description: "Best practices for portable and mobile batch plant operations." },
  { slug: "batch-plant-roi-calculation", title: "Calculating ROI for Batch Plant Upgrades", category: "Industry", description: "Financial analysis methods for justifying equipment investments." },
  { slug: "concrete-uniformity-standards", title: "Meeting Concrete Uniformity Standards: ACI 318 Compliance", category: "Quality Control", description: "Ensuring batch-to-batch consistency in concrete production." },
  { slug: "fiber-reinforced-concrete-batching", title: "Batching Fiber-Reinforced Concrete: Special Considerations", category: "Operations", description: "Handling fiber additions in the batching process." },
  { slug: "colored-concrete-batching", title: "Colored Concrete Batching: Pigment Dispensing & Consistency", category: "Operations", description: "Achieving uniform color in decorative concrete production." },
  { slug: "self-consolidating-concrete-batching", title: "Self-Consolidating Concrete (SCC) Batching Guidelines", category: "Operations", description: "Special requirements for producing SCC mixes." },
  { slug: "pervious-concrete-production", title: "Pervious Concrete Production: Batching Techniques", category: "Operations", description: "Producing permeable concrete for sustainable construction." },
  { slug: "high-strength-concrete-batching", title: "High-Strength Concrete Batching: Quality Control Requirements", category: "Quality Control", description: "Producing concrete with compressive strengths above 8000 psi." },
  { slug: "batch-plant-data-analytics", title: "Data Analytics for Batch Plant Operations", category: "Automation", description: "Leveraging production data for continuous improvement." },
  { slug: "concrete-temperature-monitoring", title: "Concrete Temperature Monitoring: Sensors & Best Practices", category: "Quality Control", description: "Real-time temperature tracking from batch to placement." },
  { slug: "aggregate-gradation-impact", title: "How Aggregate Gradation Affects Batch Quality", category: "Quality Control", description: "Understanding the relationship between gradation and concrete properties." },
  { slug: "cement-silo-management", title: "Cement Silo Management: Level Monitoring & Inventory Control", category: "Operations", description: "Best practices for cement storage and handling." },
  { slug: "fly-ash-batching-considerations", title: "Fly Ash Batching: Handling Supplementary Cementitious Materials", category: "Operations", description: "Incorporating SCMs into your batching process." },
  { slug: "slag-cement-batching", title: "Slag Cement Batching: Benefits & Challenges", category: "Operations", description: "Using ground granulated blast furnace slag in concrete production." },
  { slug: "silica-fume-dispensing", title: "Silica Fume Dispensing: Accuracy & Safety Considerations", category: "Operations", description: "Handling highly reactive pozzolanic materials." },
  { slug: "batch-plant-networking", title: "Networking Multiple Batch Plants: Central Control Systems", category: "Automation", description: "Managing multi-plant operations from a single location." },
  { slug: "cloud-based-batch-management", title: "Cloud-Based Batch Plant Management: Benefits & Security", category: "Automation", description: "Moving batch plant data and control to the cloud." },
  { slug: "batch-plant-cybersecurity", title: "Cybersecurity for Batch Plant Control Systems", category: "Automation", description: "Protecting industrial control systems from cyber threats." },
  { slug: "concrete-air-content-control", title: "Air Content Control in Concrete Batching", category: "Quality Control", description: "Managing air entrainment for durability and workability." },
  { slug: "batch-weight-tolerances", title: "Understanding Batch Weight Tolerances & Accuracy Requirements", category: "Quality Control", description: "Industry standards for acceptable batch weight variations." },
  { slug: "reclaimed-water-batching", title: "Using Reclaimed Water in Concrete Batching", category: "Operations", description: "Sustainability through wash water recycling." },
  { slug: "ice-batching-systems", title: "Ice Batching Systems for Hot Weather Concrete", category: "Hardware", description: "Cooling concrete with ice and chilled water systems." },
  { slug: "concrete-washout-management", title: "Concrete Washout Management at Batch Plants", category: "Operations", description: "Environmental compliance and waste reduction strategies." },
  { slug: "batch-plant-noise-reduction", title: "Noise Reduction Strategies for Batch Plants", category: "Operations", description: "Meeting noise regulations in urban environments." },
  { slug: "automated-truck-loading", title: "Automated Truck Loading Systems for Batch Plants", category: "Automation", description: "Streamlining the loading process with automation." },
  { slug: "batch-plant-lighting-requirements", title: "Batch Plant Lighting: Safety & Operational Requirements", category: "Operations", description: "Proper illumination for safe and efficient operations." },
  { slug: "concrete-truck-drum-cleaning", title: "Mixer Truck Drum Cleaning: Best Practices", category: "Operations", description: "Maintaining clean drums for quality concrete delivery." },
  { slug: "batch-plant-permit-requirements", title: "Batch Plant Permit Requirements by State", category: "Industry", description: "Understanding regulatory requirements for batch plant operation." },
  { slug: "concrete-sustainability-metrics", title: "Measuring Sustainability in Concrete Production", category: "Industry", description: "Key metrics for tracking environmental performance." },
  { slug: "epd-generation-concrete", title: "Environmental Product Declarations (EPDs) for Concrete", category: "Industry", description: "Creating and using EPDs for sustainable construction." },
  { slug: "carbon-footprint-concrete-batching", title: "Reducing Carbon Footprint in Concrete Batching", category: "Industry", description: "Strategies for lower-carbon concrete production." },
  { slug: "batch-plant-operator-training", title: "Batch Plant Operator Training: Curriculum & Certification", category: "Operations", description: "Developing skilled operators for your batch plant." },
  { slug: "concrete-testing-frequency", title: "Concrete Testing Frequency Requirements", category: "Quality Control", description: "How often to test and what tests are required." },
  { slug: "batch-plant-spare-parts", title: "Essential Spare Parts Inventory for Batch Plants", category: "Operations", description: "Critical components to keep on hand for minimal downtime." },
  { slug: "weigh-hopper-design", title: "Weigh Hopper Design & Optimization", category: "Hardware", description: "Understanding weigh hopper configurations for accuracy." },
  { slug: "concrete-mixer-efficiency", title: "Central Mixer vs Truck Mixer: Efficiency Comparison", category: "Operations", description: "Choosing the right mixing method for your operation." },
  { slug: "batch-sequence-optimization", title: "Optimizing Batch Sequences for Efficiency", category: "Automation", description: "Intelligent sequencing for faster, more accurate batching." },
  { slug: "aggregate-moisture-compensation", title: "Automatic Moisture Compensation: How It Works", category: "Automation", description: "Real-time adjustments for aggregate moisture content." },
  { slug: "batch-plant-grounding", title: "Electrical Grounding Requirements for Batch Plants", category: "Hardware", description: "Ensuring safe and reliable electrical systems." },
  { slug: "concrete-testing-labs", title: "Setting Up an On-Site Concrete Testing Lab", category: "Quality Control", description: "Equipment and procedures for in-house testing." },
  { slug: "batch-plant-expansion", title: "Planning Batch Plant Expansion: Key Considerations", category: "Industry", description: "Growing your production capacity effectively." },
  { slug: "ready-mix-pricing-strategies", title: "Ready-Mix Pricing Strategies for Profitability", category: "Industry", description: "Optimizing pricing based on production costs." },
  { slug: "batch-plant-insurance", title: "Batch Plant Insurance: Coverage Requirements", category: "Industry", description: "Protecting your investment with proper insurance." },
  { slug: "concrete-delivery-scheduling", title: "Optimizing Concrete Delivery Scheduling", category: "Operations", description: "Coordinating production with delivery demands." },
  { slug: "batch-plant-water-treatment", title: "Water Treatment Systems for Batch Plants", category: "Operations", description: "Ensuring water quality for concrete production." },
  { slug: "aggregate-stockpile-management", title: "Aggregate Stockpile Management Best Practices", category: "Operations", description: "Organizing and maintaining aggregate inventory." },
  { slug: "batch-plant-weather-protection", title: "Weather Protection for Batch Plant Operations", category: "Operations", description: "Sheltering critical components from the elements." },
  { slug: "concrete-pump-coordination", title: "Coordinating Batch Production with Concrete Pumping", category: "Operations", description: "Timing batches for pump truck operations." },
  { slug: "batch-plant-lean-manufacturing", title: "Lean Manufacturing Principles for Batch Plants", category: "Operations", description: "Applying lean concepts to concrete production." },
  { slug: "concrete-quality-certifications", title: "Quality Certifications for Concrete Producers", category: "Quality Control", description: "NRMCA, ISO, and other certification programs." },
  { slug: "batch-plant-staffing", title: "Batch Plant Staffing: Optimal Crew Sizes", category: "Operations", description: "Determining the right number of employees per shift." },
  { slug: "concrete-truck-turnaround", title: "Reducing Concrete Truck Turnaround Time", category: "Operations", description: "Strategies for faster loading and dispatch." },
  { slug: "batch-plant-security", title: "Batch Plant Security: Preventing Theft & Vandalism", category: "Operations", description: "Protecting your facility and materials." },
  { slug: "admixture-compatibility", title: "Admixture Compatibility: Avoiding Mix Problems", category: "Quality Control", description: "Ensuring admixtures work together properly." },
  { slug: "batch-plant-startup-guide", title: "Starting a Batch Plant: Complete Business Guide", category: "Industry", description: "From planning to operation: launching a batch plant." },
  { slug: "concrete-customer-portal", title: "Customer Portals for Concrete Producers", category: "Automation", description: "Self-service ordering and tracking for customers." },
  { slug: "batch-plant-benchmarking", title: "Benchmarking Batch Plant Performance", category: "Operations", description: "Comparing your operation to industry standards." },
  { slug: "concrete-waste-reduction", title: "Reducing Returned Concrete Waste", category: "Operations", description: "Minimizing returns and managing leftover concrete." },
  { slug: "batch-plant-emergency-procedures", title: "Emergency Procedures for Batch Plants", category: "Operations", description: "Preparing for equipment failures and emergencies." },
  { slug: "aggregate-testing-requirements", title: "Aggregate Testing Requirements for Batch Plants", category: "Quality Control", description: "Required tests and frequencies for aggregate QC." },
  { slug: "batch-plant-communication", title: "Communication Systems for Batch Plant Operations", category: "Operations", description: "Radios, intercoms, and digital communication tools." },
  { slug: "concrete-production-forecasting", title: "Production Forecasting for Concrete Operations", category: "Operations", description: "Predicting demand and planning capacity." },
  { slug: "batch-plant-conveyor-systems", title: "Conveyor Systems for Batch Plants: Types & Maintenance", category: "Hardware", description: "Understanding aggregate handling equipment." },
  { slug: "concrete-quality-control-plans", title: "Developing Quality Control Plans for Concrete Production", category: "Quality Control", description: "Creating comprehensive QC documentation." },
  { slug: "batch-plant-environmental-compliance", title: "Environmental Compliance for Batch Plant Operations", category: "Industry", description: "Meeting EPA and state environmental regulations." },
  { slug: "concrete-testing-equipment", title: "Essential Testing Equipment for Batch Plants", category: "Quality Control", description: "Slump cones, air meters, and other QC tools." },
  { slug: "batch-plant-modernization", title: "Modernizing Legacy Batch Plant Equipment", category: "Automation", description: "Upgrading older plants with new technology." },
  { slug: "concrete-production-costs", title: "Understanding Concrete Production Costs", category: "Industry", description: "Breaking down cost components for profitability." },
  { slug: "batch-plant-automation-levels", title: "Levels of Batch Plant Automation: Manual to Fully Automated", category: "Automation", description: "Understanding automation options and benefits." },
  { slug: "concrete-traceability", title: "Batch Traceability: Tracking Concrete from Plant to Pour", category: "Quality Control", description: "Complete documentation and tracking systems." },
  { slug: "batch-plant-reporting", title: "Production Reporting for Batch Plants", category: "Operations", description: "Key reports and metrics for plant management." }
];

function generateBlogHTML(article, siteType = 'batchlogic') {
  const isBatchLogic = siteType === 'batchlogic';
  const primaryColor = isBatchLogic ? 'cyan' : 'orange';
  const gradientText = isBatchLogic
    ? 'background: linear-gradient(to right, #0ea5e9, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent;'
    : 'background: linear-gradient(to right, #d97706, #ea580c); -webkit-background-clip: text; -webkit-text-fill-color: transparent;';
  const siteName = isBatchLogic ? 'BatchLogic' : 'MaterialsLogic';
  const siteTagline = isBatchLogic
    ? 'State-of-the-art batch plant control system for concrete producers.'
    : 'The AI-powered operating system for readymix concrete and aggregate producers.';

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${article.title} | ${siteName} Blog</title>
    <meta name="description" content="${article.description}">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        body { font-family: 'Inter', sans-serif; }
        .gradient-text { ${gradientText} }
    </style>
</head>
<body class="bg-white text-gray-800">
    <header class="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-${primaryColor}-200">
        <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
            <a href="../index.html" class="flex items-center">
                <img src="https://intrasyncindustrial.com/images/logo.jpg" alt="IntraSync Industrial Logo" class="h-12 mr-3">
                <span class="text-2xl font-bold gradient-text">${siteName}</span>
            </a>
            <div class="hidden md:flex items-center space-x-8">
                <a href="../features.html" class="text-gray-600 hover:text-${primaryColor}-600 transition-colors font-medium">Features</a>
                <a href="../blog.html" class="text-${primaryColor}-600 font-medium">Blog</a>
                <a href="../about.html" class="text-gray-600 hover:text-${primaryColor}-600 transition-colors font-medium">About</a>
                <a href="../contact.html" class="bg-gradient-to-r from-${primaryColor}-500 to-${primaryColor}-600 text-white font-semibold px-6 py-2.5 rounded-lg">Request Demo</a>
            </div>
        </nav>
    </header>

    <main class="py-16">
        <article class="container mx-auto px-6 max-w-4xl">
            <div class="mb-8">
                <a href="../blog.html" class="text-${primaryColor}-600 font-semibold hover:underline mb-4 inline-block">← Back to Blog</a>
                <div class="flex flex-wrap gap-2 mb-4">
                    <span class="bg-${primaryColor}-100 text-${primaryColor}-700 px-3 py-1 rounded-full text-sm font-semibold">${article.category}</span>
                </div>
                <h1 class="text-4xl md:text-5xl font-extrabold mb-4">${article.title}</h1>
                <div class="flex items-center gap-4 text-gray-600">
                    <span>December 2024</span>
                    <span>•</span>
                    <span>8 min read</span>
                    <span>•</span>
                    <span>By IntraSync Industrial</span>
                </div>
            </div>

            <div class="bg-gradient-to-r from-${primaryColor}-500 to-${primaryColor}-700 rounded-xl h-64 mb-8 flex items-center justify-center text-white">
                <div class="text-center">
                    <i data-lucide="file-text" class="w-16 h-16 mx-auto mb-4"></i>
                    <p class="text-xl font-semibold">${article.category}</p>
                </div>
            </div>

            <div class="prose prose-lg max-w-none">
                <p class="text-xl text-gray-600 mb-6 leading-relaxed">${article.description}</p>

                <h2 class="text-3xl font-bold mt-10 mb-4">Understanding the Fundamentals</h2>
                <p class="mb-6">In the modern concrete industry, staying competitive means embracing technology and best practices that improve efficiency, quality, and profitability. This comprehensive guide explores everything you need to know about this critical topic.</p>

                <p class="mb-6">Whether you're operating a single batch plant or managing a multi-plant operation, the principles covered here will help you optimize your processes and achieve better results.</p>

                <h3 class="text-2xl font-bold mt-8 mb-3">Key Considerations</h3>
                <ul class="list-disc pl-6 mb-6 text-gray-700">
                    <li>Understanding current industry standards and requirements</li>
                    <li>Evaluating your existing processes and identifying improvement opportunities</li>
                    <li>Implementing best practices based on proven methodologies</li>
                    <li>Measuring results and continuously improving</li>
                    <li>Training your team for success</li>
                </ul>

                <div class="bg-${primaryColor}-50 border-l-4 border-${primaryColor}-600 p-6 my-8">
                    <h4 class="font-bold text-lg mb-2">Industry Insight</h4>
                    <p class="text-gray-700">Plants that implement these best practices typically see 15-25% improvements in efficiency and significant reductions in waste and quality issues.</p>
                </div>

                <h2 class="text-3xl font-bold mt-10 mb-4">Implementation Strategies</h2>
                <p class="mb-6">Successful implementation requires a systematic approach. Start by assessing your current state, identifying gaps, and developing a prioritized action plan. Focus on quick wins that demonstrate value while building toward longer-term improvements.</p>

                <h3 class="text-2xl font-bold mt-8 mb-3">Best Practices</h3>
                <p class="mb-6">Industry leaders have established proven approaches that consistently deliver results. These include standardized procedures, regular training, continuous monitoring, and a commitment to quality at every level of the organization.</p>

                <div class="bg-gray-50 p-8 rounded-xl my-8">
                    <h3 class="text-2xl font-bold mb-4">How ${siteName} Can Help</h3>
                    <p class="text-gray-700 mb-4">${siteName} provides the technology and tools you need to implement these best practices effectively. Our integrated platform connects all aspects of your operation for seamless data flow and intelligent automation.</p>
                    <a href="../contact.html" class="inline-block bg-${primaryColor}-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-${primaryColor}-700 transition">Learn More About ${siteName} →</a>
                </div>

                <h2 class="text-3xl font-bold mt-10 mb-4">Measuring Success</h2>
                <p class="mb-6">Key performance indicators help you track progress and identify areas for improvement. Monitor metrics like batch accuracy, cycle time, waste percentage, and customer satisfaction to ensure you're achieving your goals.</p>

                <h2 class="text-3xl font-bold mt-10 mb-4">Conclusion</h2>
                <p class="mb-6">Success in the concrete industry requires a commitment to continuous improvement. By implementing the strategies outlined in this guide and leveraging modern technology solutions, you can achieve significant improvements in efficiency, quality, and profitability.</p>
            </div>

            <div class="border-t border-b border-gray-200 py-8 my-12">
                <div class="flex items-start gap-6">
                    <div class="bg-${primaryColor}-600 text-white rounded-full w-20 h-20 flex items-center justify-center text-2xl font-bold flex-shrink-0">IS</div>
                    <div>
                        <h4 class="font-bold text-xl mb-2">IntraSync Industrial</h4>
                        <p class="text-gray-600">IntraSync Industrial provides cutting-edge technology solutions for the concrete and construction materials industry, including ${siteName}, CastLogic ERP, and integrated operations management platforms.</p>
                    </div>
                </div>
            </div>

            <div class="bg-gradient-to-r from-${primaryColor}-600 to-${primaryColor}-800 rounded-xl p-8 mt-12 text-center text-white">
                <h3 class="text-2xl font-bold mb-3">Ready to Optimize Your Operations?</h3>
                <p class="mb-6 text-${primaryColor}-100">Schedule a demo to see how ${siteName} can transform your batch plant operations.</p>
                <a href="../contact.html" class="inline-block bg-white text-${primaryColor}-700 px-8 py-3 rounded-lg font-semibold hover:bg-${primaryColor}-50 transition">Contact Us</a>
            </div>
        </article>
    </main>

    <footer class="bg-gray-900 text-white mt-16">
        <div class="container mx-auto px-6 py-12">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <div class="flex items-center mb-4 md:mb-0">
                    <img src="https://intrasyncindustrial.com/images/logo.jpg" alt="IntraSync Industrial Logo" class="h-10 mr-3">
                    <span class="text-xl font-bold gradient-text">${siteName}</span>
                </div>
                <p class="text-gray-500 text-sm">&copy; 2025 IntraSync Industrial. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script>lucide.createIcons();</script>
</body>
</html>`;
}

// Generate all BatchLogic blog articles
const blogDir = path.join(__dirname, 'blog');
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true });
}

batchlogicArticles.forEach(article => {
  const filePath = path.join(blogDir, `${article.slug}.html`);
  fs.writeFileSync(filePath, generateBlogHTML(article, 'batchlogic'));
  console.log(`Created: ${article.slug}.html`);
});

console.log(`\nGenerated ${batchlogicArticles.length} BatchLogic blog articles!`);
