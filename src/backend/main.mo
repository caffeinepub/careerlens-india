import Text "mo:core/Text";
import Order "mo:core/Order";
import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";

actor {
  type Category = {
    id : Text;
    name : Text;
    description : Text;
  };

  type IndustryType = {
    id : Text;
    categoryId : Text;
    name : Text;
    description : Text;
  };

  type Subtype = {
    id : Text;
    typeId : Text;
    name : Text;
    description : Text;
    typicalActivities : [Text];
    typicalRoles : [Text];
    valueChainDescription : Text;
    employmentPercentage : Float; // Percentage of Indian workforce
    totalWorkersEstimate : Nat;
    globalContext : Text;
    salaryEntryLevel : Float; // LPA (lakhs per annum)
    salaryMidLevel : Float; // LPA
    salarySeniorLevel : Float; // LPA
    roleTypeContext : Text;
  };

  module Subtype {
    public func compare(subtype1 : Subtype, subtype2 : Subtype) : Order.Order {
      Text.compare(subtype1.id, subtype2.id);
    };
  };

  func searchCompareByKeyword(keyword : Text) : (Subtype, Subtype) -> Order.Order {
    func(a, b) {
      let aContains = a.name.contains(#text keyword) or a.description.contains(#text keyword);
      let bContains = b.name.contains(#text keyword) or b.description.contains(#text keyword);

      switch (aContains, bContains) {
        case (true, false) { #less };
        case (false, true) { #greater };
        case (_) { Subtype.compare(a, b) };
      };
    };
  };

  // Pre-seeded data

  let categories = Map.fromIter<Text, Category>(
    [
      (
        "primary",
        {
          id = "primary";
          name = "Primary Sector";
          description = "Direct extraction of natural resources - agriculture, fishing, mining, forestry, etc.";
        },
      ),
      (
        "secondary",
        {
          id = "secondary";
          name = "Secondary Sector";
          description = "Manufacturing, processing, and construction related industries.";
        },
      ),
      (
        "services",
        {
          id = "services";
          name = "Services Sector";
          description = "IT, government, finance, healthcare, education, gig economy, creative services.";
        },
      ),
    ].values(),
  );

  let types = Map.fromIter<Text, IndustryType>(
    [
      // Primary
      (
        "agriculture",
        {
          id = "agriculture";
          categoryId = "primary";
          name = "Agriculture & Farming";
          description = "Crop farming, horticulture, floriculture, agritech, organic farming, exports, value chain.";
        },
      ),
      (
        "fisheries",
        {
          id = "fisheries";
          categoryId = "primary";
          name = "Fisheries & Aquaculture";
          description = "Marine fishing, aquaculture, fish processing, exports, value chain.";
        },
      ),
      (
        "forestry",
        {
          id = "forestry";
          categoryId = "primary";
          name = "Forestry & Wood Products";
          description = "Timber industry, forest conservation, ecology.";
        },
      ),
      (
        "mining",
        { id = "mining"; categoryId = "primary"; name = "Mining & Quarrying"; description = "Coal, minerals, construction minerals, geology." },
      ),
      (
        "dairy_livestock",
        { id = "dairy_livestock"; categoryId = "primary"; name = "Dairy & Livestock"; description = "Dairy farming, processing, poultry, animal husbandry." },
      ),
      // Secondary
      (
        "manufacturing",
        {
          id = "manufacturing";
          categoryId = "secondary";
          name = "Manufacturing & Factories";
          description = "Automobiles, electronics, pharmaceuticals, steel, production plants.";
        },
      ),
      (
        "construction",
        { id = "construction"; categoryId = "secondary"; name = "Construction & Infrastructure"; description = "Civil engineering, real estate, architecture, design." },
      ),
      (
        "energy_utilities",
        {
          id = "energy_utilities";
          categoryId = "secondary";
          name = "Energy & Utilities";
          description = "Power generation, renewable energy, oil & gas industry.";
        },
      ),
      (
        "textiles_apparel",
        {
          id = "textiles_apparel";
          categoryId = "secondary";
          name = "Textiles & Apparel";
          description = "Garments, apparel manufacturing, textile design, handlooms.";
        },
      ),
      (
        "food_processing",
        {
          id = "food_processing";
          categoryId = "secondary";
          name = "Food Processing";
          description = "Packaged food, dairy processing, beverages, spices exports.";
        },
      ),
      // Services
      (
        "it_digital",
        {
          id = "it_digital";
          categoryId = "services";
          name = "IT & Digital Technology";
          description = "Software engineering, data science, product management, digital marketing.";
        },
      ),
      (
        "government",
        {
          id = "government";
          categoryId = "services";
          name = "Government & Public Services";
          description = "Civil services, PSU jobs, defence, judiciary, municipal services.";
        },
      ),
      (
        "banking_finance",
        {
          id = "banking_finance";
          categoryId = "services";
          name = "Banking & Finance";
          description = "Commercial banking, investment banking, insurance, microfinance.";
        },
      ),
      (
        "healthcare",
        {
          id = "healthcare";
          categoryId = "services";
          name = "Healthcare & Medicine";
          description = "Clinical medicine, pharma research, public health, nursing.";
        },
      ),
      (
        "education",
        {
          id = "education";
          categoryId = "services";
          name = "Education & Training";
          description = "Teaching, higher education, edtech, vocational training.";
        },
      ),
      (
        "ngos",
        {
          id = "ngos";
          categoryId = "services";
          name = "NGOs & Social Impact";
          description = "Development, health, education, environment focused NGOs.";
        },
      ),
      (
        "gig_economy",
        {
          id = "gig_economy";
          categoryId = "services";
          name = "Gig Economy & Platform Work";
          description = "Freelancing, ride-hailing, delivery, online content creation.";
        },
      ),
      (
        "media_creative",
        {
          id = "media_creative";
          categoryId = "services";
          name = "Media, Film & Creative Arts";
          description = "Film, OTT, journalism, advertising, graphic design, creative arts.";
        },
      ),
    ].values(),
  );

  let subtypes = Map.fromIter<Text, Subtype>(
    [
      // AGRICULTURE SUBTYPES
      (
        "crop_farming",
        {
          id = "crop_farming";
          typeId = "agriculture";
          name = "Crop Farming & Agronomy";
          description = "Large-scale grain, vegetable, fruit, and pulse cultivation using scientific methods.";
          typicalActivities = [
            "Land preparation and irrigation management",
            "Seed selection, planting and harvesting",
            "Soil nutrition, fertilizers, pesticides",
            "Marketing produce to wholesalers and exporters",
            "Government procurement for Public Distribution System",
          ];
          typicalRoles = [
            "Farm Manager",
            "Agronomist",
            "Irrigation Engineer",
            "Procurement Specialist",
            "NABARD Consultant",
          ];
          valueChainDescription = "Dominated by small landholdings, low mechanization, high government procurement, major contributor to GDP.";
          employmentPercentage = 40.0;
          totalWorkersEstimate = 280_000_000;
          globalContext = "Largest workforce sector, major exporter of grains, pulses, rice. 17%+ of India's GDP.";
          salaryEntryLevel = 1.2;
          salaryMidLevel = 2.5;
          salarySeniorLevel = 5.0;
          roleTypeContext = "Mixture of self-employment, farm cooperatives, larger agribusinesses.";
        },
      ),
      (
        "agri_tech",
        {
          id = "agri_tech";
          typeId = "agriculture";
          name = "AgriTech & Precision Farming";
          description = "Use of technology, data, and digital services to improve farm productivity, especially for smallholder farmers.";
          typicalActivities = [
            "Satellite remote sensing and drone mapping",
            "Precision irrigation using soil sensors",
            "Digital knowledge platforms for best practices",
            "Direct farm-to-market and export platforms",
            "FinTech & insurtech for crop/livestock insurance",
          ];
          typicalRoles = [
            "AgriTech Product Manager (DeHaat, CropIn, Ninjacart)",
            "Remote Sensing Specialist",
            "Supply Chain Management",
            "Agri Finance Consultant",
          ];
          valueChainDescription = "Tech-enabled transformation, helps increase small farm yields, optimize supply chain, improve market access.";
          employmentPercentage = 0.3;
          totalWorkersEstimate = 500_000;
          globalContext = "Explosion in agri-focused startups, precision farming, increasing global competitiveness. India is in top 5 globally for AgriTech investment.";
          salaryEntryLevel = 4.0;
          salaryMidLevel = 8.0;
          salarySeniorLevel = 18.0;
          roleTypeContext = "Tech startup culture, corporate R&D, government partnership models.";
        },
      ),
      (
        "horticulture",
        {
          id = "horticulture";
          typeId = "agriculture";
          name = "Horticulture & Floriculture";
          description = "Specialized cultivation of fruits, vegetables, spices, flowers, plant exports.";
          typicalActivities = [
            "Greenhouse farming, hydroponics",
            "Nursery management and tissue culture",
            "Export logistics and value chain management",
            "Cold storage and food processing",
            "Training and consulting to small farmers",
          ];
          typicalRoles = [
            "Horticulturalist",
            "Export Manager",
            "Agri Consultant",
            "Research Scientist",
            "Plant Breeder",
          ];
          valueChainDescription = "Hands-on farming, packaging, supply chain, heavy exports activity to Europe, Middle East, and Asia.";
          employmentPercentage = 2.0;
          totalWorkersEstimate = 15_000_000;
          globalContext = "India is a leading exporter of mangoes, bananas, exotic flowers, rice, and spices. 15%+ agri GDP.";
          salaryEntryLevel = 1.5;
          salaryMidLevel = 3.0;
          salarySeniorLevel = 6.0;
          roleTypeContext = "Mixture of small farmers, large export businesses, agri scientists, consulting.";
        },
      ),
      (
        "organic_farming",
        {
          id = "organic_farming";
          typeId = "agriculture";
          name = "Organic Farming & Export";
          description = "Certified organic produce with minimal chemicals, focused on health & wellness market and high-end exports.";
          typicalActivities = [
            "Organic farm management, certification, and compliance",
            "Marketing and brand building",
            "Direct supply to retail stores, supermarkets, online commerce companies",
            "Supply chain for export of organic spices and pulses",
          ];
          typicalRoles = [
            "Organic Farm Owner",
            "Agri Export Manager",
            "Organic Certification Expert",
            "Government/NGO Project Manager",
          ];
          valueChainDescription = "High focus on R&D, certification, quality control, branding for global exports.";
          employmentPercentage = 0.5;
          totalWorkersEstimate = 3_500_000;
          globalContext = "India is in the top 3 globally for organic farmers, organic exports growing 25% annually. Regulatory focus on quality exports.";
          salaryEntryLevel = 2.0;
          salaryMidLevel = 4.0;
          salarySeniorLevel = 8.0;
          roleTypeContext = "Entrepreneurship, export-focused business, government-supported projects, consulting.";
        },
      ),
      // FISHERIES SUBTYPES
      (
        "marine_fishing",
        {
          id = "marine_fishing";
          typeId = "fisheries";
          name = "Marine Fishing";
          description = "Fishing in seas, rivers, lakes - including catching, processing, exporting marine and freshwater species.";
          typicalActivities = [
            "Boat operations and navigation",
            "Fish processing for local and export markets",
            "Logistics and cold storage",
            "Marine biology and conservation consulting",
          ];
          typicalRoles = [
            "Fisherman (Self-employed/Cooperative)",
            "Export Management",
            "Marine Biologist",
            "Logistics Coordinator",
          ];
          valueChainDescription = "Direct extraction of marine/freshwater resources. Direct role in exports. Strong traditional sector.";
          employmentPercentage = 0.6;
          totalWorkersEstimate = 4_000_000;
          globalContext = "0.6% of workforce, strong export industry, significant contributor to local rural economies.";
          salaryEntryLevel = 1.2;
          salaryMidLevel = 2.0;
          salarySeniorLevel = 4.0;
          roleTypeContext = "Traditional sector, family business, export and logistics roles growing.";
        },
      ),
      (
        "aquaculture",
        {
          id = "aquaculture";
          typeId = "fisheries";
          name = "Aquaculture & Fish Farming";
          description = "Raising marine and freshwater fish for food, ornamental fish, export, value addition.";
          typicalActivities = [
            "Pond/tank management (intensive vs. extensive methods)",
            "Species selection, breeding, growth management",
            "Hatchery design, breeding, sales",
            "Supply chain for export, packaging of ornamental fish",
          ];
          typicalRoles = [
            "Aquaculture Farm Manager",
            "Hatchery Operations",
            "Farm Technician (Skilled)",
            "Agri-Export Specialist",
          ];
          valueChainDescription = "Rapidly growing sector, focus on technology adoption, hygiene, export-capable supply chains.";
          employmentPercentage = 0.3;
          totalWorkersEstimate = 2_000_000;
          globalContext = "15%-20% growth per year, India among top 2 globally for aquaculture output. $5B+ export potential.";
          salaryEntryLevel = 1.5;
          salaryMidLevel = 3.0;
          salarySeniorLevel = 6.0;
          roleTypeContext = "Entrepreneurship, family business, high-skilled technicians, government-funded research.";
        },
      ),
      (
        "fish_processing",
        {
          id = "fish_processing";
          typeId = "fisheries";
          name = "Fish Processing & Export";
          description = "Processing, packaging, logistics for domestic retail and high-value global export markets.";
          typicalActivities = [
            "Quality control, sorting, cold storage",
            "Value addition, packaging, retail partnerships",
            "Exporter certification, logistics project management",
          ];
          typicalRoles = [
            "Packaging Plant Executive",
            "Export Supply Chain Manager",
            "Quality Control Specialist",
            "Logistics Planner",
          ];
          valueChainDescription = "Direct contributor to India`s $8B+ annual fish/seafood exports. Growing tech adoption and cold chain partnerships.";
          employmentPercentage = 0.2;
          totalWorkersEstimate = 1_500_000;
          globalContext = "Huge export opportunity - 200%+ rise in demand for specialty processing roles in past 5 years.";
          salaryEntryLevel = 1.8;
          salaryMidLevel = 3.5;
          salarySeniorLevel = 7.0;
          roleTypeContext = "Export-focused business, skilled technicians, logistics, management consulting.";
        },
      ),
      // FORESTRY SUBTYPES
      (
        "timber_industry",
        {
          id = "timber_industry";
          typeId = "forestry";
          name = "Timber & Wood Industry";
          description = "Timber extraction, woodworking, furniture manufacturing, forest resource management.";
          typicalActivities = [
            "Logging, sawmill, timber processing",
            "Wooden furniture design, manufacturing",
            "Export supply chain, certification, quality control tasks",
          ];
          typicalRoles = [
            "Sawmill Operator",
            "Export Affair Specialist",
            "Forest Conservator",
            "Sustainable Wood Consultant",
          ];
          valueChainDescription = "Combination of traditional woodworking, value addition, increasing focus on conservation and sustainability.";
          employmentPercentage = 0.4;
          totalWorkersEstimate = 3_000_000;
          globalContext = "32%+ of Indian land is forest/scrubland, major area for rural job creation & exports.";
          salaryEntryLevel = 1.5;
          salaryMidLevel = 3.0;
          salarySeniorLevel = 6.0;
          roleTypeContext = "Skilled trade, export-focused family businesses, conservation consulting, government-supported.";
        },
      ),
      (
        "forest_conservation",
        {
          id = "forest_conservation";
          typeId = "forestry";
          name = "Forest Conservation & Ecology";
          description = "Managing protected forests, wildlife, conservation zones, restoration/reforestation.";
          typicalActivities = [
            "Enforcement & legal compliance",
            "Sustainable forestry management",
            "Conservation project planning",
            "Community-based resource management",
          ];
          typicalRoles = [
            "Forest Officer (IFS/State Services)",
            "Ecology Scientist",
            "Conservation NGO Program Manager",
            "Community Outreach Specialist",
          ];
          valueChainDescription = "Emerging sector with focus on green jobs, sustainability, carbon trading. Large public sector role via IFS.";
          employmentPercentage = 0.1;
          totalWorkersEstimate = 500_000;
          globalContext = "India among world leaders in conservation science, 850+ protected forest zones, major focus area for global grants.";
          salaryEntryLevel = 3.5;
          salaryMidLevel = 7.0;
          salarySeniorLevel = 14.0;
          roleTypeContext = "Mixture of government service, NGO project management, international consulting.";
        },
      ),
      // MINING SUBTYPES
      (
        "coal_mining",
        {
          id = "coal_mining";
          typeId = "mining";
          name = "Coal Mining";
          description = "Coal extraction (thermal and coking), supply chain, technology adoption for efficiency & sustainability, safety management.";
          typicalActivities = [
            "Growing underground mining technology adoption",
            "Safety compliance, regulation management",
            "Logistics, supply chain, and government partnership models",
            "Export management",
          ];
          typicalRoles = [
            "Mine Manager",
            "Mechanical Engineer",
            "Health & Safety Specialist",
            "Supply Chain Exec",
          ];
          valueChainDescription = "Traditional sector, heavy public sector involvement, focus on efficiency, technology adoption.";
          employmentPercentage = 0.5;
          totalWorkersEstimate = 3_500_000;
          globalContext = "Largest coal producer globally, 70%+ Indian energy comes from coal. Automation trends changing workforce requirements.";
          salaryEntryLevel = 3.0;
          salaryMidLevel = 6.0;
          salarySeniorLevel = 12.0;
          roleTypeContext = "Corporate public sector, emerging technology roles, export consultancy, supply chain management.";
        },
      ),
      (
        "mineral_extraction",
        {
          id = "mineral_extraction";
          typeId = "mining";
          name = "Mineral Extraction & Geology";
          description = "Mining of minerals, metals (iron, bauxite, copper, gold, etc.), geology, supply chain for exports, exploration.";
          typicalActivities = [
            "Geological surveying, exploration, drilling",
            "Export supply chain management",
            "Sustainability transformation, safety compliance, technology adoption",
          ];
          typicalRoles = [
            "Mining Engineer",
            "Geologist",
            "Export Logistics Specialist",
            "Plant Manager",
          ];
          valueChainDescription = "Focusing on high-tech exploration, automation, supply chain optimization, export evolution.";
          employmentPercentage = 0.3;
          totalWorkersEstimate = 2_000_000;
          globalContext = "India among global leaders in rare earth metals output. Focus shifting to automation, safety.";
          salaryEntryLevel = 4.0;
          salaryMidLevel = 9.0;
          salarySeniorLevel = 20.0;
          roleTypeContext = "Corporate public sector, geological consulting, global supply chain transformation.";
        },
      ),
      (
        "quarrying_construction_minerals",
        {
          id = "quarrying_construction_minerals";
          typeId = "mining";
          name = "Quarrying & Construction Minerals";
          description = "Extraction of materials used in construction like stone, lime, sand, gravel, clay, etc.";
          typicalActivities = [
            "Quarry management, safety, automation",
            "Supply chain optimization (domestic and export)",
            "Legal compliance, environmental consulting",
          ];
          typicalRoles = [
            "Quarry Operations Manager",
            "Safety and Regulatory Consultant",
            "Export Project Specialist",
            "Geo-technical Specialist",
          ];
          valueChainDescription = "Balance of traditional methods and modernization, focus on automation, safety, global quality standards.";
          employmentPercentage = 0.4;
          totalWorkersEstimate = 3_000_000;
          globalContext = "5th largest global exporter, growing demand for new technologies (India is global industry leader in this sector).";
          salaryEntryLevel = 2.0;
          salaryMidLevel = 4.0;
          salarySeniorLevel = 8.0;
          roleTypeContext = "Corporate public/private sector, consulting, sustainability, export partnerships.";
        },
      ),
      // DAIRY & LIVESTOCK SUBTYPES
      (
        "dairy_farming",
        {
          id = "dairy_farming";
          typeId = "dairy_livestock";
          name = "Dairy Farming & Processing";
          description = "Milk production, dairy processing, distribution, value chain development. India is #1 globally in milk output.";
          typicalActivities = [
            "Dairy plant & farm management",
            "Supply chain logistics enablement",
            "Quality control, processing, and packaging",
            "Retail distribution, branding, and product marketing",
          ];
          typicalRoles = [
            "Farm Owner (Self-employed)",
            "Supply Chain Specialist",
            "Dairy Plant Supervisor",
            "Product Marketing Specialist",
          ];
          valueChainDescription = "Combination of small-scale home businesses and large modern dairy factories. Growing retail and export market.";
          employmentPercentage = 3.0;
          totalWorkersEstimate = 20_000_000;
          globalContext = "World's largest dairy industry, 25%+ of Indian agriculture output. Major contributor to health and wellness segment.";
          salaryEntryLevel = 1.2;
          salaryMidLevel = 2.5;
          salarySeniorLevel = 5.0;
          roleTypeContext = "Entrepreneurship, small family businesses, supply chain professionals, large scale brand management.";
        },
      ),
      (
        "poultry_farming",
        {
          id = "poultry_farming";
          typeId = "dairy_livestock";
          name = "Poultry & Egg Production";
          description = "Chicken, egg, and meat farming. Modern automated farms, feed management, facility management.";
          typicalActivities = [
            "Farm management, feed optimization",
            "Supply chain logistics and export management",
            "Veterinary consulting, health management, cold chain",
          ];
          typicalRoles = [
            "Farm Owner (Entrepreneur)",
            "Feed Supply Chain Specialist",
            "Veterinary Consultant",
            "Export Coordinator",
          ];
          valueChainDescription = "Modernized business focused on automation, health/safety protocols. Rapidly growing export market.";
          employmentPercentage = 0.8;
          totalWorkersEstimate = 5_000_000;
          globalContext = "India among global leaders in poultry/meat segment, exports growing to US/UK/EU. Significant government support for modern facilities.";
          salaryEntryLevel = 1.5;
          salaryMidLevel = 3.0;
          salarySeniorLevel = 6.0;
          roleTypeContext = "Skilled entrepreneurship, technology-focused, supply chain specialist roles, consulting.";
        },
      ),
      (
        "animal_husbandry",
        {
          id = "animal_husbandry";
          typeId = "dairy_livestock";
          name = "Animal Husbandry & Veterinary";
          description = "Raising livestock (cattle, buffalo, goats, sheep), veterinary practice, disease management (India is a global leader in livestock production & exports).";
          typicalActivities = [
            "Veterinary clinics, hospital management",
            "Research, disease management, and health improvement",
            "Export supply chain coordination, meat processing, quality control",
          ];
          typicalRoles = [
            "Veterinary Doctor",
            "Research Scientist",
            "Export Logistics Analyst",
            "Feed Company Executive",
          ];
          valueChainDescription = "Leading sector due to India`s size and scale. Global demand for new technologies, disease management, and export compliance protocols.";
          employmentPercentage = 0.5;
          totalWorkersEstimate = 3_500_000;
          globalContext = "#1 in cattle, buffalo, goat population. 15%+ annual growth in this sector, high export focus, regulatory focus on best practices.";
          salaryEntryLevel = 3.0;
          salaryMidLevel = 6.0;
          salarySeniorLevel = 14.0;
          roleTypeContext = "Professional care, R&D, regulatory compliance, export consultancy, family business - all roles in high demand.";
        },
      ),
      // IT & DIGITAL SUBTYPES
      (
        "software_engineer",
        {
          id = "software_engineer";
          typeId = "it_digital";
          name = "Software Engineering";
          description = "Designing and building software for mobile/web applications, cloud projects, core corporate solutions. India exports over $150B in IT services annually, is a global technology hub.";
          typicalActivities = [
            "Developing, testing, deploying software solutions",
            "Project management and agile development",
            "International client consulting, R&D, product dev partnerships",
            "Contributing to India`s global tech talent exports",
          ];
          typicalRoles = [
            "Software Engineer",
            "Product Manager",
            "Agile Coach",
            "UI/UX Designer",
            "CXO (Chief Experience Officer)",
          ];
          valueChainDescription = "Main driver of India's digital transformation, rapid global demand for developers, major startup activity, core export growth.";
          employmentPercentage = 3.2;
          totalWorkersEstimate = 4_200_000;
          globalContext = "Top 3 globally for tech talent, #1 IT services exporter, India trains >2M developers per year.";
          salaryEntryLevel = 4.0;
          salaryMidLevel = 12.0;
          salarySeniorLevel = 28.0;
          roleTypeContext = "Corporate, startups, consulting, product dev, R&D, international tech consulting - all high-growth segments.";
        },
      ),
      (
        "data_analytics",
        {
          id = "data_analytics";
          typeId = "it_digital";
          name = "Data Science & Analytics";
          description = "Big data analysis, predictive modeling, machine learning, AI, business intelligence, cloud data, advanced reporting. India has highest global demand for DS/AI skills & training.";
          typicalActivities = [
            "Statistical modeling, advanced business intelligence",
            "Machine learning solution development",
            "Data architecture & engineering, visualization",
            "Global data science training, consulting, and talent exports",
          ];
          typicalRoles = [
            "Data Analyst",
            "Cloud Architect",
            "Senior Data Scientist",
            "Visualization Specialist",
            "AI Product Manager",
          ];
          valueChainDescription = "Focus on AI transformation, global demand for Indian data talent. Rapid expansion in training, export, consulting roles; core segment supporting global digital consulting.";
          employmentPercentage = 0.5;
          totalWorkersEstimate = 700_000;
          globalContext = "Top 3 globally for data analytics talent, 5X growth in past 4 years, 60%+ global consulting export activities in this sector.";
          salaryEntryLevel = 5.0;
          salaryMidLevel = 14.0;
          salarySeniorLevel = 35.0;
          roleTypeContext = "Corporate consulting, product dev, export-focused data solutions consulting, and tech training (B2B and B2C) . ";
        },
      ),
      (
        "cybersecurity",
        {
          id = "cybersecurity";
          typeId = "it_digital";
          name = "Cybersecurity";
          description = "Digital security, network protection, ethical hacking, compliance solutions for business, government, and startups. 3X increase in demand for cyber experts in past 3 years.";
          typicalActivities = [
            "Security audits, testing, penetration testing",
            "Cyber law consulting, regulatory compliance (India, global)",
            "Corporate and government cybersecurity projects",
            "Training, awareness, certification programs",
          ];
          typicalRoles = [
            "Cybersecurity Analyst",
            "Security Architect",
            "Ethical Hacker (Certified)",
            "Consulting CISO",
            "PSU Project Manager",
          ];
          valueChainDescription = "Cybersecurity is now a core requirement for all enterprises, startups, individuals, and government. India is globally #2 for talent exports and training in this sector.";
          employmentPercentage = 0.2;
          totalWorkersEstimate = 300_000;
          globalContext = "Huge focus area since COVID-19. 100%+ growth in education/training jobs in this sector. Law, consulting, and audit roles now in high demand.";
          salaryEntryLevel = 5.0;
          salaryMidLevel = 14.0;
          salarySeniorLevel = 32.0;
          roleTypeContext = "High-growth consulting, corporate, startup, education - all segments in rapid expansion mode worldwide and in India.";
        },
      ),
      (
        "product_management",
        {
          id = "product_management";
          typeId = "it_digital";
          name = "Product Management";
          description = "Defining, developing, launching digital & physical products for Indian and global startups. High demand for consulting, training, export-focused PM roles.";
          typicalActivities = [
            "Product discovery, customer research, business plan development",
            "Defining features, requirements, roadmap management",
            "Agile transformation and change management consulting",
            "Global product launch and market expansion",
          ];
          typicalRoles = [
            "Product Manager",
            "Growth Lead",
            "Product Marketing Executive",
            "Startup Coach/Angel Investor",
            "Innovation Consultant",
          ];
          valueChainDescription = "Rapidly evolving, product-led Indian startups. Focus on global product launches, digital exports, transformation consulting.";
          employmentPercentage = 0.1;
          totalWorkersEstimate = 150_000;
          globalContext = "Top 3 globally for PM training and talent export, 3-4X growth in consulting, training, and international product/market expansion roles in past 3-5 years.";
          salaryEntryLevel = 7.0;
          salaryMidLevel = 18.0;
          salarySeniorLevel = 40.0;
          roleTypeContext = "Corporate, consulting, product-led startups, education/training, and export-focused companies - all rapid growth segments in India and for India-US partnerships.";
        },
      ),
      (
        "digital_marketing",
        {
          id = "digital_marketing";
          typeId = "it_digital";
          name = "Digital Marketing & SEO";
          description = "Building brands & products using technology, digital methods - social media, SEO, content, data analytics. India leads global growth in digital/social brand building.";
          typicalActivities = [
            "Developing digital marketing strategies",
            "Search engine optimization (SEO)",
            "Content management, blogging, influencer marketing",
            "CRM, sales, and performance analytics",
          ];
          typicalRoles = [
            "Digital Marketing Executive",
            "SEO Specialist",
            "Content Writer/Creator",
            "Social Media Manager",
            "Influencer/Personal Brand Creator",
          ];
          valueChainDescription = "Direct contributor to India's growth as a digital economy. High demand for tech, social brand creators, video commerce, influencer experts. Focus on global, e-commerce, digital service and training export.";
          employmentPercentage = 0.4;
          totalWorkersEstimate = 600_000;
          globalContext = "Highest growth tech sector as India transforms itself into a global digital economy. 2X-3X growth in digital/SEO marketing jobs in past 4 years, top focus for training and career transformation.";
          salaryEntryLevel = 3.0;
          salaryMidLevel = 7.0;
          salarySeniorLevel = 16.0;
          roleTypeContext = "Corporate, consulting, product-led startups, e-commerce, service professionals, influencers - all rapid growth segments (US, UK, SEA, global partnership opportunities).";
        },
      ),
    ].values(),
  );

  // Query APIs

  public query ({ caller }) func getAllCategories() : async [Category] {
    categories.values().toArray();
  };

  public query ({ caller }) func getTypesByCategory(categoryId : Text) : async [IndustryType] {
    types.filter(func(_, t) { t.categoryId == categoryId }).values().toArray();
  };

  public query ({ caller }) func getSubtypesByType(typeId : Text) : async [Subtype] {
    subtypes.filter(func(_, s) { s.typeId == typeId }).values().toArray();
  };

  public query ({ caller }) func getSubtypeDetail(subtypeId : Text) : async Subtype {
    switch (subtypes.get(subtypeId)) {
      case (null) { Runtime.trap("Subtype not found") };
      case (?subtype) { subtype };
    };
  };

  public query ({ caller }) func searchSubtypes(keyword : Text) : async [Subtype] {
    let results = List.empty<Subtype>();
    for (subtype in subtypes.values()) {
      let nameLower = subtype.name.toLower();
      let descLower = subtype.description.toLower();
      let keywordLower = keyword.toLower();

      if (nameLower.contains(#text keywordLower) or descLower.contains(#text keywordLower)) {
        results.add(subtype);
      };
    };
    results.toArray().sort(searchCompareByKeyword(keyword));
  };
};
